<script lang="ts">
	import ResultNumbers from '../components/ResultNumbers.svelte';
	/** @ts-ignore */
	import Header from '../components/Header.svelte';
	import Input from '../components/Input.svelte';
	import Modal from '../components/Modal.svelte';
	import Numbers from '../components/Numbers.svelte';
	import ResultModalContent from '../components/ResultModalContent.svelte';
	import {
		Digit,
		FiveDigits,
		onesPlaceDigit,
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
	import { onMount } from 'svelte';
	let index = 0;
	let result: Result = results.correct;
	let trialCount = 1;
	let modalShow = false;
	let title = '';
	$: isFinished = title.length > 0;
	export type Stats = {
		challenges: number;
		success: number;
		failed: number;
	};
	let stats: Stats = {
		challenges: 0,
		success: 0,
		failed: 0
	};

	const createRandomDigits = (): FiveDigitsArray => {
		const digits: OneDigitNumber[] = [];
		while (digits.length < 4) {
			const random: OneDigitNumber = Math.floor(Math.random() * 10) as OneDigitNumber;
			if (onesPlaceDigit.includes(random)) {
				continue;
			}
			if (digits.includes(random)) {
				continue;
			}
			digits.push(random);
		}
		const onesPlace = Math.random() * 10 > 5 ? 5 : 0;
		digits.push(onesPlace);
		return [
			new Digit(statuses.default, digits[0], false, undefined),
			new Digit(statuses.default, digits[1], false, undefined),
			new Digit(statuses.default, digits[2], false, undefined),
			new Digit(statuses.default, digits[3], false, undefined),
			new Digit(statuses.default, digits[4], false, undefined)
		];
	};

	let fiveDigitsArray: FiveDigitsArray = createRandomDigits();
	$: numbers = new FiveDigits(fiveDigitsArray);
	let resultNumbers: ResultDigits[] = [];
	let answer: number | undefined;

	const handleInput = (
		event: CustomEvent<{ value: OneDigitNumber | NotZeroOneDigitNumber }>
	): void => {
		if (index === 5) return;
		fiveDigitsArray[index].input = event.detail.value;
		index++;
	};
	const handleDelete = (): void => {
		if (index === 0) return;
		index--;
		fiveDigitsArray[index].input = undefined;
	};
	const handleSubmit = async (): Promise<void> => {
		if (isFinished) return;
		const inputNumbers: FiveDigitsArray = numbers.toArray();
		const answers = inputNumbers.map((digit: Digit) => {
			return digit.answer;
		});
		let undefinedIncluded = false;
		inputNumbers.forEach((digit: Digit) => {
			if (digit.input === undefined) {
				undefinedIncluded = true;
				return;
			}
			if (!digit.isInputSameAsAnswer()) {
				digit.status = statuses.incorrect;
				if (answers.includes(digit.input)) {
					digit.included = true;
				}
				if (result === results.correct) {
					result = digit.isInputBiggerThanAnswer() ? results.bigger : results.smaller;
				}
			}
		});
		if (undefinedIncluded) return;
		await new Promise((resolve) => setTimeout(resolve, 0));

		if (result === results.correct) {
			title = 'Success!';
			await setStats(true);
			handleModal();
		} else {
			if (trialCount === 3) {
				title = 'Failed!';
				answer = numbers.answer();
				await setStats(false);
				handleModal();
			} else {
				trialCount++;
				const readOnlyFiveDigitsArray: ReadOnlyFiveDigitsArray = inputNumbers.map(
					(digit: Digit) => {
						return new ReadOnlyDigit(digit.status, digit.answer, digit.included, digit.input);
					}
				) as ReadOnlyFiveDigitsArray;
				resultNumbers = [...resultNumbers, new ResultDigits(readOnlyFiveDigitsArray, result)];
				resetInput();
			}
		}
	};
	const resetInput = (): void => {
		index = 0;
		const resetNumbers = numbers.toArray();
		resetNumbers.forEach((digit: Digit) => {
			digit.input = undefined;
			digit.status = statuses.default;
			digit.included = false;
		});
		fiveDigitsArray = resetNumbers;
		answer = undefined;
		result = results.correct;
		title = '';
	};
	const handleModal = (): void => {
		modalShow = !modalShow;
	};
	const newGame = (): void => {
		trialCount = 1;
		resetInput();
		resultNumbers = [];
		fiveDigitsArray = createRandomDigits();
	};
	const getStats = (): Stats => {
		const stats: string | null = localStorage.getItem('num_puzzle_stats');
		if (stats === null) {
			return {
				challenges: 0,
				success: 0,
				failed: 0
			};
		}
		return JSON.parse(stats);
	};
	const setStats = async (success: boolean): Promise<void> => {
		stats.challenges++;
		if (success) {
			stats.success++;
		} else {
			stats.failed++;
		}
		localStorage.setItem('stats', JSON.stringify(stats));
	};
	onMount(() => {
		stats = getStats();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Header on:newGame={newGame} />
<Numbers {numbers} {result} />
<ResultNumbers results={resultNumbers} />
<Input on:input={handleInput} on:delete={handleDelete} on:submit={handleSubmit} />
<Modal show={modalShow} on:close={handleModal}>
	<ResultModalContent {title} {answer} {stats} on:close={handleModal} on:newGame={newGame} />
</Modal>
