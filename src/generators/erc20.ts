import {generateRandomString} from "../utils/random";

const HEX = "0123456789abcdef";

export function generateERC20Address(): string {
    return "0x" + generateRandomString(40, HEX);
}
