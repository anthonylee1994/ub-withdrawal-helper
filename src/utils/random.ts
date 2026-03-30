export function generateRandomString(options: {length: number; charset: string; prefix?: string}): string;
export function generateRandomString(length: number, charset: string, prefix?: string): string;
export function generateRandomString(arg1: number | {length: number; charset: string; prefix?: string}, arg2?: string, arg3?: string): string {
    let length: number;
    let charset: string;
    let prefix: string;

    if (typeof arg1 === "object") {
        length = arg1.length;
        charset = arg1.charset;
        prefix = arg1.prefix || "";
    } else {
        length = arg1;
        charset = arg2 || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        prefix = arg3 || "";
    }

    const randomPart = Array.from({length}, () => charset[Math.floor(Math.random() * charset.length)]).join("");
    return prefix + randomPart;
}
