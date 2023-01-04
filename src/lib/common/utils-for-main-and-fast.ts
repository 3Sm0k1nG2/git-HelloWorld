import {
    CSV_SEPARATOR,
    GITHUB_DOMAIN,
    GITHUB_REGEXP_FLAGS,
    GITHUB_REGEXP_PATTERN,
} from "../../consts";
import { readCredentials } from "../main/readCredentialsFile";
import { readDataFromFiles } from "../main/readDataFromFiles";
import { validate } from "../main/validator";
import { parseFromDate, parseToDate } from "./date";
import { CustomError } from "./error";
import { writeFile } from "./publicFsWriterReader";
import { validateAuth, validateUrl } from "./validator";

const DATE_LAST_FILE_PATH = "date-last.txt";


function overwriteLastDateFile(date: Date) {
    return writeFile(DATE_LAST_FILE_PATH, parseFromDate(date), {
        encoding: "utf-8",
    });
}

function extractOwnerAndRepoFromGitURL(url: string) {
    if (!url.startsWith(GITHUB_DOMAIN)) {
        throw new CustomError(CustomError.types.COMMON_URL_DOMAIN_INVALID);
    }

    let regExp = new RegExp(GITHUB_REGEXP_PATTERN, GITHUB_REGEXP_FLAGS);
    let match: RegExpMatchArray;

    if (!(match = regExp.exec(url)).length) {
        throw new CustomError(CustomError.types.COMMON_URL_INVALID);
    }

    let tmp = match.groups["repo"].split(".");
    tmp[tmp.length - 1] === "git" ? tmp.pop() : null;

    return {
        owner: match.groups["owner"],
        repo: tmp.join("."),
    };
}

function getDependencies(today: Date, isDrawMode = false) {
    return Promise.all([
        readCredentials().then(({ url, auth }) => {
            validateUrl(url);
            validateAuth(auth);

            return {
                url,
                auth,
            };
        }),
        readDataFromFiles().then(
            async ({ msg, dates, data, dataPos, commits }) => {
                await validate(
                    { msg, dates, data, dataPos, commits },
                    isDrawMode,
                    today
                );

                return {
                    msg: msg as string,
                    dates: {
                        last: parseToDate(dates.last),
                        start: parseToDate(dates.start),
                        end: parseToDate(dates.end),
                    },
                    data: (data as string).split("\n"),
                    dataPos: Number(dataPos),
                    commits: {
                        cur: Number(commits.cur),
                        max: Number(commits.max),
                    },
                };
            }
        ),
    ]).then((results) => {
        return {
            git: results[0],
            data: results[1],
        };
    });
}

function extractDataLine(dataLine: string) {
    let data = dataLine.split(CSV_SEPARATOR);

    return {
        date: parseToDate(data[0]),
        symbol: data[1],
        cur: Number(data[2]),
        max: Number(data[3]),
    };
}

function overwriteDataPosFile(dataPos: number) {
    return writeFile("data-pos.txt", dataPos.toString());
}

function overwriteCommitsFile(cur: number, max: number) {
    return writeFile("commits.txt", `${cur}/${max}`);
}

export {
    overwriteLastDateFile,
    extractOwnerAndRepoFromGitURL,
    getDependencies,
    extractDataLine,
    overwriteCommitsFile,
    overwriteDataPosFile
};
