import {generateRandomString} from "@/utils/random";

const ETHEREUM_ADDRESS_PREFIX = "0x";
const ETHEREUM_ADDRESS_LENGTH = 40;
const HEX_CHARSET = "0123456789abcdef";

export function generateERC20Address(): string {
    return generateRandomString({
        length: ETHEREUM_ADDRESS_LENGTH,
        charset: HEX_CHARSET,
        prefix: ETHEREUM_ADDRESS_PREFIX,
    });
}
