const HEX = "0123456789abcdef";

function randomHex(length: number): string {
    return Array.from({length}, () => HEX[Math.floor(Math.random() * HEX.length)]).join("");
}

export function generateERC20Address(): string {
    return "0x" + randomHex(40);
}
