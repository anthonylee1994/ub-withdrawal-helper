const SEGMENT_LEN = 24;
const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyz";

export function generateAlipayQrUrl(): string {
    const segment = Array.from({length: SEGMENT_LEN}, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join("");
    return `https://qr.alipay.com/${segment}`;
}
