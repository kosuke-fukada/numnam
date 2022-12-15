<script lang="ts">
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { slide } from 'svelte/transition';
	const dispatch = createEventDispatcher();
	const newGameDispatcher = () => {
		menuShow = false;
		dispatch('newGame');
	};
	const rulesModalDispatcher = () => {
		menuShow = false;
		dispatch('rules');
	};
	let menuShow = false;
</script>

<div class="header">
	<img class="logo" src="/images/logo.png" alt="logo" />
	<button class="menu-bars" on:click={() => (menuShow = !menuShow)}>
		<Fa icon={faBars} size="2x" />
	</button>
	{#if menuShow}
		<div
			class="menu"
			transition:slide
			on:click|self={() => (menuShow = false)}
			on:keydown={() => (menuShow = false)}
		>
			<div class="menu-content">
				<div class="menu-item">
					<button on:click={rulesModalDispatcher}>HOW TO PLAY</button>
				</div>
				<div class="menu-item">
					<button on:click={newGameDispatcher}>NEW GAME</button>
				</div>
				<div class="menu-item">
					<button on:click={() => (menuShow = false)}>CLOSE</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.header {
		padding: 20px 10px;
		height: 50px;
		text-align: center;
		display: flex;
		align-items: center;
		.logo {
			max-width: 40vw;
			height: auto;
			left: 0;
			right: 0;
			margin: auto;
		}
		.menu-bars {
			background-color: transparent;
			border: none;
			position: absolute;
			right: 0;
			margin: 10px;
			color: #ffffff;
			cursor: pointer;
		}
		.menu {
			position: absolute;
			top: 90px;
			left: 0;
			z-index: 10;
			height: calc(100vh - 90px);
			width: 100vw;
			background-color: rgba($color: #000000, $alpha: 0.8);
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
			&-content {
				z-index: 11;
			}
			.menu-item {
				height: 10vh;
				cursor: pointer;
				margin: 0;
				border-bottom: #ffffff 1px solid;
				&:first-child {
					border-top: #ffffff 1px solid;
				}
				button {
					border: none;
					background-color: #071418;
					width: 100%;
					height: 100%;
					color: #ffffff;
					font-weight: bold;
					font-size: min(2.5vh, 20px);
					vertical-align: middle;
					cursor: pointer;
				}
			}
		}
	}
</style>
