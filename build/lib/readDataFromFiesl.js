"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataFromFiles = void 0;
const publicFsWriterReader_1 = require("./publicFsWriterReader");
async function readDataFromFiles() {
    let promises = [
        (0, publicFsWriterReader_1.readFile)("message.txt"),
        (0, publicFsWriterReader_1.readFile)("current-date.txt"),
        (0, publicFsWriterReader_1.readFile)("start-date.txt"),
        (0, publicFsWriterReader_1.readFile)("end-date.txt"),
        (0, publicFsWriterReader_1.readFile)("data.txt"),
    ];
    return Promise.all(promises)
        .then(results => {
        return {
            msg: results[0],
            dates: {
                current: results[1],
                start: results[2],
                end: results[3]
            },
            data: results[4]
        };
    });
}
exports.readDataFromFiles = readDataFromFiles;
//# sourceMappingURL=readDataFromFiesl.js.map