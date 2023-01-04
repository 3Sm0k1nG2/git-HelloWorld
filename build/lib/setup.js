"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const publicFsWriterReader_1 = require("./publicFsWriterReader");
const date_1 = require("./date");
const preview_1 = require("./preview");
const validator_1 = require("./validator");
async function setup(msg, startDate, previewMsgTranformed = false) {
    msg = await (0, validator_1.getValidMsg)(msg);
    startDate = (0, validator_1.getValidDate)(startDate);
    (0, publicFsWriterReader_1.writeFile)("message.txt", msg);
    (0, publicFsWriterReader_1.writeFile)("start-date.txt", (0, date_1.parseFromDate)(startDate));
    let msgTransformed = await (0, preview_1.transform)(msg);
    if (msgTransformed) {
        console.log(msgTransformed.toString());
    }
    (0, publicFsWriterReader_1.writeFile)("preview.txt", msgTransformed.toString());
    // do cells file
}
exports.setup = setup;
//# sourceMappingURL=setup.js.map