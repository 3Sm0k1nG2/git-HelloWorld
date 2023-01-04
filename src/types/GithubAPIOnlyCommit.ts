import { GitFileBlob } from "./GitStructures";

export type repo = {
    owner: string,
    repo: string,
    branch: string
}

export type commit = {
    message: string,
    files: GitFileBlob[]
}