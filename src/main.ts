import { GithubAPIOnlyCommit } from "./lib/main/githubAPIOnlyCommit";
import { getToday, parseFromDate } from "./lib/common/date";
import { writeFile } from "./lib/common/publicFsWriterReader";
import {
    DEFAULT_BRANCH
} from "./consts";
import { GitFileBlob } from "./types/GitStructures";
import { errorHandler } from "./lib/common/error";

import { extractDataLine, extractOwnerAndRepoFromGitURL, getDependencies, overwriteLastDateFile } from "./lib/common/utils-for-main-and-fast";

const MSG_FILE_PATH = "message.txt";

main()

function main(today= getToday(), commitsPerDay = 50) {
    getDependencies(today)
    .then(async ({git, data}) => {
        if(parseFromDate(today) === parseFromDate(data.dates.start)){
            await commit(git, [{path: MSG_FILE_PATH, content: data.msg}], `Starts writing: ${data.msg}`, true);
        }

        let {date, symbol, cur, max} = extractDataLine(data.data[data.dataPos])
        if(parseFromDate(today) === parseFromDate(date)){
            await commit(git, [{path: MSG_FILE_PATH, content: data.msg}], `writing: ${symbol} - ${cur}/${max}`, false, commitsPerDay);
            await writeFile("data-pos.txt", (data.dataPos+1).toString());
        }
    })
    .then(() => overwriteLastDateFile(today))
    .catch(errorHandler)
}


async function commit(
    git: { auth: string; url: string },
    files: { path: string; content: string }[],
    message: string,
    once = false,
    commitsPerDay = 50,
    date = getToday()
) {
    const ghApi = new GithubAPIOnlyCommit(git.auth);
    await ghApi.authenticate();

    let { owner, repo } = extractOwnerAndRepoFromGitURL(git.url);
    ghApi.setOwner(owner);
    ghApi.setRepo(repo);
    ghApi.setBranch(DEFAULT_BRANCH);

    let fileBlobs: GitFileBlob[] = files.map((file) => {
        return {
            path: file.path,
            content: file.content,
            type: "blob",
            mode: "100644",
        };
    });

    ghApi.addFiles(fileBlobs);
    console.log("Uploading...");
    // await ghApi.commit(message);
    await ghApi.commit(message, date);
    console.log(`1/${commitsPerDay}`);
    if (!once) {
        for (let i = 2; i <= commitsPerDay; i++) {
            // await ghApi.commit("...");
            await ghApi.commit("...", date);
            console.log(`${i}/${commitsPerDay}`);
        }
    }
    console.log("Done.");
}