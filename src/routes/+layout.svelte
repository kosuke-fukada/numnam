<script>
	import 'dseg/css/dseg.css';
</script>

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
