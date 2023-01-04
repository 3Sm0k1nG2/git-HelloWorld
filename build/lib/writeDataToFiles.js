"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataToFiles = void 0;
const date_1 = require("./date");
const msgTransformed_1 = require("./msgTransformed");
const publicFsWriterReader_1 = require("./publicFsWriterReader");
// 🟦, ⬛
// 🟩, ⬛
// 1, 0
let [showSymbol, hiddenSymbol] = ['🟦', '⬛'];
async function writeDataToFiles(data) {
    let { msg, dates } = data;
    let t_msg = await (0, msgTransformed_1.createMsgTransformed)(msg);
    let promises = [
        (0, publicFsWriterReader_1.writeFile)("message.txt", msg),
        (0, publicFsWriterReader_1.writeFile)("start-date.txt", (0, date_1.parseFromDate)(dates.start)),
        (0, publicFsWriterReader_1.writeFile)("current-date.txt", (0, date_1.parseFromDate)(dates.current)),
        (0, publicFsWriterReader_1.writeFile)("end-date.txt", (0, date_1.parseFromDate)(dates.end)),
        (0, publicFsWriterReader_1.writeFile)("data.txt", t_msg.toString()),
        (0, publicFsWriterReader_1.writeFile)("preview.txt", t_msg.toString(showSymbol, hiddenSymbol)),
        (0, publicFsWriterReader_1.writeFile)("preview-full.txt", t_msg.toFullString(showSymbol, hiddenSymbol)),
    ];
    console.log(t_msg.toFullString(showSymbol, hiddenSymbol));
}
exports.writeDataToFiles = writeDataToFiles;
//# sourceMappingURL=writeDataToFiles.js.map