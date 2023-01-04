import { Octokit } from "@octokit/rest";
import { commit, repo } from "../../types/GithubAPIOnlyCommit";
import { GitFileBlob } from "../../types/GitStructures";
import { getToday } from "../common/date";
import { CustomError } from "../common/error";

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
    private octokit: Octokit;

    private owner: string;
    private repo: string;
    private branch: string;

    private get ref() { return "heads/" + this.branch; };

    public setOwner(value: string) { this.owner = value; };
    public getOwner() { return this.owner; };

    public setRepo(value: string) { this.repo = value; };
    public getRepo() { return this.repo; };

    public setBranch(value: string) { this.branch = value; };
    public getBranch() { return this.branch; };

    private files: GitFileBlob[];
    private user: {
        id: number,
        login: string
    }

    /**
     * Initialize octokit
     * @public
     * @param {string} auth Auth token for the user
     * @return void
     */
    constructor(auth: string) {
        //the underlying library for making requests
        this.octokit = new Octokit({ auth });

        this.files = [];
        this.user = {
            id: undefined,
            login: undefined
        }
    }

    public authenticate() {
        return this.octokit.rest.users.getAuthenticated()
            .then(x => this.user = {...x.data})
    }

    public clearFiles() {
        this.files = [];
    }
    public addFiles(files: GitFileBlob[]) {
        this.files.push(...files);
    }

    public async commit(message: string, date = getToday()) {
        if (!this.files.length) {
            throw new CustomError(CustomError.types.GIT_NO_FILES_TO_COMMIT);
        }

        await this.getLatestTreeSHA()
            .then((latestTreeSHA) => this.createdTree(latestTreeSHA))
            .then(({ treeSHA, baseTreeSHA }) => this.createCommit(message, treeSHA, [baseTreeSHA], date))
            .then((commitSHA) => this.updateRef(commitSHA))
    }

    private getLatestTreeSHA() {
        return this.octokit.rest.git
            .getRef({
                owner: this.owner,
                repo: this.repo,
                ref: this.ref,
            })
            .then((res) => res.data.object.sha);
    }

    private createdTree(baseTreeSHA?: string) {
        return this.octokit.rest.git
            .createTree({
                owner: this.owner,
                repo: this.repo,
                tree: this.files,
                base_tree: baseTreeSHA,
            })
            .then((res) =>
                baseTreeSHA
                    ? { treeSHA: res.data.sha, baseTreeSHA: baseTreeSHA }
                    : { treeSHA: res.data.sha, baseTreeSHA: undefined }
            );
    }

    private createCommit(
        message: string,
        treeSHA: string,
        parentsTreeSHA?: string[],
        date = getToday()
    ) {
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
        }

        return this.octokit.rest.git
            .createCommit(params)
            .then((res) => res.data.sha);
    }

    private updateRef(commitSHA: string) {
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

export { GithubAPIOnlyCommit };
