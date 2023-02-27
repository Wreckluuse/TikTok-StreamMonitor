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
		background: rgb(0, 0, 0);
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(155, 229, 255, 1) 35%,
			rgba(255, 255, 255, 1) 46%,
			rgba(255, 255, 255, 1) 50%,
			rgba(255, 255, 255, 1) 54%,
			rgba(155, 229, 255, 1) 65%,
			rgba(0, 0, 0, 1) 100%
		);
	}
</style>
