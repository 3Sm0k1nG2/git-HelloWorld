import {
    COL_MAX,
    GITHUB_DOMAIN,
    GITHUB_REGEXP_FLAGS,
    GITHUB_REGEXP_PATTERN,
} from "../../consts";
import { readAsciiCharacters } from "./ascii";
import { getToday } from "./date";
import { CustomError } from "./error";

function validateUrl(url: string) {
    if (!url.startsWith(GITHUB_DOMAIN)) {
        throw new CustomError(CustomError.types.COMMON_URL_DOMAIN_INVALID);
    }

    let regExp = new RegExp(GITHUB_REGEXP_PATTERN, GITHUB_REGEXP_FLAGS);
    let match: RegExpMatchArray;

    if (!(match = regExp.exec(url)).length) {
        throw new CustomError(CustomError.types.COMMON_URL_INVALID);
    }
}

function validateAuth(auth: string) {
    if (auth.startsWith("ghp_")) {
        throw new CustomError(CustomError.types.INPUT_TOKEN_GHP);
    }

    if (!auth.startsWith("github_pat_")) {
        throw new CustomError(CustomError.types.INPUT_TOKEN_INVALID);
    }
}

async function validateMsg(msg: string): Promise<void> {
    const ascii = await readAsciiCharacters();
    // let c: keyof typeof ascii;

    let length = 0;
    let written = "";

    for (let c of msg.toUpperCase()) {
        length += c === " " ? ascii[c][0].length : ascii[c][0].length + 1;

        if (c === " " ? length > COL_MAX : length - 1 > COL_MAX) {
            throw new CustomError(CustomError.types.INPUT_MSG_TOO_LONG, {
                msg,
                written,
            });
        }

        written += c;
    }
}

function validateDate(date: Date | string) {
    if (!(date instanceof Date)) {
        try {
            date = new Date(date);
        } catch (err) {
            throw new CustomError(CustomError.types.INPUT_DATE_INVALID, err);
        }
    }

    if (date.valueOf() < getToday().valueOf()) {
        console.warn("Error bypassed: " + CustomError.types.INPUT_DATE_IN_THE_PAST);
        // throw new CustomError(CustomError.types.INPUT_DATE_IN_THE_PAST);
    }
}

export { validateUrl, validateAuth, validateMsg, validateDate };
