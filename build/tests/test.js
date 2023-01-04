"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setup_1 = require("../setup");
let url = "https://github.com/3Sm0k1nG2/remove";
let auth = "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";
let secret = "secret";
testsRunner();
async function testsRunner() {
    await testRunner(testHelloWorld);
    await testRunner(testAllAscci);
    await testRunner(testOnlyW);
    await testRunner(testOnlyI);
    await testRunner(testRandomInLimits);
    await testRunner(testRandomOffLimits);
}
async function testRunner(test) {
    let passed = false;
    let details = undefined;
    try {
        await test();
        passed = true;
    }
    catch (err) {
        details = err;
        passed = false;
    }
    console.log("-------------------------------------\n"
        + `name: ${test.name}\n`
        + `passed: ${passed ? '✅' : '❌'}\n`
        + `${passed ? '' : `details:\n${details}\n`}`
        + "-------------------------------------\n");
}
async function testHelloWorld() {
    let msg = "Hello World!";
    let startDate = new Date("2023-01-01").toLocaleDateString();
    await (0, setup_1.setup)([url, auth, secret, startDate, msg]);
}
async function testAllAscci() {
    let msg = "abcdefghijklmnopqrstuvwxyz 0123456789 !?\"#$%&'@ ()*+-./:;<> []\\^_` {}~";
    let startDate = new Date("2023-01-01").toLocaleDateString();
    await (0, setup_1.setup)([url, auth, secret, startDate, msg]);
}
async function testOnlyW() {
    let msg = "WWWWWWW";
    let startDate = new Date("2023-01-02").toLocaleDateString();
    await (0, setup_1.setup)([url, auth, secret, startDate, msg]);
}
async function testOnlyI() {
    let msg = "IIIIIIIIIIIIIIIIIIIII";
    let startDate = new Date("2023-01-03").toLocaleDateString();
    await (0, setup_1.setup)([url, auth, secret, startDate, msg]);
}
async function testRandomInLimits() {
    let msg = "Lorem ipsum";
    let startDate = new Date("2023-01-04").toLocaleDateString();
    await (0, setup_1.setup)([url, auth, secret, startDate, msg]);
}
async function testRandomOffLimits() {
    let msg = "Lorem ipsum dolor sit amet.";
    let startDate = new Date("2023-01-05").toLocaleDateString();
    await (0, setup_1.setup)([url, auth, secret, startDate, msg]);
}
//# sourceMappingURL=test.js.map