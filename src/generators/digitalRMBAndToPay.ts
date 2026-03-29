import {generateRandomString} from "../utils/random";

const NUMBERS = "0123456789";

export function generateDigitalRMBAndToPayNumber(): string {
    return generateRandomString(16, NUMBERS);
}
