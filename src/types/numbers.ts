export type OneDigitNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NotZeroOneDigitNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const statuses = {
	default: 0,
	same: 1,
	incorrect: 2
} as const;

export type Status = typeof statuses[keyof typeof statuses];

type Input = OneDigitNumber | NotZeroOneDigitNumber | undefined;
type Answer = OneDigitNumber | NotZeroOneDigitNumber;

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

export class FiveDigits {
	tenThousand: Digit;
	thousand: Digit;
	hundred: Digit;
	ten: Digit;
	one: Digit;

	constructor(tenThousand: Digit, thousand: Digit, hundred: Digit, ten: Digit, one: Digit) {
		this.tenThousand = tenThousand;
		this.thousand = thousand;
		this.hundred = hundred;
		this.ten = ten;
		this.one = one;
	}

	toArray(): Digit[] {
		return [this.tenThousand, this.thousand, this.hundred, this.ten, this.one];
	}
}
