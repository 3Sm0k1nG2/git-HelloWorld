"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = void 0;
function reverse(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
exports.reverse = reverse;
//# sourceMappingURL=reverse.js.map