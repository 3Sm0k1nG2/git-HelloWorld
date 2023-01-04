"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSV_HEADER = exports.CSV_FIELDS = exports.CSV_SEPARATOR = exports.GITHUB_REGEXP_FLAGS = exports.GITHUB_REGEXP_PATTERN_OLD = exports.GITHUB_REGEXP_PATTERN = exports.GITHUB_DOMAIN = exports.PRIVATE_FILE_PATH = exports.DEFAULT_BRANCH = exports.PUBLIC_FILE_PATH = exports.COL_MAX = exports.COL_MIN = exports.ROW_MAX = exports.ROW_MIN = exports.CELL_MAX = exports.CELL_MIN = exports.INPUT_LENGTH_MIN = void 0;
//setup
exports.INPUT_LENGTH_MIN = 5;
exports.CELL_MIN = 1;
exports.CELL_MAX = 364;
exports.ROW_MIN = 1;
exports.ROW_MAX = 7;
exports.COL_MIN = 1;
exports.COL_MAX = 52;
exports.PUBLIC_FILE_PATH = "public/";
//main
exports.DEFAULT_BRANCH = "master";
exports.PRIVATE_FILE_PATH = "private/";
//common
exports.GITHUB_DOMAIN = "https://github.com/";
exports.GITHUB_REGEXP_PATTERN = "^https:\/\/github\.com\/(?<owner>[_\\-A-Za-z0-9]*)\/(?<repo>[._\\-A-Za-z0-9]*)$";
exports.GITHUB_REGEXP_PATTERN_OLD = '^https:\/\/github\.com\/(?<owner>[_\-A-Za-z0-9]*)\/(?<repo>[._\-A-Za-z0-9]*)$';
exports.GITHUB_REGEXP_FLAGS = "gm";
exports.CSV_SEPARATOR = "°";
exports.CSV_FIELDS = ["Date", "Symbol", "Pos", "Max"];
exports.CSV_HEADER = exports.CSV_FIELDS.join(exports.CSV_SEPARATOR);
//# sourceMappingURL=consts.js.map