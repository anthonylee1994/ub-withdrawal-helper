import {generateRandomString} from "@/utils/random";

const NUMBERS = "0123456789";

function generateDigitalRMBOrToPayNumber(): string {
    return generateRandomString({
        length: 16,
        charset: NUMBERS,
    });
}

export function generateDigitalRMBNumber(): string {
    return generateDigitalRMBOrToPayNumber();
}

export function generateToPayNumber(): string {
    return generateDigitalRMBOrToPayNumber();
}
