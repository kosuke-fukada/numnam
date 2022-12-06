<script lang="ts">
	import '@fontsource/bebas-neue';
	import type { ResultDigits } from 'src/types/numbers';
	import Numbers from './Numbers.svelte';

	export let results: ResultDigits[] = [];
</script>

<div class="results">
	{#each results.reverse() as result, index}
		<div class="result-container">
			<span class="title">{results.length === 2 && index === 0 ? '2nd' : '1st'} Trial</span>
			<Numbers numbers={result} result={result.result} />
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
			.title {
				color: #ffffff;
				font-size: 35px;
				font-weight: bold;
				margin-left: 15px;
				font-family: 'Bebas Neue';
			}
		}
	}
</style>
