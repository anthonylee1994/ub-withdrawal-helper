import {generateRandomString} from "../utils/random";

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function generateTRC20Address(): string {
    return "T" + generateRandomString(33, BASE58);
}
