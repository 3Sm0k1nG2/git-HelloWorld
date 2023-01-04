"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const consts_1 = require("../../consts");
const date_1 = require("../common/date");
const error_1 = require("../common/error");
async function validate({ msg, dates, data, dataPos, commits }, isDrawMode = false, today) {
    // data.data.match(/$0|1^/g)
    console.log({ msg, dates, data });
    console.log(data);
    validateData(msg, data, dataPos, isDrawMode);
    validateDates(dates, today, isDrawMode);
}
exports.validate = validate;
function validateDates(dates, today, isDrawMode = false) {
    let todayDateValue = today.valueOf();
    if (todayDateValue < (0, date_1.parseToDate)(dates.start).valueOf()) {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATE_TODAY_BEFORE_START);
    }
    if (!isDrawMode) {
        if (todayDateValue > (0, date_1.parseToDate)(dates.end).valueOf()) {
            throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATE_TODAY_AFTER_END);
        }
    }
    let lastDate = (0, date_1.parseToDate)(dates.last);
    if (todayDateValue === lastDate.valueOf()) {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATE_TODAY_ALREADY_RUN);
    }
    if (lastDate.valueOf() >= (0, date_1.parseToDate)(dates.start).valueOf() &&
        todayDateValue !== lastDate.setDate(lastDate.getDate() + 1).valueOf()) {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATA_SEQUENCE_CORRUPTED);
    }
}
async function validateData(msg, data, dataPos, isDrawMode = false) {
    if (isNaN(Number(dataPos))) {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATA_DATAPOS_NOT_NUMBER);
    }
    let dataArr = data.split("\n");
    if (dataArr[0] !== consts_1.CSV_HEADER) {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATA_INVALID);
    }
    let dataLine = dataArr[Number(dataPos)].split(consts_1.CSV_SEPARATOR);
    if (dataLine.length !== 4 ||
        !((0, date_1.parseToDate)(dataLine[0]) instanceof Date) ||
        isNaN(Number(dataLine[2])) ||
        isNaN(Number(dataLine[3]))) {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_DATA_INVALID);
    }
}
//# sourceMappingURL=validator.js.map