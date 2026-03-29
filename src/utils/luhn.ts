export function getLuhnCheckDigit(number: string): number {
    let sum = 0;
    let double = true;

    // Single pass Luhn calculation from right to left
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = Number(number[i]);

        if (double) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        double = !double;
    }

    return (10 - (sum % 10)) % 10;
}
