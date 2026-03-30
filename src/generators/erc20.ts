import {generateRandomString} from "@/utils/random";

const HEX = "0123456789abcdef";

export function generateERC20Address(): string {
    return generateRandomString({
        length: 40,
        charset: HEX,
        prefix: "0x",
    });
}
