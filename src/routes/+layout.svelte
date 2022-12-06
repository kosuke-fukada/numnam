<svelte:head>
	<link href="../../node_modules/dseg/css/dseg.css" rel="stylesheet" />
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
