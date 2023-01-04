"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToday = exports.parseFromDate = exports.parseToDate = void 0;
const error_1 = require("./error");
const locale = "ISO";
const options = { day: "2-digit", month: "2-digit", year: "numeric" };
function parseToDate(year, month, date) {
    if (typeof year === "string") {
        let date = new Date(year);
        date.setHours(12, 0, 0, 0);
        return date;
    }
    if (!month) {
        throw new error_1.CustomError(error_1.CustomError.types.DATE_PARSER_MONTH_UNDEFINED);
    }
    return new Date(Number(year), month, date, 12);
}
exports.parseToDate = parseToDate;
function parseFromDate(date) {
    return date.toLocaleDateString(locale, options);
}
exports.parseFromDate = parseFromDate;
function getToday() {
    let today = new Date();
    today.setHours(12, 0, 0, 0);
    return today;
}
exports.getToday = getToday;
//# sourceMappingURL=date.js.map