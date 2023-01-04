import { readFile } from "./publicFsWriterReader";

type AsciiCharactersJSON = {
    "A":boolean[][], "B":boolean[][], "C":boolean[][], "D":boolean[][], "E":boolean[][], "F":boolean[][], "G":boolean[][], "H":boolean[][], "I":boolean[][], "J":boolean[][], "K":boolean[][], "L":boolean[][], "M":boolean[][], "N":boolean[][], "O":boolean[][], "P":boolean[][], "Q":boolean[][], "R":boolean[][], "S":boolean[][], "T":boolean[][], "U":boolean[][], "V":boolean[][], "W":boolean[][], "X":boolean[][], "Y":boolean[][], "Z":boolean[][],
    ' ':boolean[][], '!':boolean[][], '"':boolean[][], '#':boolean[][], '$':boolean[][], '%':boolean[][], '&':boolean[][], '\'':boolean[][], '@':boolean[][],
    '(':boolean[][], ')':boolean[][], '*':boolean[][], '+':boolean[][], '-':boolean[][], '.':boolean[][], '/':boolean[][], ':':boolean[][], ';':boolean[][], '<':boolean[][], '>':boolean[][], ':boolean[][],':boolean[][],
    '0':boolean[][], '1':boolean[][], '2':boolean[][], '3':boolean[][], '4':boolean[][], '5':boolean[][], '6':boolean[][], '7':boolean[][], '8':boolean[][], "9":boolean[][],
    '[':boolean[][], ']':boolean[][], '\\':boolean[][], '^':boolean[][], '_':boolean[][], '`':boolean[][],
    '{':boolean[][], '}':boolean[][], '~':boolean[][]
}

async function readAsciiCharacters() : Promise<AsciiCharactersJSON> {
    return JSON.parse((await readFile("ascii-to-matrix.json", {encoding:"utf-8"})).toString());
}

function getLetterAsciiIn1DLengthOnlyPositive(letterAscii: boolean[][]) {
    let max = 0;
    letterAscii.forEach((x) => x.forEach((y) => y ? max++ : null));
    return max;
}

export {
    AsciiCharactersJSON,
    readAsciiCharacters,
    getLetterAsciiIn1DLengthOnlyPositive
}