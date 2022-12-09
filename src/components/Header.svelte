<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const newGameDispatcher = () => {
		dispatch('newGame');
	};
</script>

<div>
	<button class="new-game-button" on:click={newGameDispatcher}>NEW GAME</button>
</div>

<style lang="scss">
	.new-game-button {
		width: min(50%, 150px);
		height: min(5vh, 50px);
		position: absolute;
		margin: 0 auto;
		top: 30px;
		right: 100px;
		border-radius: 20px;
		border: none;
		font-size: min(2.5vh, 20px);
		font-weight: bold;
		color: #ffffff;
		background-color: #ec5990;
		cursor: pointer;
		@media screen and (max-width: 700px) {
			top: 15px;
			right: 10px;
		}
	}
</style>
