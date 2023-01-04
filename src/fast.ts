import { DEFAULT_BRANCH } from "./consts";
import { getToday, parseFromDate } from "./lib/common/date";
import { errorHandler } from "./lib/common/error";
import { writeFile } from "./lib/common/publicFsWriterReader";
import { extractDataLine, extractOwnerAndRepoFromGitURL, getDependencies, overwriteCommitsFile, overwriteDataPosFile, overwriteLastDateFile } from "./lib/common/utils-for-main-and-fast";
import { GithubAPIOnlyCommit } from "./lib/main/githubAPIOnlyCommit";
import { GitFileBlob } from "./types/GitStructures";

// To be implemented/refactored
spamDays();

function spamDays(){
    let today = getToday();
    let commitsPerDay = 50;

    let gl_dataPos = 0;
    let gl_cur = 0;
    let gl_max = 0;
    let gl_lastDate = today;
    let gl_commit = {
        cur: 0,
        max: commitsPerDay
    }

    getDependencies(today)
    .then(async ({git, data}) => {
        const ghApi = new GithubAPIOnlyCommit(git.auth);
        await ghApi.authenticate();
    
        let { owner, repo } = extractOwnerAndRepoFromGitURL(git.url);
        ghApi.setOwner(owner);
        ghApi.setRepo(repo);
        ghApi.setBranch(DEFAULT_BRANCH);
    
        let fileBlobs: GitFileBlob[] = [{
            path: "message.txt",
            content: data.msg,
            type: "blob",
            mode: "100644",
        }];
    
        ghApi.addFiles(fileBlobs);

        let headerLine = data.data[0];
        let maxLines = data.data.length;
        let line = data.dataPos;
        gl_commit.cur = data.commits.cur;
        gl_commit.max = data.commits.max;

        console.log("Uploading...");

        if(line === 1){
            console.log(`Starts writing: ${data.msg}`);
            await ghApi.commit(`Starts writing: ${data.msg}`, data.dates.start);
            // await commit(git, [{path: MSG_FILE_PATH, content: data.msg}], `Starts writing: ${data.msg}`, true);
        }

        for(let i = line; i < maxLines; i++){
            let { date, symbol, cur, max} = extractDataLine(data.data[i]);
            
            gl_cur = cur;
            gl_max = max;
            gl_dataPos = i;
            gl_lastDate = date;

            if(gl_commit.cur === 0){
                console.log(`writing: ${symbol} - ${cur}/${max} | ${parseFromDate(date)}`);
                console.log(`${gl_commit.cur+1}/${gl_commit.max}`);
                await overwriteCommitsFile(2, gl_commit.max);
                await ghApi.commit(`writing: ${symbol} - ${cur}/${max} | ${parseFromDate(date)}`, date);
                
                gl_commit.cur += 2;
            }

            for (let j = gl_commit.cur; j <= gl_commit.max; j++) {
                gl_commit.cur = j;
                console.log(`${gl_commit.cur}/${gl_commit.max}`);
                await overwriteCommitsFile(gl_commit.cur, gl_commit.max);
                await ghApi.commit("...", date);
            }

            gl_commit.cur = 0;
            await overwriteCommitsFile(gl_commit.cur, gl_commit.max);
            await overwriteDataPosFile(++gl_dataPos);
            await overwriteLastDateFile(gl_lastDate);

            // await commit(git, [{path: MSG_FILE_PATH, content: data.msg}], `writing: ${symbol} - ${cur}/${max}`, false, commitsPerDay, date);
        }

        console.log("Done.");
    })
    .catch(errorHandler)
    .finally(async () => await Promise.all([
        writeFile("data-pos.txt", gl_dataPos.toString()),
        overwriteLastDateFile(gl_lastDate),
        writeFile("commits.txt", `${gl_commit.cur}/${gl_commit.max}`)
    ]));
}