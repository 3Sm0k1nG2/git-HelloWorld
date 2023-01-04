"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCredentials = void 0;
const privateFsWriterReader_1 = require("./privateFsWriterReader");
async function readCredentials() {
    return JSON.parse((await (0, privateFsWriterReader_1.readFile)("git-credentials.json")).toString());
}
exports.readCredentials = readCredentials;
//# sourceMappingURL=readCredentials.js.map