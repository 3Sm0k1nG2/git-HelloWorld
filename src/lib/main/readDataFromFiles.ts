import { CustomError } from "../common/error";
import { readFile } from "../common/publicFsWriterReader";

export async function readDataFromFiles() {
    let promises:Promise<any>[] = [
        readFile("message.txt"),
        readFile("date-last.txt"),
        readFile("date-start.txt"),
        readFile("date-end.txt"),
        readFile("data.txt"),
        readFile("data-pos.txt"),
        readFile("commits.txt")
    ];

    return Promise.all(promises)
        .then(data => { return {
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
        }})
        .catch((err:Error & {path:string}) => {
            throw new CustomError(CustomError.types.MAIN_FILE_NOT_EXISTENT, { path: err.path.split('\\').pop() })
        })
}

export async function readDrawModeFile(){
    return readFile("data-is-custom.txt")
        .then(res => res.toString() === "TRUE")
        .catch(() => false);
}