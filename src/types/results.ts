import { ONE, THREE, TWO, ZERO } from '../constants/common';

export const results = {
	default: ZERO,
	bigger: ONE,
	smaller: TWO,
	correct: THREE
};

export type Result = typeof results[keyof typeof results];
