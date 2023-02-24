<script>
</script>

<div class="navContainer" />
<div class="settings">
	<div class="settingsButton" id="iconP1" />
	<div class="settingsButton" id="iconP2" />
	<div class="tooth disableBlur" />
</div>

<style lang="scss">
	.navContainer {
		position: fixed;
		top: -3%;
		left: -1%;
		height: 10vh;
		width: 10vh;
		border-radius: 50%;
		filter: blur(2px);
		background-color: rgba(176, 176, 176, 0.7);
		z-index: 1;
	}
	.settings {
		position: fixed;
		top: 1%;
		left: 1%;
		height: 2%;
		width: 2%;
		background-color: white;
		z-index: 2;
	}
</style>
