"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLetterDaysLength = exports.getMessageDaysLength = exports.createMsgTransformed = void 0;
const consts_1 = require("../consts");
const ascii_1 = require("./common/ascii");
let spaceInitalized = false;
let spaceLetter = [];
class MsgTransformed {
    org_msg;
    t_msg = [];
    col_length = undefined;
    constructor(msg, t_msg) {
        this.org_msg = msg;
        // readAsciiCharacters()
        //     .then(ascii => {
        //         this.space_letter = ascii[' '];
        //         for(let c of msg.toUpperCase()){
        //             this.t_msg.push(ascii[c]);
        //         }
        //     })
        this.t_msg = t_msg;
    }
    getColLength() {
        if (this.col_length) {
            return this.col_length;
        }
    }
    getTransformedMsg() {
        return this.t_msg;
    }
    getOriginalMsg() {
        return this.org_msg;
    }
    toString(showSymbol = "1", hiddenSymbol = "0") {
        let output = "";
        let spaceOccurred = false;
        // r - row, l - letter, c - column
        for (let r = 0; r < 7; r++) {
            for (let l = 0; l < this.t_msg.length; l++) {
                for (let c = 0; c < this.t_msg[l][0].length; c++) {
                    output += this.t_msg[l][r][c] ? showSymbol : hiddenSymbol;
                    if (this.t_msg[l][0].length === 1 &&
                        this.t_msg[l] === spaceLetter) {
                        spaceOccurred = true;
                        continue;
                    }
                }
                if (spaceOccurred) {
                    spaceOccurred = false;
                    continue;
                }
                output += hiddenSymbol;
            }
            output = output.substring(0, output.length - 1).concat("\n");
        }
        return output;
    }
    toFullString(showSymbol, hiddenSymbol) {
        let output = "";
        let colCount = 0;
        let spaceOccurred = false;
        // r - row, l - letter, c - column
        for (let r = 0; r < 7; r++) {
            colCount = 0;
            for (let l = 0; l < this.t_msg.length; l++) {
                for (let c = 0; c < this.t_msg[l][0].length; c++) {
                    output += this.t_msg[l][r][c] ? showSymbol : hiddenSymbol;
                    if (this.t_msg[l][0].length === 1 &&
                        this.t_msg[l] === spaceLetter) {
                        spaceOccurred = true;
                        continue;
                    }
                    colCount++;
                }
                colCount++;
                if (spaceOccurred) {
                    spaceOccurred = false;
                    continue;
                }
                output += hiddenSymbol;
            }
            colCount--;
            output += hiddenSymbol.repeat(consts_1.COL_MAX - colCount);
            output = output.substring(0, output.length - 1).concat("\n");
        }
        return output;
    }
}
function getMessageDaysLength(msg) {
    return (0, ascii_1.readAsciiCharacters)().then((ascii) => {
        let length = 0;
        for (let c of msg.toUpperCase()) {
            length += c === " " ? ascii[c][0].length : ascii[c][0].length + 1;
        }
        return (msg[msg.length - 1] === " " ? length : length - 1) * consts_1.ROW_MAX;
    });
}
exports.getMessageDaysLength = getMessageDaysLength;
function getLetterDaysLength(letter) {
    return (0, ascii_1.readAsciiCharacters)().then((ascii) => {
        let counter = 0;
        ascii[letter.toUpperCase()].forEach((x) => x.forEach(y => y ? counter++ : null));
        return counter;
    });
}
exports.getLetterDaysLength = getLetterDaysLength;
function createMsgTransformed(msg) {
    return (0, ascii_1.readAsciiCharacters)().then((ascii) => {
        if (!spaceInitalized) {
            spaceLetter = ascii[" "];
            spaceInitalized = true;
        }
        let t_msg = [];
        for (let c of msg.toUpperCase()) {
            t_msg.push(ascii[c]);
        }
        return new MsgTransformed(msg, t_msg);
    });
}
exports.createMsgTransformed = createMsgTransformed;
//# sourceMappingURL=msgTransformed.js.map