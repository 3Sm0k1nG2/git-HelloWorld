import { gitCredentials } from "../../types/GitCredentials";
import { decrypt } from "../common/auth";
import { readFile } from "../common/privateFsWriterReader";
import { reverse } from "../common/reverse";

export function readCredentials(): Promise<gitCredentials> {
    return readFile("git-credentials.json")
        .then(credentials => JSON.parse(credentials.toString()))
        .then((credentials:gitCredentials) => {
            return {
                url: decrypt(credentials.url, reverse(credentials.secret)),
                auth: decrypt(credentials.auth, reverse(credentials.secret))
            }
        })
}
