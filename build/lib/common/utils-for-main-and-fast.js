"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overwriteDataPosFile = exports.overwriteCommitsFile = exports.extractDataLine = exports.getDependencies = exports.extractOwnerAndRepoFromGitURL = exports.overwriteLastDateFile = void 0;
const consts_1 = require("../../consts");
const readCredentialsFile_1 = require("../main/readCredentialsFile");
const readDataFromFiles_1 = require("../main/readDataFromFiles");
const validator_1 = require("../main/validator");
const date_1 = require("./date");
const error_1 = require("./error");
const publicFsWriterReader_1 = require("./publicFsWriterReader");
const validator_2 = require("./validator");
const DATE_LAST_FILE_PATH = "date-last.txt";
function overwriteLastDateFile(date) {
    return (0, publicFsWriterReader_1.writeFile)(DATE_LAST_FILE_PATH, (0, date_1.parseFromDate)(date), {
        encoding: "utf-8",
    });
}
exports.overwriteLastDateFile = overwriteLastDateFile;
function extractOwnerAndRepoFromGitURL(url) {
    if (!url.startsWith(consts_1.GITHUB_DOMAIN)) {
        throw new error_1.CustomError(error_1.CustomError.types.COMMON_URL_DOMAIN_INVALID);
    }
    let regExp = new RegExp(consts_1.GITHUB_REGEXP_PATTERN, consts_1.GITHUB_REGEXP_FLAGS);
    let match;
    if (!(match = regExp.exec(url)).length) {
        throw new error_1.CustomError(error_1.CustomError.types.COMMON_URL_INVALID);
    }
    let tmp = match.groups["repo"].split(".");
    tmp[tmp.length - 1] === "git" ? tmp.pop() : null;
    return {
        owner: match.groups["owner"],
        repo: tmp.join("."),
    };
}
exports.extractOwnerAndRepoFromGitURL = extractOwnerAndRepoFromGitURL;
function getDependencies(today, isDrawMode = false) {
    return Promise.all([
        (0, readCredentialsFile_1.readCredentials)().then(({ url, auth }) => {
            (0, validator_2.validateUrl)(url);
            (0, validator_2.validateAuth)(auth);
            return {
                url,
                auth,
            };
        }),
        (0, readDataFromFiles_1.readDataFromFiles)().then(async ({ msg, dates, data, dataPos, commits }) => {
            await (0, validator_1.validate)({ msg, dates, data, dataPos, commits }, isDrawMode, today);
            return {
                msg: msg,
                dates: {
                    last: (0, date_1.parseToDate)(dates.last),
                    start: (0, date_1.parseToDate)(dates.start),
                    end: (0, date_1.parseToDate)(dates.end),
                },
                data: data.split("\n"),
                dataPos: Number(dataPos),
                commits: {
                    cur: Number(commits.cur),
                    max: Number(commits.max),
                },
            };
        }),
    ]).then((results) => {
        return {
            git: results[0],
            data: results[1],
        };
    });
}
exports.getDependencies = getDependencies;
function extractDataLine(dataLine) {
    let data = dataLine.split(consts_1.CSV_SEPARATOR);
    return {
        date: (0, date_1.parseToDate)(data[0]),
        symbol: data[1],
        cur: Number(data[2]),
        max: Number(data[3]),
    };
}
exports.extractDataLine = extractDataLine;
function overwriteDataPosFile(dataPos) {
    return (0, publicFsWriterReader_1.writeFile)("data-pos.txt", dataPos.toString());
}
exports.overwriteDataPosFile = overwriteDataPosFile;
function overwriteCommitsFile(cur, max) {
    return (0, publicFsWriterReader_1.writeFile)("commits.txt", `${cur}/${max}`);
}
exports.overwriteCommitsFile = overwriteCommitsFile;
//# sourceMappingURL=utils-for-main-and-fast.js.map