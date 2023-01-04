"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.errorHandler = void 0;
const process_1 = require("process");
const consts_1 = require("../consts");
class CustomError extends Error {
    type;
    constructor(type, msg) {
        super(msg);
        this.type = type;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    toString() {
        return (consts_1.ERROR_MESSAGES[this.type].toString()
            + "\n"
            + this.message.toString());
    }
}
exports.CustomError = CustomError;
const ERRORS = {
    INPUT_MISSING: "INPUT_MISSING",
    INPUT_MSG_TOO_LONG: "INPUT_MSG_TOO_LONG",
    INPUT_DATE_INVALID: "INPUT_DATE_INVALID"
};
function errorHandler(err) {
    // if(!(err instanceof CustomError)){
    //     throw new CustomError(err;
    // }
    console.warn(err);
    (0, process_1.exit)();
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.old.js.map