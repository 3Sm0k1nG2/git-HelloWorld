"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const githubAPIOnlyCommit_1 = require("./lib/main/githubAPIOnlyCommit");
const date_1 = require("./lib/common/date");
const publicFsWriterReader_1 = require("./lib/common/publicFsWriterReader");
const consts_1 = require("./consts");
const error_1 = require("./lib/common/error");
const utils_for_main_and_fast_1 = require("./lib/common/utils-for-main-and-fast");
const MSG_FILE_PATH = "message.txt";
main();
function main(today = (0, date_1.getToday)(), commitsPerDay = 50) {
    (0, utils_for_main_and_fast_1.getDependencies)(today)
        .then(async ({ git, data }) => {
        if ((0, date_1.parseFromDate)(today) === (0, date_1.parseFromDate)(data.dates.start)) {
            await commit(git, [{ path: MSG_FILE_PATH, content: data.msg }], `Starts writing: ${data.msg}`, true);
        }
        let { date, symbol, cur, max } = (0, utils_for_main_and_fast_1.extractDataLine)(data.data[data.dataPos]);
        if ((0, date_1.parseFromDate)(today) === (0, date_1.parseFromDate)(date)) {
            await commit(git, [{ path: MSG_FILE_PATH, content: data.msg }], `writing: ${symbol} - ${cur}/${max}`, false, commitsPerDay);
            await (0, publicFsWriterReader_1.writeFile)("data-pos.txt", (data.dataPos + 1).toString());
        }
    })
        .then(() => (0, utils_for_main_and_fast_1.overwriteLastDateFile)(today))
        .catch(error_1.errorHandler);
}
async function commit(git, files, message, once = false, commitsPerDay = 50, date = (0, date_1.getToday)()) {
    const ghApi = new githubAPIOnlyCommit_1.GithubAPIOnlyCommit(git.auth);
    await ghApi.authenticate();
    let { owner, repo } = (0, utils_for_main_and_fast_1.extractOwnerAndRepoFromGitURL)(git.url);
    ghApi.setOwner(owner);
    ghApi.setRepo(repo);
    ghApi.setBranch(consts_1.DEFAULT_BRANCH);
    let fileBlobs = files.map((file) => {
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
//# sourceMappingURL=main.js.map