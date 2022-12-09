import { ONE, THREE, TWO } from '../constants/common';

const trialCount = [ONE, TWO, THREE] as const;
export type TrialCount = typeof trialCount[number];
