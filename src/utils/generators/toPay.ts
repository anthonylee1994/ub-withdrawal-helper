export function generateToPayAddress(): string {
    return Array.from({length: 16}, () => Math.floor(Math.random() * 10)).join("");
}
