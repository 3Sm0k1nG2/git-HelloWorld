export type data = {
    msg: string,
    dates: {
        last: string,
        start: string,
        end: string
    },
    data: string,
    dataPos: string,
    commits: {
        cur: number,
        max: number
    }
}