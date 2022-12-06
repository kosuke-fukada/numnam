<script lang="ts">
	import type { ResultDigits } from 'src/types/numbers';
	import Numbers from './Numbers.svelte';

	export let results: ResultDigits[] = [];
</script>

<div>
	{#each results.reverse() as result, index}
		<span class="title">{index === 1 ? '1st' : '2nd'} Trial</span>
		<Numbers numbers={result} result={result.result} />
	{/each}
</div>

<style>
	.title {
		color: #ffffff;
		font-size: 25px;
		font-weight: bold;
		font-style: italic;
		margin-left: 15px;
	}
</style>
