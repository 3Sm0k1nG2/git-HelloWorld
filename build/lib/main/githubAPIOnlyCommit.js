"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubAPIOnlyCommit = void 0;
const rest_1 = require("@octokit/rest");
const date_1 = require("../common/date");
const error_1 = require("../common/error");
/*
async function GithubAPIOnlyCommit_func(
    auth:string,
    repo: repo,
    commit: commit,
    debug = false
) {
    const octokit = new Octokit({ auth });

    let ref = "heads/" + repo.branch;

    let latestTree = (
        await octokit.rest.git.getRef({
            owner: repo.owner,
            repo: repo.repo,
            ref,
        })
    ).data;

    if (debug) {
        console.log(latestTree);
    }

    let baseTreeSHA = latestTree.object.sha;

    let createdTree = (
        await octokit.rest.git.createTree({
            owner: repo.owner,
            repo: repo.repo,
            tree: commit.files,
            base_tree: baseTreeSHA,
        })
    ).data;

    if (debug) {
        console.log(createdTree);
    }

    let treeSHA = createdTree.sha;

    let createdCommit = (
        await octokit.rest.git.createCommit({
            owner: repo.owner,
            repo: repo.repo,
            message: commit.message,
            tree: treeSHA,
            parents: [baseTreeSHA],
        })
    ).data;

    if (debug) {
        console.log(createdCommit);
    }

    let commitSHA = createdCommit.sha;

    let updatedRef = (
        await octokit.rest.git.updateRef({
            owner: repo.owner,
            repo: repo.repo,
            ref,
            sha: commitSHA,
        })
    ).data;

    if (debug) {
        console.log(updatedRef);
    }
}
*/
class GithubAPIOnlyCommit {
    octokit;
    owner;
    repo;
    branch;
    get ref() { return "heads/" + this.branch; }
    ;
    setOwner(value) { this.owner = value; }
    ;
    getOwner() { return this.owner; }
    ;
    setRepo(value) { this.repo = value; }
    ;
    getRepo() { return this.repo; }
    ;
    setBranch(value) { this.branch = value; }
    ;
    getBranch() { return this.branch; }
    ;
    files;
    user;
    /**
     * Initialize octokit
     * @public
     * @param {string} auth Auth token for the user
     * @return void
     */
    constructor(auth) {
        //the underlying library for making requests
        this.octokit = new rest_1.Octokit({ auth });
        this.files = [];
        this.user = {
            id: undefined,
            login: undefined
        };
    }
    authenticate() {
        return this.octokit.rest.users.getAuthenticated()
            .then(x => this.user = { ...x.data });
    }
    clearFiles() {
        this.files = [];
    }
    addFiles(files) {
        this.files.push(...files);
    }
    async commit(message, date = (0, date_1.getToday)()) {
        if (!this.files.length) {
            throw new error_1.CustomError(error_1.CustomError.types.GIT_NO_FILES_TO_COMMIT);
        }
        await this.getLatestTreeSHA()
            .then((latestTreeSHA) => this.createdTree(latestTreeSHA))
            .then(({ treeSHA, baseTreeSHA }) => this.createCommit(message, treeSHA, [baseTreeSHA], date))
            .then((commitSHA) => this.updateRef(commitSHA));
    }
    getLatestTreeSHA() {
        return this.octokit.rest.git
            .getRef({
            owner: this.owner,
            repo: this.repo,
            ref: this.ref,
        })
            .then((res) => res.data.object.sha);
    }
    createdTree(baseTreeSHA) {
        return this.octokit.rest.git
            .createTree({
            owner: this.owner,
            repo: this.repo,
            tree: this.files,
            base_tree: baseTreeSHA,
        })
            .then((res) => baseTreeSHA
            ? { treeSHA: res.data.sha, baseTreeSHA: baseTreeSHA }
            : { treeSHA: res.data.sha, baseTreeSHA: undefined });
    }
    createCommit(message, treeSHA, parentsTreeSHA, date = (0, date_1.getToday)()) {
        let params = {
            owner: this.owner,
            repo: this.repo,
            message,
            tree: treeSHA,
            parents: parentsTreeSHA ?? [],
            author: {
                email: `${this.user.id}+${this.user.login}@users.noreply.github.com`,
                name: this.user.login,
                date: date?.toISOString()
            },
            committer: {
                email: `${this.user.id}+${this.user.login}@users.noreply.github.com`,
                name: this.user.login,
                date: date?.toISOString()
            }
        };
        return this.octokit.rest.git
            .createCommit(params)
            .then((res) => res.data.sha);
    }
    updateRef(commitSHA) {
        return this.octokit.rest.git
            .updateRef({
            owner: this.owner,
            repo: this.repo,
            ref: this.ref,
            sha: commitSHA,
        })
            .then((res) => Promise.resolve())
            .catch((err) => Promise.reject(err));
    }
}
exports.GithubAPIOnlyCommit = GithubAPIOnlyCommit;
//# sourceMappingURL=githubAPIOnlyCommit.js.map