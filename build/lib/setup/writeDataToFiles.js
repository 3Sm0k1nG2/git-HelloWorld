"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDataToFiles = void 0;
const date_1 = require("../common/date");
const msgTransformed_1 = require("./msgTransformed");
const publicFsWriterReader_1 = require("../common/publicFsWriterReader");
const consts_1 = require("../../consts");
// 🟦, ⬛
// 🟩, ⬛
// 1, 0
let [showSymbol, hiddenSymbol] = ["🟦", "⬛"];
async function writeDataToFiles(data) {
    let { msg, dates } = data;
    let t_msg = await (0, msgTransformed_1.createMsgTransformed)(msg);
    console.log(t_msg.toFullString(showSymbol, hiddenSymbol));
    return Promise.all([
        convertToData(t_msg, dates.start)
            .then(data => (0, publicFsWriterReader_1.writeFile)("data.txt", data)),
        (0, publicFsWriterReader_1.writeFile)("commits.txt", "2/50"),
        (0, publicFsWriterReader_1.writeFile)("data-pos.txt", "1"),
        (0, publicFsWriterReader_1.writeFile)("message.txt", msg),
        (0, publicFsWriterReader_1.writeFile)("date-last.txt", (0, date_1.parseFromDate)(dates.last)),
        (0, publicFsWriterReader_1.writeFile)("date-start.txt", (0, date_1.parseFromDate)(dates.start)),
        (0, publicFsWriterReader_1.writeFile)("date-end.txt", (0, date_1.parseFromDate)(dates.end)),
        (0, publicFsWriterReader_1.writeFile)("preview.txt", t_msg.toString(showSymbol, hiddenSymbol)),
        (0, publicFsWriterReader_1.writeFile)("preview-full.txt", t_msg.toFullString(showSymbol, hiddenSymbol)),
    ]);
}
exports.writeDataToFiles = writeDataToFiles;
async function convertToData(t_msg, startDate) {
    let date = new Date(startDate);
    let tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() - 1);
    let transformedMsg = t_msg.getTransformedMsg();
    let originalMsg = t_msg.getOriginalMsg();
    let data = consts_1.CSV_HEADER + "\n";
    for (let l = 0; l < transformedMsg.length; l++) {
        let letterLength = await (0, msgTransformed_1.getLetterDaysLength)(originalMsg[l]);
        let count = 0;
        for (let c = 0; c < transformedMsg[l][0].length; c++) {
            for (let r = 0; r < transformedMsg[l].length; r++) {
                tmpDate.setDate(tmpDate.getDate() + 1);
                if (!transformedMsg[l][r][c]) {
                    continue;
                }
                count++;
                data += [(0, date_1.parseFromDate)(tmpDate), originalMsg[l], count, letterLength].join(consts_1.CSV_SEPARATOR) + "\n";
            }
        }
        if (originalMsg[l] === " ") {
            continue;
        }
        tmpDate.setDate(tmpDate.getDate() + consts_1.ROW_MAX);
    }
    return data;
}
//# sourceMappingURL=writeDataToFiles.js.map