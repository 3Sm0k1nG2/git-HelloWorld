"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCredentials = void 0;
const auth_1 = require("./auth");
const privateFsWriterReader_1 = require("./privateFsWriterReader");
const reverse_1 = require("./reverse");
function readCredentials() {
    return (0, privateFsWriterReader_1.readFile)("git-credentials.json")
        .then(credentials => JSON.parse(credentials.toString()))
        .then((credentials) => {
        return {
            url: (0, auth_1.decrypt)(credentials.url, (0, reverse_1.reverse)(credentials.secret)),
            auth: (0, auth_1.decrypt)(credentials.auth, (0, reverse_1.reverse)(credentials.secret))
        };
    });
}
exports.readCredentials = readCredentials;
//# sourceMappingURL=readCredentials.js.map