"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDataFromFiles = void 0;
const date_1 = require("../common/date");
const publicFsWriterReader_1 = require("../common/publicFsWriterReader");
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
                current: (0, date_1.parseToDate)(results[1]),
                start: (0, date_1.parseToDate)(results[2]),
                end: (0, date_1.parseToDate)(results[3])
            },
            data: results[4].split('\n')
        };
    });
}
exports.readDataFromFiles = readDataFromFiles;
//# sourceMappingURL=readDataFromFiesl.js.map