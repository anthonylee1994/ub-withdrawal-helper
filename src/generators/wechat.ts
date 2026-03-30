import {generateRandomString} from "@/utils/random";

const NUMBERS = "0123456789";
const WXP_DIGITS = 30;

export function generateWeChatQrUrl(): string {
    return generateRandomString({
        length: WXP_DIGITS,
        charset: NUMBERS,
        prefix: "wxp://",
    });
}
