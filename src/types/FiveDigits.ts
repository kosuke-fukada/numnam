import type { Digit } from './Digit';

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
