import { exit } from "process";
import { ERROR_DATA, ERROR_TYPES } from "../../types/Error";

type ERROR_TYPE = keyof ERROR_TYPES;

class CustomError extends Error {
    public readonly type: ERROR_TYPE;
    public readonly data: ERROR_DATA[typeof this.type];

    public static readonly types: { [key in ERROR_TYPE]: ERROR_TYPE } = {
        COMMON_URL_INVALID: "COMMON_URL_INVALID",
        COMMON_URL_DOMAIN_INVALID: "COMMON_URL_DOMAIN_INVALID",

        INPUT_MISSING: "INPUT_MISSING",
        INPUT_MSG_INVALID: "INPUT_MSG_INVALID",
        INPUT_MSG_TOO_LONG: "INPUT_MSG_TOO_LONG",
        INPUT_DATE_INVALID: "INPUT_DATE_INVALID",
        INPUT_DATE_IN_THE_PAST: "INPUT_DATE_IN_THE_PAST",
        INPUT_TOKEN_GHP: "INPUT_TOKEN_GHP",
        INPUT_TOKEN_INVALID: "INPUT_TOKEN_INVALID",

        MAIN_FILE_NOT_EXISTENT: "MAIN_FILE_NOT_EXISTENT",
        MAIN_FILE_EMPTY: "MAIN_FILE_EMPTY",
        MAIN_ALREADY_RUN: "MAIN_ALREADY_RUN",
        MAIN_MSG_CORRUPTED: "MAIN_MSG_CORRUPTED",

        MAIN_DATA_INVALID: "MAIN_DATA_INVALID",
        MAIN_DATA_DATAPOS_NOT_NUMBER: "MAIN_DATA_DATAPOS_NOT_NUMBER",
        MAIN_DATE_TODAY_BEFORE_START: "MAIN_DATE_TODAY_BEFORE_START",
        MAIN_DATE_TODAY_AFTER_END: "MAIN_DATE_TODAY_AFTER_END",
        MAIN_DATE_TODAY_ALREADY_RUN: "MAIN_DATE_TODAY_ALREADY_RUN",
        MAIN_DATA_SEQUENCE_CORRUPTED: "MAIN_DATA_SEQUENCE_CORRUPTED",
        MAIN_MSG_AND_DATA_MISMATCH: "MAIN_MSG_AND_DATA_MISMATCH",

        GIT_NO_FILES_TO_COMMIT: "GIT_NO_FILES_TO_COMMIT",

        DATE_PARSER_MONTH_UNDEFINED: "DATE_PARSER_MONTH_UNDEFINED",
    } as const;

    public static readonly messages: { [key in ERROR_TYPE]: string } = {
        COMMON_URL_INVALID: "Provided url is invalid.",
        COMMON_URL_DOMAIN_INVALID: "Specified domain does not match github.",

        INPUT_MISSING:
            "Usage: setup URL AUTH SECRET START_DATE MESSAGE(could include spaces)\n" +
            "URL - git repo url\n" +
            "AUTH - auth token for the git repo\n" +
            "SECRET - passphrase to encrypt the credentials\n" +
            "START_DATE - date to start commiting, format as yyyy-mm-dd\n" +
            "MESSAGE - message to display\n",
        INPUT_MSG_INVALID: "Message invalid",
        INPUT_MSG_TOO_LONG: "Message too long.",
        INPUT_DATE_INVALID: "Date is invalid.",
        INPUT_DATE_IN_THE_PAST: "Cannot set start-date in the past.",
        INPUT_TOKEN_GHP: "Please use FGPAT token.",
        INPUT_TOKEN_INVALID: "Invalid auth token.",

        MAIN_FILE_NOT_EXISTENT: "File not existing.",
        MAIN_FILE_EMPTY: "File empty",
        MAIN_ALREADY_RUN: "Program has been run today.",
        MAIN_MSG_CORRUPTED: "Program message sequence corrupted.",

        MAIN_DATA_INVALID: "Data invalid.",
        MAIN_DATA_DATAPOS_NOT_NUMBER: "Data pos not a number.",
        MAIN_DATE_TODAY_BEFORE_START: "Today not reached start date.",
        MAIN_DATE_TODAY_AFTER_END: "Today has already reached end date.",
        MAIN_DATE_TODAY_ALREADY_RUN: "Today has been already run.",
        MAIN_DATA_SEQUENCE_CORRUPTED:
            "Date/Message sequence corrupted.\n" +
            "A day or more have been skipped.",
        MAIN_MSG_AND_DATA_MISMATCH: "Initial message and data mismatching.",

        GIT_NO_FILES_TO_COMMIT: "No files found to commit.",

        DATE_PARSER_MONTH_UNDEFINED: "Month should be defined.",
    } as const;

    constructor(
        type: ERROR_TYPE,
        data?: ERROR_DATA[typeof type],
        msg?: string
    ) {
        super(msg ?? CustomError.messages[type]);
        this.type = type;
        this.data = data as ERROR_DATA[typeof this.type];

        Object.setPrototypeOf(this, CustomError.prototype);
    }
} 

function errorHandler(err: any) {
    if (!(err instanceof CustomError)) {
        if(err?.name !== "HttpError"){
            throw err;
        }
    }

    switch (err.type) {
        case CustomError.types.INPUT_MSG_TOO_LONG: {
            let data = err.data as ERROR_DATA["INPUT_MSG_TOO_LONG"];

            console.error(
                `${err.message}` +
                    `\nmsg: ${data.msg}` +
                    `\n     ${" ".repeat(data.written.length)}^` +
                    `\nwritten: ${data.written}`
            );
            break;
        }
        case CustomError.types.INPUT_DATE_INVALID: {
            let data = err.data as ERROR_DATA["INPUT_DATE_INVALID"];

            console.error(data.err);

            break;
        }
        case CustomError.types.MAIN_FILE_NOT_EXISTENT: {
            let data = err.data as ERROR_DATA["MAIN_FILE_NOT_EXISTENT"];

            console.error(`${err.message} filename: ${data.path}`);

            break;
        }
        default: {
            console.error(err.message);
            break;
        }
    }

    console.log("Exiting...");
    exit();
}

export { errorHandler, CustomError };
