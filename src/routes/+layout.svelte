<script>
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import 'dseg/css/dseg.css';
	import { onMount } from 'svelte';

	let mounted = false;

	const toastOptions = {
		theme: {
			'--toastBarHeight': 0
		},
		intro: {
			y: -200
		},
		dismissable: false
	};

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-RSBXZ7T5MH"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-RSBXZ7T5MH');
	</script>
	<title>Numnam | Guess what the number is.</title>
	<meta name="description" content="Numnam is a five-digit number guessing game." />
	<meta property="og:title" content="Numnam | Guess what the number is." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={PUBLIC_APP_URL} />
	<meta property="og:description" content="Numnam is a five-digit number guessing game." />
	<meta property="og:image" content="{PUBLIC_APP_URL}/images/ogp.png" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container">
	<slot />
</div>

{#if mounted}
	<SvelteToast options={toastOptions} />
{/if}

<style lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		height: 100dvh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #070719;
	}
	:root {
		--toastContainerRight: auto;
		--toastContainerLeft: calc(50vw - 8rem);
	}
</style>
