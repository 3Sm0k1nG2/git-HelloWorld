"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../setup");
const statuses = {
    pending: "pending",
    fulfilled: "fulfilled",
    rejected: "rejected"
};
TestGenerator("                                                     ", "01/01/2023");
class Test {
    data;
    status = statuses.pending;
    result;
    constructor(msg, date) {
        this.data = [/*url, auth, secret,*/ date, msg];
    }
    run() {
        (0, setup_1.setup)(this.data)
            // .then(data => doSomething) needs implementation
            .then((res) => { this.status = statuses.fulfilled; this.result = res; })
            .catch((err) => { this.status = statuses.rejected; this.result = err; });
    }
    getStatus() {
        return this.status;
    }
    getResult() {
        return this.result;
    }
}
function TestGenerator(msg, date) {
    return new Test(msg, date);
}
//# sourceMappingURL=setup.test.js.map