"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rest_1 = require("@octokit/rest");
//Uses the https://github.com/github-tools/github library under the hood and exposes it as `gh` property
function GithubAPI(auth) {
    var repo;
    var filesToCommit = [];
    var currentBranch = {};
    var newCommit = {};
    //the underlying library for making requests
    var gh = new rest_1.Octokit(auth);
    /**
     * Sets the current repository to make push to
     * @public
     * @param {string} userName Name of the user who owns the repository
     * @param {string} repoName Name of the repository
     * @return void
     */
    this.setRepo = function (userName, repoName) {
        repo = gh.getRepo(userName, repoName);
    };
    /**
     * Sets the current branch to make push to. If the branch doesn't exist yet,
     * it will be created first
     * @public
     * @param {string} branchName The name of the branch
     * @return {Promise}
     */
    this.setBranch = function (branchName) {
        if (!repo) {
            throw new CustomError('Repository is not initialized';
        }
        return repo.listBranches().then(function (branches) {
            var branchExists = branches.data.find(function (branch) { return branch.name === branchName; });
            if (!branchExists) {
                return repo.createBranch('master', branchName)
                    .then(function () {
                    currentBranch.name = branchName;
                });
            }
            else {
                currentBranch.name = branchName;
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
    this.pushFiles = function (message, files) {
        if (!repo) {
            throw new CustomError('Repository is not initialized';
        }
        if (!currentBranch.hasOwnProperty('name')) {
            throw new CustomError('Branch is not set';
        }
        return getCurrentCommitSHA()
            .then(getCurrentTreeSHA)
            .then(function () { return createFiles(files); })
            .then(createTree)
            .then(function () { return createCommit(message); })
            .then(updateHead)
            .catch(function (e) {
            console.error(e);
        });
    };
    /**
     * Sets the current commit's SHA
     * @private
     * @return {Promise}
     */
    function getCurrentCommitSHA() {
        return repo.getRef('heads/' + currentBranch.name)
            .then(function (ref) {
            currentBranch.commitSHA = ref.data.object.sha;
        });
    }
    /**
     * Sets the current commit tree's SHA
     * @private
     * @return {Promise}
     */
    function getCurrentTreeSHA() {
        return repo.getCommit(currentBranch.commitSHA)
            .then(function (commit) {
            currentBranch.treeSHA = commit.data.tree.sha;
        });
    }
    /**
     * Creates blobs for all passed files
     * @private
     * @param  {object[]} filesInfo Array of objects (with keys 'content' and 'path'),
     *                              containing data to push
     * @return {Promise}
     */
    function createFiles(filesInfo) {
        var promises = [];
        var length = filesInfo.length;
        for (var i = 0; i < length; i++) {
            promises.push(createFile(filesInfo[i]));
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
    function createFile(fileInfo) {
        return repo.createBlob(fileInfo.content)
            .then(function (blob) {
            filesToCommit.push({
                sha: blob.data.sha,
                path: fileInfo.path,
                mode: '100644',
                type: 'blob'
            });
        });
    }
    /**
     * Creates a new tree
     * @private
     * @return {Promise}
     */
    function createTree() {
        return repo.createTree(filesToCommit, currentBranch.treeSHA)
            .then(function (tree) {
            newCommit.treeSHA = tree.data.sha;
        });
    }
    /**
     * Creates a new commit
     * @private
     * @param  {string} message A message for the commit
     * @return {Promise}
     */
    function createCommit(message) {
        return repo.commit(currentBranch.commitSHA, newCommit.treeSHA, message)
            .then(function (commit) {
            newCommit.sha = commit.data.sha;
        });
    }
    /**
     * Updates the pointer of the current branch to point the newly created commit
     * @private
     * @return {Promise}
     */
    function updateHead() {
        return repo.updateHead('heads/' + currentBranch.name, newCommit.sha);
    }
}
;
//# sourceMappingURL=githubApiPush%20copy.js.map