import {generateRandomString} from "@/utils/random";

const SEGMENT_LEN = 24;
const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyz";

export function generateAlipayQrUrl(): string {
    return generateRandomString({
        length: SEGMENT_LEN,
        charset: CHARSET,
        prefix: "https://qr.alipay.com/",
    });
}
