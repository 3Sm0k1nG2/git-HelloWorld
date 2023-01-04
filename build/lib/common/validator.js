"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = exports.validateMsg = exports.validateAuth = exports.validateUrl = void 0;
const consts_1 = require("../../consts");
const ascii_1 = require("./ascii");
const date_1 = require("./date");
const error_1 = require("./error");
function validateUrl(url) {
    if (!url.startsWith(consts_1.GITHUB_DOMAIN)) {
        throw new error_1.CustomError(error_1.CustomError.types.COMMON_URL_DOMAIN_INVALID);
    }
    let regExp = new RegExp(consts_1.GITHUB_REGEXP_PATTERN, consts_1.GITHUB_REGEXP_FLAGS);
    let match;
    if (!(match = regExp.exec(url)).length) {
        throw new error_1.CustomError(error_1.CustomError.types.COMMON_URL_INVALID);
    }
}
exports.validateUrl = validateUrl;
function validateAuth(auth) {
    if (auth.startsWith("ghp_")) {
        throw new error_1.CustomError(error_1.CustomError.types.INPUT_TOKEN_GHP);
    }
    if (!auth.startsWith("github_pat_")) {
        throw new error_1.CustomError(error_1.CustomError.types.INPUT_TOKEN_INVALID);
    }
}
exports.validateAuth = validateAuth;
async function validateMsg(msg) {
    const ascii = await (0, ascii_1.readAsciiCharacters)();
    // let c: keyof typeof ascii;
    let length = 0;
    let written = "";
    for (let c of msg.toUpperCase()) {
        length += c === " " ? ascii[c][0].length : ascii[c][0].length + 1;
        if (c === " " ? length > consts_1.COL_MAX : length - 1 > consts_1.COL_MAX) {
            throw new error_1.CustomError(error_1.CustomError.types.INPUT_MSG_TOO_LONG, {
                msg,
                written,
            });
        }
        written += c;
    }
}
exports.validateMsg = validateMsg;
function validateDate(date) {
    if (!(date instanceof Date)) {
        try {
            date = new Date(date);
        }
        catch (err) {
            throw new error_1.CustomError(error_1.CustomError.types.INPUT_DATE_INVALID, err);
        }
    }
    if (date.valueOf() < (0, date_1.getToday)().valueOf()) {
        console.warn("Error bypassed: " + error_1.CustomError.types.INPUT_DATE_IN_THE_PAST);
        // throw new CustomError(CustomError.types.INPUT_DATE_IN_THE_PAST);
    }
}
exports.validateDate = validateDate;
//# sourceMappingURL=validator.js.map