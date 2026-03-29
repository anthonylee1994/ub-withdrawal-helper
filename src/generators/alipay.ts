import { generateRandomString } from "../utils/random";

const SEGMENT_LEN = 24;
const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyz";

export function generateAlipayQrUrl(): string {
    return `https://qr.alipay.com/${generateRandomString(SEGMENT_LEN, CHARSET)}`;
}
