const DEFAULT_CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type RandomStringOptions = {
    length: number;
    charset: string;
    prefix?: string;
};

function assertValidRandomStringInput(length: number, charset: string): void {
    if (!Number.isInteger(length) || length < 0) {
        throw new Error("`length` must be a non-negative integer.");
    }
    if (charset.length === 0) {
        throw new Error("`charset` must not be empty.");
    }
}

function normalizeRandomStringInput(arg1: number | RandomStringOptions, arg2?: string, arg3?: string): RandomStringOptions {
    if (typeof arg1 === "object") {
        return {
            length: arg1.length,
            charset: arg1.charset,
            prefix: arg1.prefix ?? "",
        };
    }

    return {
        length: arg1,
        charset: arg2 ?? DEFAULT_CHARSET,
        prefix: arg3 ?? "",
    };
}

export function generateRandomString(options: RandomStringOptions): string;
export function generateRandomString(length: number, charset: string, prefix?: string): string;
export function generateRandomString(arg1: number | RandomStringOptions, arg2?: string, arg3?: string): string {
    const {length, charset, prefix = ""} = normalizeRandomStringInput(arg1, arg2, arg3);

    assertValidRandomStringInput(length, charset);

    const randomPart = Array.from({length}, () => charset[Math.floor(Math.random() * charset.length)]).join("");
    return prefix + randomPart;
}
