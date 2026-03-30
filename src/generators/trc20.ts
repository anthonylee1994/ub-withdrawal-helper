import {generateRandomString} from "../utils/random";

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function generateTRC20Address(): string {
    return generateRandomString({
        length: 33,
        charset: BASE58,
        prefix: "T",
    });
}
