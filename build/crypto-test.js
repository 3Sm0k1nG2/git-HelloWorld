"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./lib/common/auth");
const input = {
    url: "https://github.com/3Sm0k1nG2/remove",
    auth: "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",
    secret: "secret321",
};
console.log(input);
// let protectedSecret = hashHmac(input.secret, input.secret);
let protectedSecret = "a";
let credentials = {
    url: (0, auth_1.encrypt)(input.url, "a"),
    auth: (0, auth_1.encrypt)(input.auth, "a"),
    secret: protectedSecret,
};
console.log(credentials);
let output = {
    url: (0, auth_1.decrypt)(credentials.url, "a"),
    auth: (0, auth_1.decrypt)(credentials.auth, "a"),
};
console.log(output);
//# sourceMappingURL=crypto-test.js.map