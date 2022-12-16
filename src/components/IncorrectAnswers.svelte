<script lang="ts">
	import '@fontsource/bebas-neue';
	import type { IncorrectAnswerFiveDigits } from 'src/types/IncorrectAnswerFiveDigits';
	import Numbers from './Numbers.svelte';

	export let incorrectAnswers: IncorrectAnswerFiveDigits[] = [];
</script>

<div class="results">
	{#each incorrectAnswers.reverse() as incorrectAnswer, index}
		<div class="result-container">
			<Numbers numbers={incorrectAnswer} result={incorrectAnswer.result} />
		</div>
	{/each}
</div>

<style lang="scss">
	.results {
		position: relative;
		margin: 20px auto;
		width: min(90%, 500px);
		.result-container {
			margin: 10px 0;
		}
	}
</style>
