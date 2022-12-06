<script lang="ts">
	import { results, type FiveDigits, type ResultDigits } from '../types/numbers';
	import Num from './Num.svelte';
	export let numbers: FiveDigits | ResultDigits;
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
		&.bigger {
			background-color: #b40431;
		}
		&.smaller {
			background-color: #08088a;
		}
	}
</style>
