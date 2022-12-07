export type OneDigitNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NotZeroOneDigitNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const onesPlaceDigit = [0, 5];
export const statuses = {
	default: 0,
	correct: 1,
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

export class ReadOnlyDigit extends Digit {
	constructor(status: Status, readonly answer: Answer, included: boolean, readonly input: Input) {
		super(status, answer, included, input);
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

	toArray(): FiveDigitsArray {
		return [this.tenThousand, this.thousand, this.hundred, this.ten, this.one];
	}

	answer(): number {
		return (
			this.tenThousand.answer * 10000 +
			this.thousand.answer * 1000 +
			this.hundred.answer * 100 +
			this.ten.answer * 10 +
			this.one.answer
		);
	}
}

export type ReadOnlyFiveDigitsArray = [
	ReadOnlyDigit,
	ReadOnlyDigit,
	ReadOnlyDigit,
	ReadOnlyDigit,
	ReadOnlyDigit
];

export class ResultDigits {
	readonly tenThousand: ReadOnlyDigit;
	readonly thousand: ReadOnlyDigit;
	readonly hundred: ReadOnlyDigit;
	readonly ten: ReadOnlyDigit;
	readonly one: ReadOnlyDigit;
	readonly result: Result;

	constructor(fiveDigitsArray: ReadOnlyFiveDigitsArray, result: Result) {
		[this.tenThousand, this.thousand, this.hundred, this.ten, this.one] = fiveDigitsArray;
		this.result = result;
	}

	toArray(): ReadOnlyFiveDigitsArray {
		return [this.tenThousand, this.thousand, this.hundred, this.ten, this.one];
	}
}
