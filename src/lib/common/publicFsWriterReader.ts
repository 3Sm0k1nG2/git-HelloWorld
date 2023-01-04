import { Abortable } from "events";
import { Mode, ObjectEncodingOptions, OpenMode } from "fs";
import * as fs from "fs/promises";
import { Stream } from "stream";
import { PUBLIC_FILE_PATH, PUBLIC_FILE_NAMES } from "../../consts";

function writeFile(
    fileName: PUBLIC_FILE_NAMES,
    data:
        | string
        | NodeJS.ArrayBufferView
        | Iterable<string | NodeJS.ArrayBufferView>
        | AsyncIterable<string | NodeJS.ArrayBufferView>
        | Stream,
    options?:
        | (ObjectEncodingOptions & {
              mode?: Mode | undefined;
              flag?: OpenMode | undefined;
          } & Abortable)
        | BufferEncoding
        | null
) {
    return fs.writeFile(
        PUBLIC_FILE_PATH + fileName,
        data,
        options ?? { encoding: "utf-8" }
    );
}

function readFile(
    fileName: PUBLIC_FILE_NAMES,
    options?:
        | (ObjectEncodingOptions &
              Abortable & {
                  flag?: OpenMode | undefined;
              })
        | BufferEncoding
        | null
) {
    return fs.readFile(
        PUBLIC_FILE_PATH + fileName,
        options ?? { encoding: "utf-8" }
    );
}

export { writeFile, readFile };
