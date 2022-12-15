<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '../components/Header.svelte';
	import IncorrectAnswers from '../components/IncorrectAnswers.svelte';
	import Input from '../components/Input.svelte';
	import Modal from '../components/Modal.svelte';
	import Numbers from '../components/Numbers.svelte';
	import ResultModalContent from '../components/ResultModalContent.svelte';
	import RulesModalContent from '../components/RulesModalContent.svelte';
	import { FIVE, FOUR, ONE, THREE, TWO, ZERO } from '../constants/common';
	import { Digit } from '../types/Digit';
	import { FiveDigits, type FiveDigitsArray } from '../types/FiveDigits';
	import { IncorrectAnswerDigit } from '../types/IncorrectAnswerDigit';
	import {
		IncorrectAnswerFiveDigits,
		type IncorrectAnswerFiveDigitsArray
	} from '../types/IncorrectAnswerFiveDigits';
	import type { NotZeroOneDigitNumber, OneDigitNumber } from '../types/numbers';
	import { results, type Result } from '../types/results';
	import type { Stats } from '../types/stats';
	import { statuses } from '../types/statuses';
	import type { TrialCount } from '../types/trialCount';
	let index = ZERO;
	let result: Result = results.correct;
	let trialCount: TrialCount = ONE;
	let resultModalShow = false;
	let rulesModalShow = false;
	let title = '';
	$: isFinished = title.length > ZERO;
	let stats: Stats = {
		challenges: ZERO,
		success: ZERO,
		failed: ZERO
	};

	const createRandomDigits = (): FiveDigitsArray => {
		const digits: OneDigitNumber[] = [];
		while (digits.length < FOUR) {
			const random: OneDigitNumber = Math.floor(Math.random() * 10) as OneDigitNumber;
			const onesPlaceDigit = [ZERO, FIVE];
			if (onesPlaceDigit.includes(random)) {
				continue;
			}
			if (digits.includes(random)) {
				continue;
			}
			digits.push(random);
		}
		const onesPlace = Math.random() * 10 > 5 ? FIVE : ZERO;
		digits.push(onesPlace);
		return [
			new Digit(statuses.default, digits[ZERO], false, undefined),
			new Digit(statuses.default, digits[ONE], false, undefined),
			new Digit(statuses.default, digits[TWO], false, undefined),
			new Digit(statuses.default, digits[THREE], false, undefined),
			new Digit(statuses.default, digits[FOUR], false, undefined)
		];
	};

	let fiveDigitsArray: FiveDigitsArray = createRandomDigits();
	$: numbers = new FiveDigits(fiveDigitsArray);
	let incorrectAnswers: IncorrectAnswerFiveDigits[] = [];
	let answer: number | undefined;

	const handleInput = (
		event: CustomEvent<{ value: OneDigitNumber | NotZeroOneDigitNumber }>
	): void => {
		if (index === FIVE) return;
		fiveDigitsArray[index].input = event.detail.value;
		index++;
	};
	const handleDelete = (): void => {
		if (index === ZERO) return;
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

		if (result === results.correct) {
			title = 'Success!';
			await setStats(true);
			handleResultModal();
		} else {
			const readOnlyFiveDigitsArray: IncorrectAnswerFiveDigitsArray = inputNumbers.map(
				(digit: Digit) => {
					return new IncorrectAnswerDigit(digit.status, digit.answer, digit.included, digit.input);
				}
			) as IncorrectAnswerFiveDigitsArray;
			if (trialCount === THREE) {
				title = 'Failed!';
				fiveDigitsArray = readOnlyFiveDigitsArray;
				answer = numbers.answer();
				await setStats(false);
				handleResultModal();
			} else {
				trialCount++;
				incorrectAnswers = [
					...incorrectAnswers,
					new IncorrectAnswerFiveDigits(readOnlyFiveDigitsArray, result)
				];
				resetInput();
			}
		}
	};
	const resetInput = (): void => {
		index = ZERO;
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
	const handleResultModal = (): void => {
		resultModalShow = !resultModalShow;
	};
	const handleRulesModal = (): void => {
		rulesModalShow = !rulesModalShow;
	};
	const newGame = (): void => {
		trialCount = ONE;
		resetInput();
		incorrectAnswers = [];
		fiveDigitsArray = createRandomDigits();
	};
	const getStats = (): Stats => {
		const stats: string | null = localStorage.getItem('num_puzzle_stats');
		if (stats === null) {
			return {
				challenges: ZERO,
				success: ZERO,
				failed: ZERO
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
	onMount((): void => {
		stats = getStats();
	});
</script>

<Header on:newGame={newGame} on:rules={handleRulesModal} />
<Numbers {numbers} {result} />
<IncorrectAnswers {incorrectAnswers} />
<Input on:input={handleInput} on:delete={handleDelete} on:submit={handleSubmit} />
<Modal show={resultModalShow} on:close={handleResultModal}>
	<ResultModalContent {title} {answer} {stats} on:close={handleResultModal} on:newGame={newGame} />
</Modal>
<Modal show={rulesModalShow} on:close={handleRulesModal}>
	<RulesModalContent on:close={handleRulesModal} />
</Modal>
