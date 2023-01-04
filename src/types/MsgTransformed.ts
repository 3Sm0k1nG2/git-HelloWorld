export interface MsgTransformed {
    getColLength() : number;
    getTransformedMsg(): boolean[][][];
    getOriginalMsg(): string;

    toString(showSymbol: string, hiddenSymbol: string) : string;
    toFullString(showSymbol: string, hiddenSymbol: string) : string;
}
