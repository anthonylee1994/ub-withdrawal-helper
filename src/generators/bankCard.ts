import {BANK_CONFIG, type BankConfigRow} from "./bankConfigData";

const BANK_TYPE: Record<number, string> = {
    1: "借记卡",
    2: "贷记卡",
    3: "准贷记卡",
    4: "信用卡",
};

function getTypeLabel(type: BankConfigRow[4]): string {
    if (typeof type === "number" && Object.prototype.hasOwnProperty.call(BANK_TYPE, type)) {
        return BANK_TYPE[type];
    }
    return String(type);
}

export function getVerificationCode(bankcard: string): number {
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

function pickBankPool(bankType?: number): BankConfigRow[] {
    let banks = bankType != null ? BANK_CONFIG.filter(c => c[4] === +bankType) : [...BANK_CONFIG];
    if (banks.length === 0) banks = [...BANK_CONFIG];
    return banks;
}

function buildRandomBankCards(num: number, bankType?: number): [string, string][] {
    const banks = pickBankPool(bankType);
    return Array.from({length: num}, () => {
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
            bankInfo = fallback ?? BANK_CONFIG[0]!;
            cardNo = buildCardFromBinRow(bankInfo);
        }
        return [cardNo, `${bankInfo[1]}(${getTypeLabel(bankInfo[4])})`] as [string, string];
    });
}

export function generateBankCardNumber(): string {
    const type = 1 + randomInt(4);
    return buildRandomBankCards(1, type)[0]![0];
}
