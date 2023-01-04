"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDrawModeFile = exports.readDataFromFiles = void 0;
const error_1 = require("../common/error");
const publicFsWriterReader_1 = require("../common/publicFsWriterReader");
async function readDataFromFiles() {
    let promises = [
        (0, publicFsWriterReader_1.readFile)("message.txt"),
        (0, publicFsWriterReader_1.readFile)("date-last.txt"),
        (0, publicFsWriterReader_1.readFile)("date-start.txt"),
        (0, publicFsWriterReader_1.readFile)("date-end.txt"),
        (0, publicFsWriterReader_1.readFile)("data.txt"),
        (0, publicFsWriterReader_1.readFile)("data-pos.txt"),
        (0, publicFsWriterReader_1.readFile)("commits.txt")
    ];
    return Promise.all(promises)
        .then(data => {
        return {
            msg: data[0],
            dates: {
                last: data[1],
                start: data[2],
                end: data[3]
            },
            data: data[4],
            dataPos: data[5],
            commits: {
                cur: data[6].split("/")[0],
                max: data[6].split("/")[1]
            }
        };
    })
        .catch((err) => {
        throw new error_1.CustomError(error_1.CustomError.types.MAIN_FILE_NOT_EXISTENT, { path: err.path.split('\\').pop() });
    });
}
exports.readDataFromFiles = readDataFromFiles;
async function readDrawModeFile() {
    return (0, publicFsWriterReader_1.readFile)("data-is-custom.txt")
        .then(res => res.toString() === "TRUE")
        .catch(() => false);
}
exports.readDrawModeFile = readDrawModeFile;
//# sourceMappingURL=readDataFromFiles.js.map