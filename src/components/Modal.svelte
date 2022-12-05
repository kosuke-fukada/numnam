<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	export let show = false;
	const dispatch = createEventDispatcher();
	const closeDispatcher = () => {
		dispatch('close');
	};
	const keyDownDispatcher = (event: KeyboardEvent) => {
		if (event.key === 'esc') {
			dispatch('close');
		}
	};
</script>

{#key show}
	<div
		class="modal-wrapper"
		class:show
		on:click|self={closeDispatcher}
		on:keydown={keyDownDispatcher}
		in:fade={{ duration: 100 }}
		out:fade={{ delay: 300 }}
	>
		<div class="modal-container" in:slide={{ delay: 100 }} out:slide={{ duration: 300 }}>
			<div class="modal-content">
				<div>
					<slot />
				</div>
				<button class="close-button" on:click={closeDispatcher}>CLOSE</button>
			</div>
		</div>
	</div>
{/key}

<style lang="scss">
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.8);
		display: none;
		&.show {
			display: block;
			z-index: 10;
		}
		.modal-container {
			position: absolute;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 10px;
			background-color: #086a87;
			z-index: 11;
			width: min(75%, 500px);
			height: min(75%, 500px);
			.modal-content {
				text-align: center;
				color: #ffffff;
				padding: 50px;
				margin: 0 auto;
				.close-button {
					width: min(50%, 125px);
					height: min(5vh, 50px);
					position: absolute;
					margin: 0 auto;
					left: 0;
					right: 0;
					bottom: 30px;
					border-radius: 20px;
					border: none;
					font-size: min(2.5vh, 20px);
					color: #6e6e6e;
				}
			}
		}
	}
</style>
