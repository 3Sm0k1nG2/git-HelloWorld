//setup
export const INPUT_LENGTH_MIN = 5;

export const CELL_MIN = 1 as const;
export const CELL_MAX = 364 as const;
export const ROW_MIN = 1 as const;
export const ROW_MAX = 7 as const;
export const COL_MIN = 1 as const;
export const COL_MAX = 52 as const;

export const PUBLIC_FILE_PATH = "public/" as const;
export type PUBLIC_FILE_NAMES =
    | "ascii-to-matrix.json"
    | "message.txt"
    | "data.txt"
    | "data-pos.txt"
    | "date-last.txt"
    | "date-start.txt"
    | "date-end.txt"
    | "preview.txt"
    | "preview-full.txt"
    | "data-is-custom.txt"
    | "written.json"
    | "commits.txt"
;

//main
export const DEFAULT_BRANCH = "master" as const;

export const PRIVATE_FILE_PATH = "private/" as const;
export type PRIVATE_FILE_NAMES = "git-credentials.json";

//common
export const GITHUB_DOMAIN = "https://github.com/" as const;
export const GITHUB_REGEXP_PATTERN = "^https:\/\/github\.com\/(?<owner>[_\\-A-Za-z0-9]*)\/(?<repo>[._\\-A-Za-z0-9]*)$" as const;
export const GITHUB_REGEXP_PATTERN_OLD = '^https:\/\/github\.com\/(?<owner>[_\-A-Za-z0-9]*)\/(?<repo>[._\-A-Za-z0-9]*)$' as const;
export const GITHUB_REGEXP_FLAGS = "gm";

export const CSV_SEPARATOR = "°" as const;
export const CSV_FIELDS = ["Date","Symbol","Pos","Max"] as const;
export const CSV_HEADER = CSV_FIELDS.join(CSV_SEPARATOR);