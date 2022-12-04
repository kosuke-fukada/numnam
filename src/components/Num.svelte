<script lang="ts">
	import type { Digit } from '../types/numbers';
	export let number: Digit;
</script>

<span class="num" class:incorrect={!number.isInputSameAsAnswer()}>
	{number.input}
</span>

<style>
	.num {
		font-family: 'DSEG7-Classic';
		font-weight: bold;
	}
</style>
