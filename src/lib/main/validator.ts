import { CSV_FIELDS, CSV_HEADER, CSV_SEPARATOR } from "../../consts";
import { data } from "../../types/MainData";
import { getToday, parseToDate } from "../common/date";
import { CustomError } from "../common/error";
import { createMsgTransformed } from "../setup/msgTransformed";

export async function validate(
    { msg, dates, data, dataPos, commits }: data,
    isDrawMode = false,
    today: Date
) {
    // data.data.match(/$0|1^/g)
    console.log({ msg, dates, data });
    console.log(data);

    validateData(msg, data, dataPos, isDrawMode);
    validateDates(dates, today, isDrawMode);
}

function validateDates(
    dates: { last: string; start: string; end: string },
    today: Date,
    isDrawMode = false
) {
    let todayDateValue = today.valueOf();

    if (todayDateValue < parseToDate(dates.start).valueOf()) {
        throw new CustomError(CustomError.types.MAIN_DATE_TODAY_BEFORE_START);
    }

    if (!isDrawMode) {
        if (todayDateValue > parseToDate(dates.end).valueOf()) {
            throw new CustomError(CustomError.types.MAIN_DATE_TODAY_AFTER_END);
        }
    }

    let lastDate = parseToDate(dates.last);

    if (todayDateValue === lastDate.valueOf()) {
        throw new CustomError(CustomError.types.MAIN_DATE_TODAY_ALREADY_RUN);
    }

    if (
        lastDate.valueOf() >= parseToDate(dates.start).valueOf() &&
        todayDateValue !== lastDate.setDate(lastDate.getDate() + 1).valueOf()
    ) {
        throw new CustomError(CustomError.types.MAIN_DATA_SEQUENCE_CORRUPTED);
    }
}

async function validateData(
    msg: string,
    data: string,
    dataPos: string,
    isDrawMode = false
) {
    if (isNaN(Number(dataPos))) {
        throw new CustomError(CustomError.types.MAIN_DATA_DATAPOS_NOT_NUMBER);
    }

    let dataArr = data.split("\n");
    if (dataArr[0] !== CSV_HEADER) {
        throw new CustomError(CustomError.types.MAIN_DATA_INVALID);
    }
    let dataLine = dataArr[Number(dataPos)].split(CSV_SEPARATOR);
    if (
        dataLine.length !== 4 ||
        !(parseToDate(dataLine[0]) instanceof Date) ||
        isNaN(Number(dataLine[2])) ||
        isNaN(Number(dataLine[3]))
    ) {
        throw new CustomError(CustomError.types.MAIN_DATA_INVALID);
    }
}
