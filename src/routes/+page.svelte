<script lang="ts">
	/** @ts-ignore */
	import Input from '../components/Input.svelte';
	import Numbers from '../components/Numbers.svelte';
	import {
		Digit,
		FiveDigits,
		results,
		statuses,
		type FiveDigitsArray,
		type NotZeroOneDigitNumber,
		type OneDigitNumber,
		type Result
	} from '../types/numbers';
	let index = 0;
	let result: Result = results.correct;

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
	const handleSubmit = () => {
		numbers.toArray().forEach((digit: Digit) => {
			if (!digit.isInputSameAsAnswer()) {
				digit.status = statuses.incorrect;
				if (result === results.correct) {
					result = digit.isInputBiggerThanAnswer() ? results.bigger : results.smaller;
				}
			}
		});
		if (result === results.correct) {
			alert('correct!');
		} else {
			alert('incorrect!');
		}
		result = results.correct;
	};
</script>

<svelte:head>
	<link href="../../node_modules/dseg/css/dseg.css" rel="stylesheet" />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Numbers {numbers} />
<Input on:input={handleInput} on:delete={handleDelete} on:submit={handleSubmit} />
