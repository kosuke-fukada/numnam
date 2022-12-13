<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const closeDispatcher = () => {
		dispatch('close');
	};
</script>

<div>
	<h1>Outline</h1>
	<div class="text">
		<span>This is a five-digit number guessing game. The five-digit number is:</span>
		<ul class="list">
			<li>It is a multiple of 5.</li>
			<li>All are different numbers.</li>
		</ul>
		<span>You can try 3 times.</span>
	</div>
	<h1>Hints</h1>
	<div class="text">
		<span>The hints are below:</span>
		<ul class="list">
			<li>
				If the number you enter are correct in both position and value, it'll be displayed like <img
					class="digit"
					src="/images/correct_number.png"
					alt="correct number"
				/>.
			</li>
			<li>
				If the number is included but the position is wrong, it'll displayed like <img
					class="digit"
					src="/images/wrong_position_number.png"
					alt="wrong position number"
				/>.
			</li>
			<li>
				In other cases, it'll displayed like <img
					class="digit"
					src="/images/wrong_number.png"
					alt="wrong number"
				/>.
			</li>
			<li>If your answer is bigger than the correct answer, the frame is pink.</li>
			<img class="numbers" src="/images/bigger.png" alt="bigger" />
			<li>If smaller, the frame turns blue.</li>
			<img class="numbers" src="/images/smaller.png" alt="smaller" />
		</ul>
	</div>
	<button class="button close-button" on:click={closeDispatcher}>CLOSE</button>
</div>

<style lang="scss">
	.button {
		width: min(50%, 150px);
		height: min(5vh, 50px);
		border-radius: 20px;
		border: none;
		font-size: min(2.5vh, 20px);
		font-weight: bold;
		color: #6e6e6e;
		cursor: pointer;
	}
	.text {
		text-align: left;
		.list {
			padding-inline-start: 20px;
		}
		.digit {
			width: 2rem;
		}
		.numbers {
			width: 100%;
		}
	}
</style>
