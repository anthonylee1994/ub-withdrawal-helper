const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function randomBase58(length: number): string {
    return Array.from({length}, () => BASE58[Math.floor(Math.random() * BASE58.length)]).join("");
}

export function generateUSDTAddress(): string {
    return "T" + randomBase58(33);
}
