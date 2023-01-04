"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs/promises"));
const node_process_1 = require("node:process");
const date_1 = require("./date");
const dateFileName = "date.txt";
const cellsFileName = "cells.txt";
fs.readFile("../" + dateFileName, { encoding: "utf-8" })
    .then(dateHandler)
    .catch(errorHandler)
    .finally(node_process_1.exit);
let cells = fs.readFile(cellsFileName);
function errorHandler(err) {
    console.error(err);
    (0, node_process_1.exit)();
}
function dateHandler(prevDate) {
    let date = (0, date_1.parseFromDate)(new Date(2022, 11, 17));
    if (prevDate === date) {
        console.warn(`Already commited today ${date}`);
        (0, node_process_1.exit)();
    }
    // if (today/count === cells){
    //    commit();
    // }
}
//# sourceMappingURL=notMain.js.map