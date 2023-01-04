"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubApi = exports.setGithubApi = void 0;
const rest_1 = require("@octokit/rest");
//the underlying library for making requests
let octokit;
//Uses the https://github.com/github-tools/github library under the hood and exposes it as `gh` property
class GithubAPI {
    _repo;
    _filesToCommit;
    _currentBranch = {
        name: "",
        commitSHA: "",
        treeSHA: ""
    };
    _newCommit = {
        treeSHA: "",
        sha: ""
    };
    set repo(val) { this._repo = val; }
    get repo() { return this._repo; }
    get filesToCommit() { return this._filesToCommit; }
    ;
    set currentBranch(val) { this._currentBranch = val; }
    ;
    get currentBranch() { return this._currentBranch; }
    ;
    set newCommit(val) { this._newCommit = val; }
    ;
    get newCommit() { return this._newCommit; }
    ;
    constructor(auth) {
        octokit = new rest_1.Octokit(auth);
    }
    /**
     * Sets the current repository to make push to
     * @public
     * @param {string} owner Name of the owner who owns the repository
     * @param {string} repo Name of the repository
     * @return void
     */
    setRepo = async function (owner, repo) {
        this.repo = await octokit.rest.repos.get({
            owner,
            repo,
        });
    };
    /**
     * Sets the current branch to make push to. If the branch doesn't exist yet,
     * it will be created first
     * @public
     * @param {string} branchName The name of the branch
     * @return {Promise}
     */
    setBranch = function (branchName) {
        if (!this.repo) {
            throw new CustomError("this.repository is not initialized";
        }
        return this.repo.listBranches().then((branches) => {
            let branchExists = branches.data.find((branch) => branch.name === branchName);
            if (!branchExists) {
                return this.repo.createBranch("master", branchName).then(() => {
                    this.currentBranch.name = branchName;
                });
            }
            else {
                this.currentBranch.name = branchName;
            }
        });
    };
    /**
     * Makes the push to the currently set branch
     * @public
     * @param  {string}   message Message of the commit
     * @param  {object[]} files   Array of objects (with keys 'content' and 'path'),
     *                            containing data to push
     * @return {Promise}
     */
    pushFiles = function (message, files) {
        if (!this.repo) {
            throw new CustomError("repository is not initialized";
        }
        if (!this.currentBranch.hasOwnProperty("name")) {
            throw new CustomError("Branch is not set";
        }
        return this.getCurrentCommitSHA()
            .then(this.getCurrentTreeSHA)
            .then(() => this.createFiles(files))
            .then(this.createTree)
            .then(() => this.createCommit(message))
            .then(this.updateHead)
            .catch((e) => {
            console.error(e);
        });
    };
    /**
     * Sets the current commit's SHA
     * @private
     * @return {Promise}
     */
    getCurrentCommitSHA() {
        return this.repo.getRef("heads/" + this.currentBranch.name).then((ref) => {
            this.currentBranch.commitSHA = ref.data.object.sha;
        });
    }
    /**
     * Sets the current commit tree's SHA
     * @private
     * @return {Promise}
     */
    getCurrentTreeSHA() {
        return this.repo.getCommit(this.currentBranch.commitSHA).then((commit) => {
            this.currentBranch.treeSHA = commit.data.tree.sha;
        });
    }
    /**
     * Creates blobs for all passed files
     * @private
     * @param  {object[]} filesInfo Array of objects (with keys 'content' and 'path'),
     *                              containing data to push
     * @return {Promise}
     */
    createFiles(filesInfo) {
        let promises = [];
        let length = filesInfo.length;
        for (let i = 0; i < length; i++) {
            promises.push(this.createFile(filesInfo[i]));
        }
        return Promise.all(promises);
    }
    /**
     * Creates a blob for a single file
     * @private
     * @param  {object} fileInfo Array of objects (with keys 'content' and 'path'),
     *                           containing data to push
     * @return {Promise}
     */
    createFile(fileInfo) {
        return this.repo.createBlob(fileInfo.content).then((blob) => {
            this.filesToCommit.push({
                sha: blob.data.sha,
                path: fileInfo.path,
                mode: "100644",
                type: "blob",
            });
        });
    }
    /**
     * Creates a new tree
     * @private
     * @return {Promise}
     */
    createTree() {
        return this.repo
            .createTree(this.filesToCommit, this.currentBranch.treeSHA)
            .then((tree) => {
            this.newCommit.treeSHA = tree.data.sha;
        });
    }
    /**
     * Creates a new commit
     * @private
     * @param  {string} message A message for the commit
     * @return {Promise}
     */
    createCommit(message) {
        return this.repo
            .commit(this.currentBranch.commitSHA, this.newCommit.treeSHA, message)
            .then((commit) => {
            this.newCommit.sha = commit.data.sha;
        });
    }
    /**
     * Updates the pointer of the current branch to point the newly created commit
     * @private
     * @return {Promise}
     */
    updateHead() {
        return this.repo.updateHead("heads/" + this.currentBranch.name, this.newCommit.sha);
    }
}
let githubApi;
exports.githubApi = githubApi;
function setGithubApi(auth) {
    exports.githubApi = githubApi = new GithubAPI(auth);
}
exports.setGithubApi = setGithubApi;
//# sourceMappingURL=githubApiPush.js.map