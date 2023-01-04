import { CustomError } from "./error";

const locale = "ISO";
const options = { day: "2-digit", month: "2-digit", year: "numeric" } as const;

function parseToDate(date:string) : Date
function parseToDate(year: number, month: number, date:number) : Date

function parseToDate(year: any, month?: number, date?: number) {
    if(typeof year === "string"){
        let date = new Date(year);
        date.setHours(12, 0, 0, 0);
        return date;
    }

    if(!month){
        throw new CustomError(CustomError.types.DATE_PARSER_MONTH_UNDEFINED);
    }

    return new Date(Number(year), month, date, 12);
}

function parseFromDate(date: Date) {
    return date.toLocaleDateString(locale, options);
}

function getToday(){
    let today = new Date();
    today.setHours(12, 0, 0, 0);
    return today;
}

export { parseToDate, parseFromDate, getToday };
