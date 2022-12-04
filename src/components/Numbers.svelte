<script lang="ts">
	import type { FiveDigits } from '../types/numbers';
	import Num from './Num.svelte';
	export let numbers: FiveDigits;
</script>

<div class="numbers">
	{#each numbers.toArray() as number}
		{#if typeof number.input !== 'undefined'}
			<span>
				<Num {number} />
			</span>
		{/if}
	{/each}
</div>

<style>
	.numbers {
		display: flex;
		justify-content: flex-end;
	}
</style>
