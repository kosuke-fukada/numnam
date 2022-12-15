<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Stats } from '../types/stats';
	export let title: string;
	export let answer: number | undefined;
	export let stats: Stats;
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
	<div class="stats">
		<h3>Stats:</h3>
		<p>Challenges: {stats.challenges}</p>
		<p>Success: {stats.success}</p>
		<p>Failed: {stats.failed}</p>
	</div>
	<div class="button-wrapper">
		<div class="button-container">
			<button class="button new-game-button" on:click={newGameDispatcher}>NEW GAME</button>
		</div>
		<div class="button-container">
			<button class="button close-button" on:click={closeDispatcher}>CLOSE</button>
		</div>
	</div>
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
	.stats {
		margin: 10px 0;
		p {
			margin-block-start: 0.5em;
			margin-block-end: 0.5em;
		}
	}
	.button-wrapper {
		margin: 30px 0 20px 0;
		.button-container {
			margin: 10px 0;
			.button {
				width: min(80%, 150px);
				height: min(5vh, 50px);
				margin: 0 auto;
				border-radius: 20px;
				border: none;
				font-size: min(6vw, 20px);
				font-weight: bold;
				color: #6e6e6e;
				cursor: pointer;
				&.new-game-button {
					color: #ffffff;
					background-color: #ec5990;
				}
			}
		}
	}
</style>
