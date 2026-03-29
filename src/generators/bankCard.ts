import {BANK_CONFIG, type BankConfigRow} from "./bankConfigData";


function getVerificationCode(bankcard: string): number {
    const reverseCardArr = bankcard.split("").reverse();
    const evenSum = reverseCardArr.filter((_, i) => i % 2 === 1).reduce((c, r) => +c + +r, 0);
    const oddSum = reverseCardArr
        .filter((_, i) => i % 2 === 0)
        .map(r => +r * 2)
        .reduce(
            (accumulator, currentValue) =>
                accumulator +
                String(currentValue)
                    .split("")
                    .reduce((a, c) => +a + +c, 0),
            0
        );
    return (10 - ((oddSum + evenSum) % 10)) % 10;
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function buildCardFromBinRow(bankInfo: BankConfigRow): string | null {
    const prefix = bankInfo[0];
    const totalLen = Number(bankInfo[3]);
    if (!Number.isFinite(totalLen) || totalLen < 14 || totalLen > 19) return null;
    const randomLen = totalLen - prefix.length - 1;
    if (randomLen < 0) return null;
    const middle = Array.from({length: randomLen}, () => randomInt(10)).join("");
    let cardNo = prefix + middle;
    cardNo = cardNo + getVerificationCode(cardNo);
    return cardNo;
}

export function generateBankCardNumber(): string {
    const type = 1 + randomInt(4);
    const pool = BANK_CONFIG.filter(c => c[4] === type);
    const banks = pool.length > 0 ? pool : BANK_CONFIG;
    let bankInfo = banks[randomInt(banks.length)]!;
    let cardNo = buildCardFromBinRow(bankInfo);
    let guard = 0;
    while (!cardNo && guard < 100) {
        bankInfo = banks[randomInt(banks.length)]!;
        cardNo = buildCardFromBinRow(bankInfo);
        guard++;
    }
    if (!cardNo) {
        const fallback = BANK_CONFIG.find(r => buildCardFromBinRow(r) !== null);
        cardNo = buildCardFromBinRow(fallback ?? BANK_CONFIG[0]!);
    }
    return cardNo!;
}
