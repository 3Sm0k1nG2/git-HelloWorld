export type GitFile = {
    path?: string;
    mode?: "100644" | "100755" | "040000" | "160000" | "120000";
    type?: "blob" | "commit" | "tree";
    sha?: string;
    content?: string;
};

export type GitFileBlob = GitFile & {
    mode?: "100644" | "100755" | "120000";
    type?: "blob";
}

export type GitFileTree = GitFile & {
    mode?: "040000";
    type?: "tree";
}

export type GitFileCommit = GitFile & {
    mode?: "160000";
    type?: "commit";
}