export type OneDigitNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NotZeroOneDigitNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const statuses = {
	default: 0,
	same: 1,
	incorrect: 2
} as const;

export type Status = typeof statuses[keyof typeof statuses];

export const results = {
	correct: 0,
	bigger: 1,
	smaller: 2
};

export type Result = typeof results[keyof typeof results];

export type Input = OneDigitNumber | NotZeroOneDigitNumber | undefined;
export type Answer = OneDigitNumber | NotZeroOneDigitNumber;

export class Digit {
	input: Input;
	status: Status;

	constructor(status: Status, readonly answer: Answer, input?: Input) {
		this.input = input;
		this.status = status;
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

export type FiveDigitsArray = [Digit, Digit, Digit, Digit, Digit];

export class FiveDigits {
	tenThousand: Digit;
	thousand: Digit;
	hundred: Digit;
	ten: Digit;
	one: Digit;

	constructor(fiveDigitsArray: FiveDigitsArray) {
		[this.tenThousand, this.thousand, this.hundred, this.ten, this.one] = fiveDigitsArray;
	}

	toArray(): Digit[] {
		return [this.tenThousand, this.thousand, this.hundred, this.ten, this.one];
	}
}
