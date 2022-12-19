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

{#if show}
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
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.8);
		height: 100vh;
		height: 100dvh;
		z-index: 10;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		display: flex;
		align-items: center;
		.modal-container {
			margin: auto;
			border-radius: 10px;
			background-color: #086a87;
			z-index: 11;
			width: min(75%, 500px);
			max-height: 95vh;
			max-height: 95dvh;
			cursor: auto;
			overflow: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}
			.modal-content {
				text-align: center;
				color: #ffffff;
				padding: 20px 30px;
				margin: 0 auto;
			}
		}
	}
</style>
