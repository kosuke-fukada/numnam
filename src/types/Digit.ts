import type { NotZeroOneDigitNumber, OneDigitNumber } from './numbers';
import type { Status } from './statuses';

export type Input = OneDigitNumber | NotZeroOneDigitNumber | undefined;
export type Answer = OneDigitNumber | NotZeroOneDigitNumber;

export class Digit {
	input: Input;
	status: Status;
	included: boolean;

	constructor(status: Status, readonly answer: Answer, included: boolean, input?: Input) {
		this.input = input;
		this.status = status;
		this.included = included;
	}

	isInputSameAsAnswer(): boolean {
		return this.input === this.answer;
	}

	isInputBiggerThanAnswer(): boolean {
		if (typeof this.input === 'undefined') {
			return false;
		}
		return this.input > this.answer;
	}
}
