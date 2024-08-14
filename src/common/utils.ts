const NO_BREAK_SPACE = '\u00A0';

export const displayUnitWithValue = (
    unit: string,
    value?: number | string,
    unitPluralWord?: string,
): string | undefined => {
    const parsedValue = parseInt(`${value}`, 10);

    if (!Number.isFinite(parsedValue)) {
        return undefined;
    }

    return parsedValue > 1 && unitPluralWord
        ? `${value}${NO_BREAK_SPACE}${unitPluralWord}`
        : `${value}${NO_BREAK_SPACE}${unit}${parsedValue === 1 ? '' : 's'}`;
};
