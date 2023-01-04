"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const date_1 = require("./lib/common/date");
const error_1 = require("./lib/common/error");
const publicFsWriterReader_1 = require("./lib/common/publicFsWriterReader");
const utils_for_main_and_fast_1 = require("./lib/common/utils-for-main-and-fast");
const githubAPIOnlyCommit_1 = require("./lib/main/githubAPIOnlyCommit");
// To be implemented/refactored
spamDays();
function spamDays() {
    let today = (0, date_1.getToday)();
    let commitsPerDay = 50;
    let gl_dataPos = 0;
    let gl_cur = 0;
    let gl_max = 0;
    let gl_lastDate = today;
    let gl_commit = {
        cur: 0,
        max: commitsPerDay
    };
    (0, utils_for_main_and_fast_1.getDependencies)(today)
        .then(async ({ git, data }) => {
        const ghApi = new githubAPIOnlyCommit_1.GithubAPIOnlyCommit(git.auth);
        await ghApi.authenticate();
        let { owner, repo } = (0, utils_for_main_and_fast_1.extractOwnerAndRepoFromGitURL)(git.url);
        ghApi.setOwner(owner);
        ghApi.setRepo(repo);
        ghApi.setBranch(consts_1.DEFAULT_BRANCH);
        let fileBlobs = [{
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
        if (line === 1) {
            console.log(`Starts writing: ${data.msg}`);
            await ghApi.commit(`Starts writing: ${data.msg}`, data.dates.start);
            // await commit(git, [{path: MSG_FILE_PATH, content: data.msg}], `Starts writing: ${data.msg}`, true);
        }
        for (let i = line; i < maxLines; i++) {
            let { date, symbol, cur, max } = (0, utils_for_main_and_fast_1.extractDataLine)(data.data[i]);
            gl_cur = cur;
            gl_max = max;
            gl_dataPos = i;
            gl_lastDate = date;
            if (gl_commit.cur === 0) {
                console.log(`writing: ${symbol} - ${cur}/${max} | ${(0, date_1.parseFromDate)(date)}`);
                console.log(`${gl_commit.cur + 1}/${gl_commit.max}`);
                await (0, utils_for_main_and_fast_1.overwriteCommitsFile)(2, gl_commit.max);
                await ghApi.commit(`writing: ${symbol} - ${cur}/${max} | ${(0, date_1.parseFromDate)(date)}`, date);
                gl_commit.cur += 2;
            }
            for (let j = gl_commit.cur; j <= gl_commit.max; j++) {
                gl_commit.cur = j;
                console.log(`${gl_commit.cur}/${gl_commit.max}`);
                await (0, utils_for_main_and_fast_1.overwriteCommitsFile)(gl_commit.cur, gl_commit.max);
                await ghApi.commit("...", date);
            }
            gl_commit.cur = 0;
            await (0, utils_for_main_and_fast_1.overwriteCommitsFile)(gl_commit.cur, gl_commit.max);
            await (0, utils_for_main_and_fast_1.overwriteDataPosFile)(++gl_dataPos);
            await (0, utils_for_main_and_fast_1.overwriteLastDateFile)(gl_lastDate);
            // await commit(git, [{path: MSG_FILE_PATH, content: data.msg}], `writing: ${symbol} - ${cur}/${max}`, false, commitsPerDay, date);
        }
        console.log("Done.");
    })
        .catch(error_1.errorHandler)
        .finally(async () => await Promise.all([
        (0, publicFsWriterReader_1.writeFile)("data-pos.txt", gl_dataPos.toString()),
        (0, utils_for_main_and_fast_1.overwriteLastDateFile)(gl_lastDate),
        (0, publicFsWriterReader_1.writeFile)("commits.txt", `${gl_commit.cur}/${gl_commit.max}`)
    ]));
}
//# sourceMappingURL=fast.js.map