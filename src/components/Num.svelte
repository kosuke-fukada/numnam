<script lang="ts">
	import { statuses, type Digit } from '../types/numbers';
	export let number: Digit;
</script>

<span class="num" class:incorrect={number.status === statuses.incorrect}>
	{number.input}
</span>

<style lang="scss">
	.num {
		font-family: 'DSEG7-Classic';
		font-weight: bold;
		color: #f5f6ce;
		font-size: min(5vh, 60px);
		width: 20%;
		text-align: right;
		font-style: italic;
		&.incorrect {
			color: #585858;
		}
	}
</style>
