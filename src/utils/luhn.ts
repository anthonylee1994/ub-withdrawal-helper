export function getLuhnCheckDigit(number: string): number {
    const reversed = number.split("").reverse();
    const evenSum = reversed.filter((_, i) => i % 2 === 1).reduce((sum, digit) => sum + Number(digit), 0);

    const oddSum = reversed
        .filter((_, i) => i % 2 === 0)
        .map(digit => Number(digit) * 2)
        .reduce((sum, value) => {
            return (
                sum +
                String(value)
                    .split("")
                    .reduce((innerSum, d) => innerSum + Number(d), 0)
            );
        }, 0);

    return (10 - ((oddSum + evenSum) % 10)) % 10;
}
