import {generateRandomString} from "@/utils/random";

const KD_PAY_ADDRESS_PREFIX = "ec";
const KD_PAY_ADDRESS_LENGTH = 32;
const KD_PAY_CHARSET = "0123456789abcdefghijklmnopqrstuvwxyz";

export function generateKDPayAddress(): string {
    return generateRandomString({
        length: KD_PAY_ADDRESS_LENGTH,
        charset: KD_PAY_CHARSET,
        prefix: KD_PAY_ADDRESS_PREFIX,
    });
}
