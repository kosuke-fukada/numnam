<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let title: string;
	export let answer: number | undefined;
	const dispatch = createEventDispatcher();
	const closeDispatcher = () => {
		dispatch('close');
	};
	const newGameDispatcher = () => {
		dispatch('close');
		dispatch('newGame');
	};
</script>

<div>
	<h1>{title}</h1>
	{#if answer}
		<div class="answer">
			<span>Answer:</span>
			<h2>{answer}</h2>
		</div>
	{/if}
	<button class="button new-game-button" on:click={newGameDispatcher}>NEW GAME</button>
	<button class="button close-button" on:click={closeDispatcher}>CLOSE</button>
</div>

<style lang="scss">
	h1,
	h2 {
		margin-block-start: 0;
		margin-block-end: 0;
	}
	.answer {
		margin: 10px 0;
	}
	.button {
		width: min(50%, 150px);
		height: min(5vh, 50px);
		position: absolute;
		margin: 0 auto;
		left: 0;
		right: 0;
		border-radius: 20px;
		border: none;
		font-size: min(2.5vh, 20px);
		font-weight: bold;
		color: #6e6e6e;
		&.close-button {
			bottom: 30px;
		}
		&.new-game-button {
			bottom: 100px;
		}
	}
</style>
