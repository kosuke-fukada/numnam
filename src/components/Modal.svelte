<script lang="ts">
	import { createEventDispatcher } from 'svelte';
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

<div class="modal-wrapper" class:show on:click={closeDispatcher} on:keydown={keyDownDispatcher}>
	<div class="modal-container">
		<div class="modal-content">
			<div>
				<slot />
			</div>
			<button class="close-button" on:click={closeDispatcher}>CLOSE</button>
		</div>
	</div>
</div>

<style lang="scss">
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba($color: #000000, $alpha: 0.7);
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
			background-color: #0b0719;
			z-index: 11;
			width: min(75%, 500px);
			height: min(75%, 500px);
			.modal-content {
				text-align: center;
				color: #ffffff;
				padding: 50px;
				margin: 0 auto;
				.close-button {
					width: min(25%, 125px);
					height: 30px;
					position: absolute;
					margin: 0 auto;
					left: 0;
					right: 0;
					bottom: 50px;
				}
			}
		}
	}
</style>
