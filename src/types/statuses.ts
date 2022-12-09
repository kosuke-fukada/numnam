import { ONE, TWO, ZERO } from '../constants/common';

export const statuses = {
	default: ZERO,
	correct: ONE,
	incorrect: TWO
} as const;

export type Status = typeof statuses[keyof typeof statuses];
