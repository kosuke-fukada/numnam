<script>
	import { PUBLIC_APP_URL } from '$env/static/public';
	import 'dseg/css/dseg.css';
</script>

<svelte:head>
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

<style lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #070719;
	}
</style>
