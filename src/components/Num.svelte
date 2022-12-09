<script lang="ts">
	import type { Digit } from '../types/Digit';
	import { statuses } from '../types/statuses';
	export let number: Digit;
</script>

<span
	class="num"
	class:incorrect={number.status === statuses.incorrect && !number.included}
	class:included={number.status === statuses.incorrect && number.included}
>
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
		&.included {
			color: #fa650b;
		}
	}
</style>
