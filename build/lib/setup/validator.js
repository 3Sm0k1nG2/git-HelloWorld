"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const consts_1 = require("../../consts");
const error_1 = require("../common/error");
const validator_1 = require("../common/validator");
async function validateInput(input) {
    let { url, auth, secret, date, msg } = input;
    if (Object.values(input).length < consts_1.INPUT_LENGTH_MIN) {
        throw new error_1.CustomError(error_1.CustomError.types.INPUT_MISSING);
    }
    if (Object.values(input).some((x) => x.length === 0)) {
        throw new error_1.CustomError(error_1.CustomError.types.INPUT_MISSING);
    }
    (0, validator_1.validateUrl)(url);
    (0, validator_1.validateAuth)(auth);
    await (0, validator_1.validateMsg)(msg);
    (0, validator_1.validateDate)(date);
}
exports.validateInput = validateInput;
//# sourceMappingURL=validator.js.map