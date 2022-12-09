import { EIGHT, FIVE, FOUR, NINE, ONE, SEVEN, SIX, THREE, TWO, ZERO } from '../constants/common';

const OneDigit = [ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE] as const;
const NotZeroOneDigit = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE] as const;

export type OneDigitNumber = typeof OneDigit[number];
export type NotZeroOneDigitNumber = typeof NotZeroOneDigit[number];
