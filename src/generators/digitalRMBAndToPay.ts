import {generateRandomString} from "../utils/random";

const NUMBERS = "0123456789";

export function generateDigitalRMBAndToPayNumber(): string {
    return generateRandomString({
        length: 16,
        charset: NUMBERS,
    });
}
