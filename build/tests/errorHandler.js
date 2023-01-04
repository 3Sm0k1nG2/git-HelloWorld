"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorDetails = void 0;
const error_1 = require("../lib/error");
function getErrorDetails(err) {
    if (!(err instanceof error_1.CustomError)) {
        throw new error_1.CustomError(err);
    }
    return err.toString();
}
exports.getErrorDetails = getErrorDetails;
//# sourceMappingURL=errorHandler.js.map