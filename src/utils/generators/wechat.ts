const WXP_DIGITS = 30;

export function generateWeChatPayUrl(): string {
    const digits = Array.from({length: WXP_DIGITS}, () => Math.floor(Math.random() * 10)).join("");
    return `wxp://${digits}`;
}
