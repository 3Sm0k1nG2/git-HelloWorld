import { setup } from "../setup";

const statuses = {
    pending: "pending",
    fulfilled: "fulfilled",
    rejected: "rejected"
} as const;

TestGenerator(
    "                                                     ",
    "01/01/2023"
);

class Test {
    private data: string[];
    private status: typeof statuses[keyof typeof statuses] = statuses.pending;
    private result: any;

    constructor(msg:string, date:string) {
        this.data = [/*url, auth, secret,*/ date, msg];
    }

    run() {
        setup(this.data)
            // .then(data => doSomething) needs implementation
            .then((res) => {this.status = statuses.fulfilled; this.result = res})
            .catch((err) => {this.status = statuses.rejected; this.result = err})
    }

    public getStatus() {
        return this.status;
    }

    public getResult() {
        return this.result;
    }
}

function TestGenerator(msg: string, date: string) {
    return new Test(msg, date);
}
