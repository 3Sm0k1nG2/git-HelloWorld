"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const setup_1 = require("./lib/setup");
const validator_1 = require("./lib/validator");
// argv[0] - nodePath,
// argv[1] - filePath,
// argv[2] - startDate,
// argv[3] & rest - message
// run().catch(errorHandler);
async function run(argv) {
    let argvs = argv.slice(2);
    ;
    argvs = [argv[0], argv.slice(1).join(' ')];
    (0, validator_1.hasValidInput)(argvs);
    let msg = await (0, validator_1.getValidMsg)(argvs[0]);
    let startDate = (0, validator_1.getValidDate)(argvs[1]);
    await (0, setup_1.setup)(msg, startDate);
}
exports.run = run;
//# sourceMappingURL=gitContributionsCustomMsg.js.map