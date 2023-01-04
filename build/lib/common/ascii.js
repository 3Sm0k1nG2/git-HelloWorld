"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLetterAsciiIn1DLengthOnlyPositive = exports.readAsciiCharacters = void 0;
const publicFsWriterReader_1 = require("./publicFsWriterReader");
async function readAsciiCharacters() {
    return JSON.parse((await (0, publicFsWriterReader_1.readFile)("ascii-to-matrix.json", { encoding: "utf-8" })).toString());
}
exports.readAsciiCharacters = readAsciiCharacters;
function getLetterAsciiIn1DLengthOnlyPositive(letterAscii) {
    let max = 0;
    letterAscii.forEach((x) => x.forEach((y) => y ? max++ : null));
    return max;
}
exports.getLetterAsciiIn1DLengthOnlyPositive = getLetterAsciiIn1DLengthOnlyPositive;
//# sourceMappingURL=ascii.js.map