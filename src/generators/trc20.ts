import {generateRandomString} from "@/utils/random";

const TRON_ADDRESS_PREFIX = "T";
const TRON_ADDRESS_BODY_LENGTH = 33; // Length of the random part (excluding prefix)
const BASE58_CHARSET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function generateTRC20Address(): string {
    return generateRandomString({
        length: TRON_ADDRESS_BODY_LENGTH,
        charset: BASE58_CHARSET,
        prefix: TRON_ADDRESS_PREFIX,
    });
}
