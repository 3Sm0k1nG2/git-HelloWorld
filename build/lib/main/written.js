"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeWrittenFile = exports.readWrittenFile = exports.setupWrittenFile = void 0;
const publicFsWriterReader_1 = require("../common/publicFsWriterReader");
function setupWrittenFile(firstLetterAscii) {
    let max = 0;
    firstLetterAscii.forEach((x) => x.forEach((y) => max++));
    return writeWrittenFile({ max, pos: 0, written: 0 });
}
exports.setupWrittenFile = setupWrittenFile;
async function readWrittenFile() {
    return JSON.parse((await (0, publicFsWriterReader_1.readFile)("written.json")).toString());
}
exports.readWrittenFile = readWrittenFile;
function writeWrittenFile(data) {
    return (0, publicFsWriterReader_1.writeFile)("written.json", JSON.stringify(data, null, 4));
}
exports.writeWrittenFile = writeWrittenFile;
//# sourceMappingURL=written.js.map