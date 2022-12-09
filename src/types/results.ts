import { ONE, TWO, ZERO } from '../constants/common';

export const results = {
	correct: ZERO,
	bigger: ONE,
	smaller: TWO
};

export type Result = typeof results[keyof typeof results];
