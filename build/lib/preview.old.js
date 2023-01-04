"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAsciiCharacters = exports.msgToStringOnesAndZeros = exports.msgToStringColored = exports.transform = void 0;
const publicFsWriterReader_1 = require("./publicFsWriterReader");
async function transform(msg) {
    const ascii = await readAsciiCharacters();
    let msgTransformed = [];
    let c;
    for (c of msg) {
        msgTransformed.push(ascii[c]);
    }
    msgTransformed.toString = msgToStringOnesAndZeros;
    return msgTransformed;
}
exports.transform = transform;
async function readAsciiCharacters() {
    let data = await (0, publicFsWriterReader_1.readFile)("ascii-to-matrix.json", { encoding: "utf-8" });
    if (data instanceof Buffer) {
        throw new CustomError(new TypeError(`${data} not a string`));
    }
    return JSON.parse(data);
}
exports.readAsciiCharacters = readAsciiCharacters;
function msgToStringColored() {
    let asString = "";
    let showSymbol = "🟩";
    let hiddenSymbol = "⬛";
    for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        for (let letterIndex = 0; letterIndex < this.length; letterIndex++) {
            for (let colIndex = 0; colIndex < this[letterIndex][0].length; colIndex++) {
                asString += this[letterIndex][rowIndex][colIndex] ? showSymbol : hiddenSymbol;
            }
            asString += hiddenSymbol;
        }
        asString = asString.substring(0, asString.length - 1).concat("\n");
    }
    return asString;
}
exports.msgToStringColored = msgToStringColored;
function msgToStringOnesAndZeros() {
    let asString = "";
    let showSymbol = "1";
    let hiddenSymbol = "0";
    for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
        for (let letterIndex = 0; letterIndex < this.length; letterIndex++) {
            for (let colIndex = 0; colIndex < this[letterIndex][0].length; colIndex++) {
                asString += this[letterIndex][rowIndex][colIndex] ? showSymbol : hiddenSymbol;
            }
            asString += hiddenSymbol;
        }
        asString = asString.substring(0, asString.length - 1).concat("\n");
    }
    return asString;
}
exports.msgToStringOnesAndZeros = msgToStringOnesAndZeros;
//# sourceMappingURL=preview.old.js.map