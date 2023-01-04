export type ERROR_TYPES = {
    COMMON_URL_INVALID
    COMMON_URL_DOMAIN_INVALID

    INPUT_MISSING
    INPUT_MSG_INVALID
    INPUT_MSG_TOO_LONG
    INPUT_DATE_INVALID
    INPUT_DATE_IN_THE_PAST
    INPUT_TOKEN_GHP
    INPUT_TOKEN_INVALID

    MAIN_FILE_NOT_EXISTENT
    MAIN_FILE_EMPTY
    MAIN_ALREADY_RUN
    MAIN_MSG_CORRUPTED

    MAIN_DATA_INVALID
    MAIN_DATA_DATAPOS_NOT_NUMBER
    MAIN_DATE_TODAY_BEFORE_START
    MAIN_DATE_TODAY_AFTER_END
    MAIN_DATE_TODAY_ALREADY_RUN
    MAIN_DATA_SEQUENCE_CORRUPTED
    MAIN_MSG_AND_DATA_MISMATCH

    GIT_NO_FILES_TO_COMMIT

    DATE_PARSER_MONTH_UNDEFINED
};

export interface ERROR_DATA {
    COMMON_URL_INVALID: {}
    COMMON_URL_DOMAIN_INVALID: {}

    INPUT_MISSING: {}
    INPUT_MSG_INVALID: {}
    INPUT_MSG_TOO_LONG: inputMsgTooLong
    INPUT_DATE_INVALID: inputDateInvalid
    INPUT_DATE_IN_THE_PAST: {}
    INPUT_TOKEN_GHP: {}
    INPUT_TOKEN_INVALID: {}

    MAIN_FILE_NOT_EXISTENT: mainFile
    MAIN_FILE_EMPTY: mainFile
    MAIN_ALREADY_RUN: {}
    MAIN_MSG_CORRUPTED: {}
    
    MAIN_DATA_INVALID: {}
    MAIN_DATA_DATAPOS_NOT_NUMBER: {}
    MAIN_DATE_TODAY_BEFORE_START: {}
    MAIN_DATE_TODAY_AFTER_END: {}
    MAIN_DATE_TODAY_ALREADY_RUN: {}
    MAIN_DATA_SEQUENCE_CORRUPTED: {}
    MAIN_MSG_AND_DATA_MISMATCH: {}

    GIT_NO_FILES_TO_COMMIT: {}

    DATE_PARSER_MONTH_UNDEFINED: {}
}

interface inputMsgTooLong {
    msg: string;
    written: string;
}

interface inputDateInvalid {
    err: Error;
}

interface mainFile {
    path: string
}