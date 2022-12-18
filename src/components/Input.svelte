<script lang="ts">
	import { faDeleteLeft, faTurnDown } from '@fortawesome/free-solid-svg-icons/index';
	import { createEventDispatcher } from 'svelte';
	/** @ts-ignore */
	import Fa from 'svelte-fa/src/fa.svelte';
	const numbers = Array.from(Array(9), (value, key) => key + 1);
	const dispatch = createEventDispatcher();
	const inputDispatcher = (event: MouseEvent): void => {
		if (event.target) {
			dispatch('input', {
				value: Number((event.target as HTMLInputElement).value)
			});
		}
	};
	const deleteDispatcher = (): void => {
		dispatch('delete');
	};
	const submitDispatcher = (): void => {
		dispatch('submit');
	};
</script>

<div class="num-button-container">
	{#each numbers as number}
		<button class="num-button" value={number} on:click={inputDispatcher}>
			{number}
		</button>
	{/each}
	<button class="num-button" on:click={deleteDispatcher}>
		<Fa icon={faDeleteLeft} />
	</button>
	<button class="num-button" value="0" on:click={inputDispatcher}> 0 </button>
	<button class="num-button" on:click={submitDispatcher}>
		<Fa icon={faTurnDown} rotate={'90'} />
	</button>
</div>

<style lang="scss">
	.num-button-container {
		display: flex;
		flex-wrap: wrap;
		width: min(100%, 500px);
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		.num-button {
			width: 33.3%;
			height: 8vh;
			font-size: min(3vh, 30px);
			font-family: 'DSEG7-Classic';
			font-weight: bold;
			background-color: #161b22;
			color: #ffffff;
			border: none;
			cursor: pointer;
			&:active {
				background-color: #0a2a29;
			}
		}
	}
</style>
