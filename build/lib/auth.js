"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashHmac = exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = require("crypto-js");
function encrypt(data, secret) {
    return crypto_js_1.AES.encrypt(JSON.stringify(data), secret).toString();
}
exports.encrypt = encrypt;
function decrypt(ciphertext, secret) {
    return crypto_js_1.AES.decrypt(ciphertext, secret).toString(crypto_js_1.enc.Utf8);
}
exports.decrypt = decrypt;
function hashHmac(data, secret) {
    return (0, crypto_js_1.HmacMD5)(data, secret).toString();
}
exports.hashHmac = hashHmac;
//# sourceMappingURL=auth.js.map