import { COL_MAX, ROW_MAX } from "../../consts";
import { readAsciiCharacters } from "../common/ascii";
import { readFile } from "../common/publicFsWriterReader";
import { MsgTransformed as IMsgTransformed } from "../../types/MsgTransformed";

let spaceInitalized = false;
let spaceLetter: boolean[][] = [];

class MsgTransformed implements IMsgTransformed {
    private org_msg: string;
    private t_msg: boolean[][][] = [];
    private col_length: number = undefined;

    constructor(msg: string, t_msg: boolean[][][]) {
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

    public getColLength() {
        if (this.col_length) {
            return this.col_length;
        }
    }

    public getTransformedMsg() {
        return this.t_msg;
    }

    public getOriginalMsg() {
        return this.org_msg;
    }

    public toString(showSymbol: string = "1", hiddenSymbol: string = "0") {
        let output = "";
        let spaceOccurred = false;

        // r - row, l - letter, c - column

        for (let r = 0; r < 7; r++) {
            for (let l = 0; l < this.t_msg.length; l++) {
                for (let c = 0; c < this.t_msg[l][0].length; c++) {
                    output += this.t_msg[l][r][c] ? showSymbol : hiddenSymbol;

                    if (
                        this.t_msg[l][0].length === 1 &&
                        this.t_msg[l] === spaceLetter
                    ) {
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

    public toFullString(showSymbol: string, hiddenSymbol: string) {
        let output = "";
        let colCount = 0;
        let spaceOccurred = false;

        // r - row, l - letter, c - column

        for (let r = 0; r < 7; r++) {
            colCount = 0;
            for (let l = 0; l < this.t_msg.length; l++) {
                for (let c = 0; c < this.t_msg[l][0].length; c++) {
                    output += this.t_msg[l][r][c] ? showSymbol : hiddenSymbol;

                    if (
                        this.t_msg[l][0].length === 1 &&
                        this.t_msg[l] === spaceLetter
                    ) {
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
            output += hiddenSymbol.repeat(COL_MAX - colCount);

            output = output.substring(0, output.length - 1).concat("\n");
        }

        return output;
    }
}

function getMessageDaysLength(msg: string) {
    return readAsciiCharacters().then((ascii) => {
        let length = 0;

        for (let c of msg.toUpperCase()) {
            length += c === " " ? ascii[c][0].length : ascii[c][0].length + 1;
        }

        return (msg[msg.length - 1] === " " ? length : length - 1) * ROW_MAX;
    });
}

function getLetterDaysLength(letter: string) {
    return readAsciiCharacters().then(
        (ascii) => {
            let counter = 0;

            ascii[letter.toUpperCase() as keyof typeof ascii].forEach((x) => x.forEach(y => y ? counter++ : null));
            return counter;
        }
    );
}

function createMsgTransformed(msg: string) {
    return readAsciiCharacters().then((ascii) => {
        if (!spaceInitalized) {
            spaceLetter = ascii[" "];
            spaceInitalized = true;
        }

        let t_msg: boolean[][][] = [];

        for (let c of msg.toUpperCase()) {
            t_msg.push(ascii[c]);
        }

        return new MsgTransformed(msg, t_msg);
    });
}

export { createMsgTransformed, getMessageDaysLength, getLetterDaysLength };
