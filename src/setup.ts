import { writeFile } from "./lib/common/privateFsWriterReader";
import { validateInput } from "./lib/setup/validator";
import { getMessageDaysLength } from "./lib/setup/msgTransformed";
import { encrypt, hashHmac } from "./lib/common/auth";
import { errorHandler } from "./lib/common/error";
import { reverse } from "./lib/common/reverse";
import { writeDataToFiles } from "./lib/setup/writeDataToFiles";
import { gitCredentials } from "./types/GitCredentials";
import { exit } from "process";
import { getToday } from "./lib/common/date";

let argv = process.argv.slice(2);

console.info("__INPUT__");
argv.forEach((x) => console.log(x));

setup(argv)
    .then((data) => {
        console.info("\n__PREVIEW__");
        return writeDataToFiles(data)
    })
    .catch((err) => {
        console.warn("\n__ERROR__");
        return errorHandler(err);
    });

/**
 *
 * @param argv string[]
 * @property argv[0] - url
 * @property argv[1] - auth
 * @property argv[2] - secret
 * @property argv[3] - date
 * @property argv[4] and the rest - msgArr
 */
async function setup(argv: string[]) {
    let [url, auth, secret, date, ...msgArr] = argv;
    let msg = msgArr.join(" ");
    await validateInput({ url, auth, secret, date, msg });

    let protectedSecret = hashHmac(secret, secret);
    let credentials: gitCredentials = {
        url: encrypt(url, reverse(protectedSecret)),
        auth: encrypt(auth, reverse(protectedSecret)),
        secret: protectedSecret,
    };
    writeFile("git-credentials.json", JSON.stringify(credentials, null, 4));

    let startDate = new Date(date);
    let currentDate = getToday();
    currentDate.setDate(currentDate.getDate() - 1);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (await getMessageDaysLength(msg)));

    return {
        msg,
        dates: {
            last: currentDate,
            start: startDate,
            end: endDate,
        },
    };
}

export { setup };
