<script lang="ts">
	import ResultNumbers from '../components/ResultNumbers.svelte';
	/** @ts-ignore */
	import Input from '../components/Input.svelte';
	import Modal from '../components/Modal.svelte';
	import Numbers from '../components/Numbers.svelte';
	import {
		Digit,
		FiveDigits,
		ReadOnlyDigit,
		ResultDigits,
		results,
		statuses,
		type FiveDigitsArray,
		type NotZeroOneDigitNumber,
		type OneDigitNumber,
		type ReadOnlyFiveDigitsArray,
		type Result
	} from '../types/numbers';
	let index = 0;
	let result: Result = results.correct;
	let trialCount = 1;
	let modalShow = false;
	let message: string;

	const createRandomDigits = (): FiveDigitsArray => {
		const digits: OneDigitNumber[] = [];
		while (digits.length < 5) {
			const random: OneDigitNumber = Math.floor(Math.random() * 10) as OneDigitNumber;
			if (!digits.length && random === 0) {
				continue;
			}
			if (digits.includes(random)) {
				continue;
			}
			digits.push(random);
		}
		return [
			new Digit(statuses.default, digits[0], undefined),
			new Digit(statuses.default, digits[1], undefined),
			new Digit(statuses.default, digits[2], undefined),
			new Digit(statuses.default, digits[3], undefined),
			new Digit(statuses.default, digits[4], undefined)
		];
	};

	let fiveDigitsArray: FiveDigitsArray = createRandomDigits();
	let numbers: FiveDigits = new FiveDigits(fiveDigitsArray);
	let resultNumbers: ResultDigits[] = [];

	const handleInput = (event: CustomEvent<{ value: OneDigitNumber | NotZeroOneDigitNumber }>) => {
		if (index === 5) return;
		fiveDigitsArray[index].input = event.detail.value;
		numbers = new FiveDigits(fiveDigitsArray);
		index++;
	};
	const handleDelete = () => {
		if (index === 0) return;
		index--;
		fiveDigitsArray[index].input = undefined;
		numbers = new FiveDigits(fiveDigitsArray);
	};
	const handleSubmit = async () => {
		const inputNumbers: FiveDigitsArray = numbers.toArray();
		let undefinedIncluded = false;
		inputNumbers.forEach((digit: Digit) => {
			if (digit.input === undefined) {
				undefinedIncluded = true;
				return;
			}
			if (!digit.isInputSameAsAnswer()) {
				digit.status = statuses.incorrect;
				if (result === results.correct) {
					result = digit.isInputBiggerThanAnswer() ? results.bigger : results.smaller;
				}
			}
		});
		if (undefinedIncluded) return;
		numbers = new FiveDigits(inputNumbers);
		await new Promise((resolve) => setTimeout(resolve, 0));

		if (result === results.correct) {
			message = 'correct!';
			trialCount = 1;
			handleModal();
		} else {
			if (trialCount === 3) {
				message = 'failed!';
				trialCount = 1;
				handleModal();
			} else {
				trialCount++;
				const readOnlyFiveDigitsArray: ReadOnlyFiveDigitsArray = inputNumbers.map(
					(digit: Digit) => {
						return new ReadOnlyDigit(digit.status, digit.answer, digit.input);
					}
				) as ReadOnlyFiveDigitsArray;
				resultNumbers = [...resultNumbers, new ResultDigits(readOnlyFiveDigitsArray, result)];
				resetInput();
			}
		}
	};
	const resetInput = () => {
		index = 0;
		numbers.toArray().forEach((digit: Digit) => {
			digit.input = undefined;
			digit.status = statuses.default;
		});
		numbers = new FiveDigits(numbers.toArray());
		result = results.correct;
	};
	const handleModal = () => {
		modalShow = !modalShow;
	};
</script>

<svelte:head>
	<link href="../../node_modules/dseg/css/dseg.css" rel="stylesheet" />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Numbers {numbers} {result} />
<ResultNumbers results={resultNumbers} />
<Input on:input={handleInput} on:delete={handleDelete} on:submit={handleSubmit} />
<Modal show={modalShow} on:close={handleModal}>{message}</Modal>
