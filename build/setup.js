"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const privateFsWriterReader_1 = require("./lib/common/privateFsWriterReader");
const validator_1 = require("./lib/setup/validator");
const msgTransformed_1 = require("./lib/setup/msgTransformed");
const auth_1 = require("./lib/common/auth");
const error_1 = require("./lib/common/error");
const reverse_1 = require("./lib/common/reverse");
const writeDataToFiles_1 = require("./lib/setup/writeDataToFiles");
const date_1 = require("./lib/common/date");
let argv = process.argv.slice(2);
console.info("__INPUT__");
argv.forEach((x) => console.log(x));
setup(argv)
    .then((data) => {
    console.info("\n__PREVIEW__");
    return (0, writeDataToFiles_1.writeDataToFiles)(data);
})
    .catch((err) => {
    console.warn("\n__ERROR__");
    return (0, error_1.errorHandler)(err);
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
async function setup(argv) {
    let [url, auth, secret, date, ...msgArr] = argv;
    let msg = msgArr.join(" ");
    await (0, validator_1.validateInput)({ url, auth, secret, date, msg });
    let protectedSecret = (0, auth_1.hashHmac)(secret, secret);
    let credentials = {
        url: (0, auth_1.encrypt)(url, (0, reverse_1.reverse)(protectedSecret)),
        auth: (0, auth_1.encrypt)(auth, (0, reverse_1.reverse)(protectedSecret)),
        secret: protectedSecret,
    };
    (0, privateFsWriterReader_1.writeFile)("git-credentials.json", JSON.stringify(credentials, null, 4));
    let startDate = new Date(date);
    let currentDate = (0, date_1.getToday)();
    currentDate.setDate(currentDate.getDate() - 1);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (await (0, msgTransformed_1.getMessageDaysLength)(msg)));
    return {
        msg,
        dates: {
            last: currentDate,
            start: startDate,
            end: endDate,
        },
    };
}
exports.setup = setup;
//# sourceMappingURL=setup.js.map