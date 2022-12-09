<script lang="ts">
	import type { FiveDigits } from '../types/FiveDigits';
	import type { IncorrectAnswerFiveDigits } from '../types/IncorrectAnswerFiveDigits';
	import { results } from '../types/results';
	import Num from './Num.svelte';
	export let numbers: FiveDigits | IncorrectAnswerFiveDigits;
	export let result = results.correct;
</script>

<div
	class="numbers"
	class:bigger={result === results.bigger}
	class:smaller={result === results.smaller}
>
	{#if numbers}
		{#each numbers.toArray() as number}
			{#if typeof number.input !== 'undefined'}
				<Num {number} />
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.numbers {
		display: flex;
		justify-content: flex-end;
		position: relative;
		margin: 0 auto;
		width: min(90%, 500px);
		background-color: #151515;
		padding: 20px 20px 20px 0;
		min-height: min(5vh, 65px);
		border-radius: 10px;
		&.bigger {
			background-color: #05122b;
			border: 5px solid #fa4a8c;
		}
		&.smaller {
			background-color: #05122b;
			border: 5px solid #524afa;
		}
	}
</style>
