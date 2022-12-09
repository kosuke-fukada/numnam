import { Digit, type Answer, type Input } from './Digit';
import type { Status } from './statuses';

export class IncorrectAnswerDigit extends Digit {
	constructor(status: Status, readonly answer: Answer, included: boolean, readonly input: Input) {
		super(status, answer, included, input);
	}
}
