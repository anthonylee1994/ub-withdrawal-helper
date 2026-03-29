import {generateRandomString} from "../utils/random";

const NUMBERS = "0123456789";
const WXP_DIGITS = 30;

export function generateWeChatQrUrl(): string {
    return `wxp://${generateRandomString(WXP_DIGITS, NUMBERS)}`;
}
