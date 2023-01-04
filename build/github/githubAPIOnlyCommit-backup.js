"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubAPIOnlyCommit = void 0;
const rest_1 = require("@octokit/rest");
// // delete after api is ready
// // File/Blob creation
// // var file = new File(["test"],"FIND_ME.txt");
// // var blob = file.slice();
//Uses the https://github.com/github-tools/github library under the hood and exposes it as `gh` property
class GithubAPIOnlyCommit {
    octokit;
    _owner;
    _repo;
    _files;
    _ref;
    _commit;
    _treeSHA;
    _tree;
    setOwner(val) { this._owner = val; }
    ;
    getOwner() { return this._owner; }
    ;
    setRepo(val) { this._repo = val; }
    ;
    getRepo() { return this._repo; }
    ;
    setRef(val) { this._ref.name = val; }
    getRef() { return this._ref.name; }
    // public setCommit(val: any) { this._commit = val; }
    // public getCommit() { return this._commit; }
    /**
     * Sets the current repository to make push to
     * @public
     * @param {string} owner Name of the user who owns the repository
     * @param {string} auth Auth token for the user and repository
     * @return void
     */
    constructor(auth) {
        //the underlying library for making requests
        this.octokit = new rest_1.Octokit({ auth });
        this._owner = undefined;
        this._repo = undefined;
        this._files = [];
        this._ref = { name: undefined, sha: undefined };
        this._commit = { message: undefined, sha: undefined };
        this._treeSHA = undefined;
    }
    // public createFileOrUpdateFileContents(message:string, content:string, path:string){
    //     this.octokit.rest.repos.createOrUpdateFileContents({
    //         owner:this._owner,
    //         repo:this._repo,
    //         message,
    //         content,
    //         path,
    //     })
    // }
    // private createBlob(file:GitFile){
    //     return this.octokit.rest.git.createBlob({
    //         owner: this._owner,
    //         repo: this._repo,
    //         content: file.content,
    //     })
    //         .then(res => {
    //             let blob:GitFileBlob = {
    //                 mode: "100644",
    //                 type: "blob",
    //                 // sha: res.data.sha,
    //                 content: file.content,
    //                 path: file.path,
    //             }
    //             return blob;
    //         })
    // }
    // private createBlobs(files:GitFile[]){
    //     let promises = [];
    //     for(let file of files){
    //         promises.push(this.createBlob(file))
    //     }
    //     return Promise.all(promises);
    // }
    /**
     * @public
     * @param {string[]} files The files' contents
     * @return void
     */
    addFiles(files) {
        this._files.push(...files);
        // return this.createBlobs(files)
        //     .then((blobs) => this._files.push(...blobs));
    }
    clearFiles() {
        this._files = [];
    }
    /**
     * @public
     * @param {string} message The message for the commit
     * @return void
     */
    commit(message) {
        if (!this._files.length)
            throw new CustomError("No files found to commit.";
        // this.getCurrentTreeSHA()
        //     .then(this.createTree)
        //     .then(() => this.createCommit(message))
        //     .then(this.updateHead)
        this.getCurrentTreeSHA()
            .then(async () => { let a = await this.createTree(); console.log(a); return a; })
            .then(async () => { let a = await this.createCommit(message); console.log(a); return a; })
            .then(async () => { let a = await this.updateHead(); console.log(a); return a; });
    }
    updateHead() {
        return this.octokit.rest.git.updateRef({
            owner: this._owner,
            repo: this._repo,
            ref: 'refs/heads/' + this._ref.name,
            sha: this._commit.sha
        });
    }
    createCommit(message) {
        return this.octokit.rest.git.createCommit({
            owner: this._owner,
            repo: this._repo,
            tree: this._treeSHA,
            message
        })
            .then((res) => [this._commit.message, this._commit.sha] = [res.data.message, res.data.sha]);
    }
    createTree() {
        return this.octokit.rest.git.createTree({
            owner: this._owner,
            repo: this._repo,
            tree: this._files,
            // base_tree: 
        })
            .then((res) => this._treeSHA = res.data.sha);
    }
    getAllRefs() {
        return this.octokit.rest.git.listMatchingRefs({
            owner: this._owner,
            repo: this._repo,
            ref: "",
        });
    }
    // /**
    //  * Sets the current branch to make push to. If the branch doesn't exist yet,
    //  * it will be created first
    //  * @public
    //  * @param {string} branchName The name of the branch
    //  * @return {Promise}
    //  */
    // public setBranch (branchName) {
    //     return this.octokit.rest.repos.listBranches({
    //         owner: this._owner,
    //         repo: this._repo
    //     })
    //         .then((branches) => {
    //             let branchExists = branches.data.find(
    //                 (branch) => branch.name === branchName
    //             );
    //             if (!branchExists) {
    //                 return this.octokit.rest.git.createRef(branchName)
    //                 .then(() => {
    //                     this.currentBranch.name = branchName;
    //                 });
    //             } else {
    //                 this.currentBranch.name = branchName;
    //             }
    //         });
    // };
    // /**
    //  * Makes the push to the currently set branch
    //  * @public
    //  * @param  {string}   message Message of the commit
    //  * @param  {object[]} files   Array of objects (with keys 'content' and 'path'),
    //  *                            containing data to push
    //  * @return {Promise}
    //  */
    // public pushFiles (message, files) {
    //     if (!this._repo) {
    //         throw new CustomError("repository is not initialized";
    //     }
    //     if (!this._ref.hasOwnProperty("name")) {
    //         throw new CustomError("Branch is not set";
    //     }
    //     return this.getCurrentCommitSHA()
    //         .then(this.getCurrentTreeSHA)
    //         .then(() => this.createFiles(files))
    //         .then(this.createTree)
    //         .then(() => this.createCommit(message))
    //         .then(this.updateHead)
    //         .catch((e) => {
    //             console.error(e);
    //         });
    // };
    /**
     * Sets the current commit's SHA
     * @private
     * @return {Promise}
     */
    getCurrentCommitSHA() {
        return this.octokit.rest.git
            .getRef({
            owner: this._owner,
            repo: this._repo,
            ref: `refs/heads/${this._ref.name}`
        })
            .then((ref) => {
            ref.data.ref;
            this._ref.sha = ref.data.object.sha;
        });
    }
    // /**
    //  * Sets the current commit tree's SHA
    //  * @private
    //  * @return {Promise}
    //  */
    getCurrentTreeSHA() {
        return this.octokit.rest.repos
            .getCommit(this._ref.sha)
            .then((commit) => {
            this._ref.sha = commit.data.commit.tree.sha;
        });
    }
}
exports.GithubAPIOnlyCommit = GithubAPIOnlyCommit;
;
//# sourceMappingURL=githubAPIOnlyCommit-backup.js.map