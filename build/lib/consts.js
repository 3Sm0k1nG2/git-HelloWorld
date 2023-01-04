"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.PUBLIC_FILE_NAMES = exports.PUBLIC_FILE_PATH = exports.COL_MAX = exports.COL_MIN = exports.ROW_MAX = exports.ROW_MIN = exports.CELL_MAX = exports.CELL_MIN = void 0;
exports.CELL_MIN = 1;
exports.CELL_MAX = 280;
exports.ROW_MIN = 1;
exports.ROW_MAX = 7;
exports.COL_MIN = 1;
exports.COL_MAX = 40;
exports.PUBLIC_FILE_PATH = "";
exports.PUBLIC_FILE_NAMES = {
    MESSAGE: "message.txt",
    PREVIEW: "preview.txt",
    CELLS: "cells.txt",
    START_DATE: "start-date.txt",
    ASCII: "ascii.json"
};
exports.ERROR_MESSAGES = {
    INPUT_MISSING: "Usage: setup START_DATE MESSAGE(could include spaces)\n"
        + "START_DATE - date to start commiting, format as yyyy-mm-dd\n"
        + "MESSAGE - message to display\n",
    INPUT_MSG_TOO_LONG: "Message too long.",
    INPUT_DATE_INVALID: "Date is invalid.",
};
//# sourceMappingURL=consts.js.map