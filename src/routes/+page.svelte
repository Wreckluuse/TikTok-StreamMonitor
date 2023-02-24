<script>
	import Navigation from '../lib/Navigation.svelte';
</script>

<svelte:head>
	<title>Live Monitor</title>
</svelte:head>

<body>
	<Navigation />
</body>

<style>
	body {
		position: fixed;
		margin: 0;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgb(255, 255, 255);
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgb(144, 253, 123) 48%,
			rgb(0, 0, 0) 98%
		);
	}
</style>
