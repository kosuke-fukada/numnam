<script lang="ts">
	import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	const dispatch = createEventDispatcher();
	const newGameDispatcher = () => {
		dispatch('newGame');
	};
	const rulesModalDispatcher = () => {
		dispatch('rules');
	};
</script>

<div class="header">
	<button class="header-item rules-button" on:click={rulesModalDispatcher}>
		<Fa icon={faCircleQuestion} color="#ffffff" size="3x" />
	</button>
	<button class="header-item new-game-button" on:click={newGameDispatcher}>NEW GAME</button>
</div>

<style lang="scss">
	.header {
		display: flex;
		vertical-align: center;
		justify-content: flex-end;
		padding: 20px 10px;
		.header-item {
			margin: 0 20px;
			&.new-game-button {
				width: min(50%, 150px);
				height: min(5vh, 50px);
				border-radius: 20px;
				border: none;
				font-size: min(2.5vh, 20px);
				font-weight: bold;
				color: #ffffff;
				background-color: #ec5990;
				cursor: pointer;
			}
			&.rules-button {
				background-color: transparent;
				border: none;
				cursor: pointer;
			}
		}
	}
</style>
