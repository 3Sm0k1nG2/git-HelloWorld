import { INPUT_LENGTH_MIN } from "../../consts";
import { input } from "../../types/SetupInput";
import { CustomError } from "../common/error";
import { validateAuth, validateDate, validateMsg, validateUrl } from "../common/validator";

export async function validateInput(input: input) {
    let { url, auth, secret, date, msg } = input;

    if (Object.values(input).length < INPUT_LENGTH_MIN) {
        throw new CustomError(CustomError.types.INPUT_MISSING);
    }

    if (Object.values(input).some((x) => x.length === 0)) {
        throw new CustomError(CustomError.types.INPUT_MISSING);
    }

    validateUrl(url);
    validateAuth(auth);
    await validateMsg(msg);
    validateDate(date);
}