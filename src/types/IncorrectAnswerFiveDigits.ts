import { FiveDigits } from './FiveDigits';
import type { IncorrectAnswerDigit } from './IncorrectAnswerDigit';
import type { Result } from './results';

export type IncorrectAnswerFiveDigitsArray = [
	IncorrectAnswerDigit,
	IncorrectAnswerDigit,
	IncorrectAnswerDigit,
	IncorrectAnswerDigit,
	IncorrectAnswerDigit
];

export class IncorrectAnswerFiveDigits extends FiveDigits {
	readonly tenThousand: IncorrectAnswerDigit;
	readonly thousand: IncorrectAnswerDigit;
	readonly hundred: IncorrectAnswerDigit;
	readonly ten: IncorrectAnswerDigit;
	readonly one: IncorrectAnswerDigit;
	readonly result: Result;

	constructor(fiveDigitsArray: IncorrectAnswerFiveDigitsArray, result: Result) {
		super(fiveDigitsArray);
		[this.tenThousand, this.thousand, this.hundred, this.ten, this.one] = fiveDigitsArray;
		this.result = result;
	}
}
