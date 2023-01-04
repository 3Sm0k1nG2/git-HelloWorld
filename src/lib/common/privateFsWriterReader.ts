import { Abortable } from "events";
import { Mode, ObjectEncodingOptions, OpenMode } from "fs";
import * as fs from "fs/promises";
import { Stream } from "stream";
import { PRIVATE_FILE_PATH, PRIVATE_FILE_NAMES } from "../../consts";

function writeFile(
    fileName: PRIVATE_FILE_NAMES,
    data: string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | Stream,
    options?:
        | (ObjectEncodingOptions & {
              mode?: Mode | undefined;
              flag?: OpenMode | undefined;
          } & Abortable)
        | BufferEncoding
        | null
){
    return fs.writeFile(PRIVATE_FILE_PATH + fileName, data, options)
}

function readFile(
    fileName: PRIVATE_FILE_NAMES,
    options?:
        | (ObjectEncodingOptions &
              Abortable & {
                  flag?: OpenMode | undefined;
              })
        | BufferEncoding
        | null
){
    return fs.readFile(PRIVATE_FILE_PATH + fileName, options ?? {encoding:"utf-8"})
}

export {
    writeFile,
    readFile
}