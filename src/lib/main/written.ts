import { written } from "../../types/Written";
import { AsciiCharactersJSON } from "../common/ascii";
import { writeFile, readFile } from "../common/publicFsWriterReader";

export function setupWrittenFile(firstLetterAscii: AsciiCharactersJSON[keyof AsciiCharactersJSON]) {
    let max = 0;
    firstLetterAscii.forEach((x) => x.forEach((y) => max++));

    return writeWrittenFile({ max, pos: 0, written: 0});
}

export async function readWrittenFile(): Promise<written> {
    return JSON.parse((await readFile("written.json")).toString());
}

export function writeWrittenFile(data: written) {
    return writeFile("written.json", JSON.stringify(data, null, 4));
}
