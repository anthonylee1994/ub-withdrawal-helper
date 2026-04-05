import {BANK_CONFIG} from "@/generators/bankConfigData";
import {getLuhnCheckDigit} from "@/utils/luhn";
import type {BankConfigRow} from "@/generators/bankConfigData";

const MAX_RETRY_ATTEMPTS = 100;

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

// Precompute filtered pools once at module load time
const BANK_POOLS: Record<number, BankConfigRow[]> = {};
for (let type = 1; type <= 4; type++) {
    BANK_POOLS[type] = BANK_CONFIG.filter((c: BankConfigRow) => c[4] === type);
}

function buildCardFromBinRow(bankInfo: BankConfigRow): string | null {
    const prefix = bankInfo[0];
    const totalLen = Number(bankInfo[3]);
    if (!Number.isFinite(totalLen) || totalLen < 14 || totalLen > 19) return null;
    const randomLen = totalLen - prefix.length - 1;
    if (randomLen < 0) return null;
    const middle = Array.from({length: randomLen}, () => randomInt(10)).join("");
    let cardNo = prefix + middle;
    cardNo = cardNo + getLuhnCheckDigit(cardNo);
    return cardNo;
}

export function generateBankCardNumber(): string {
    const type = 1 + randomInt(4);
    const pool = BANK_POOLS[type];
    const banks = pool.length > 0 ? pool : BANK_CONFIG;
    let bankInfo = banks[randomInt(banks.length)]!;
    let cardNo = buildCardFromBinRow(bankInfo);
    let guard = 0;
    while (!cardNo && guard < MAX_RETRY_ATTEMPTS) {
        bankInfo = banks[randomInt(banks.length)]!;
        cardNo = buildCardFromBinRow(bankInfo);
        guard++;
    }
    if (!cardNo) {
        const fallback = BANK_CONFIG.find((r: BankConfigRow) => buildCardFromBinRow(r) !== null) ?? BANK_CONFIG[0]!;
        cardNo = buildCardFromBinRow(fallback);
    }
    return cardNo!;
}
