import { parseFromDate } from "../common/date";
import { createMsgTransformed, getLetterDaysLength } from "./msgTransformed";
import { writeFile } from "../common/publicFsWriterReader";
import { MsgTransformed } from "../../types/MsgTransformed";
import { CSV_HEADER, CSV_SEPARATOR, ROW_MAX } from "../../consts";

// 🟦, ⬛
// 🟩, ⬛
// 1, 0
let [showSymbol, hiddenSymbol] = ["🟦", "⬛"];

export async function writeDataToFiles(data: {
    msg: string;
    dates: { last: Date; start: Date; end: Date };
}) {
    let { msg, dates } = data;
    let t_msg = await createMsgTransformed(msg);

    console.log(t_msg.toFullString(showSymbol, hiddenSymbol));

    return Promise.all([
        convertToData(t_msg, dates.start)
            .then(data => writeFile("data.txt", data)),
        writeFile("commits.txt", "2/50"),
        writeFile("data-pos.txt", "1"),
        writeFile("message.txt", msg),
        writeFile("date-last.txt", parseFromDate(dates.last)),
        writeFile("date-start.txt", parseFromDate(dates.start)),
        writeFile("date-end.txt", parseFromDate(dates.end)),
        writeFile("preview.txt", t_msg.toString(showSymbol, hiddenSymbol)),
        writeFile(
            "preview-full.txt",
            t_msg.toFullString(showSymbol, hiddenSymbol)
        ),
    ]);
}

async function convertToData(t_msg: MsgTransformed, startDate: Date) {
    let date = new Date(startDate);
    let tmpDate = new Date(date);
    tmpDate.setDate(tmpDate.getDate() - 1);

    let transformedMsg = t_msg.getTransformedMsg();
    let originalMsg = t_msg.getOriginalMsg();
    let data = CSV_HEADER + "\n";

    for (let l = 0; l < transformedMsg.length; l++) {
        let letterLength = await getLetterDaysLength(originalMsg[l]);
        let count = 0;

        for (let c = 0; c < transformedMsg[l][0].length; c++) {
            for (let r = 0; r < transformedMsg[l].length; r++) {
                tmpDate.setDate(tmpDate.getDate() + 1);

                if (!transformedMsg[l][r][c]) {
                    continue;
                }

                count++;
                data += [parseFromDate(tmpDate), originalMsg[l], count, letterLength].join(CSV_SEPARATOR) + "\n"
            }
        }

        if(originalMsg[l] === " "){
            continue;
        }

        tmpDate.setDate(tmpDate.getDate() + ROW_MAX);
    }
    return data;
}
