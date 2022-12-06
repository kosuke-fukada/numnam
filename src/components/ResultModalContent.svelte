<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let title: string;
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
	<button class="button new-game-button" on:click={newGameDispatcher}>NEW GAME</button>
	<button class="button close-button" on:click={closeDispatcher}>CLOSE</button>
</div>

<style lang="scss">
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
