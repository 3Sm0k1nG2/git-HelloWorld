"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAsciiCharacters = void 0;
const publicFsWriterReader_1 = require("./common/publicFsWriterReader");
async function readAsciiCharacters() {
    return JSON.parse((await (0, publicFsWriterReader_1.readFile)("ascii-to-matrix.json", { encoding: "utf-8" })).toString());
}
exports.readAsciiCharacters = readAsciiCharacters;
//# sourceMappingURL=ascii.js.map