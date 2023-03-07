<script>
	//functions for handling username and tiktok connection
	import { writable } from 'svelte/store';

	const messages = writable([]);
	let username;
	let url = 'http://localhost:3000/connect';
	let sseUrl = 'http://localhost:3000/chatStream';

	async function loginPopup() {
		let uName = prompt('<PLACEHOLDER> Please input your username');
		if (uName == null || uName == '') {
			alert('Error: Not a valid username.');
			loginPopup();
		} else {
			username = uName;
			return await submitUname(username, url).then(handleEvents(messages));
		}
	}

	async function submitUname(name, url) {
		let content = {
			name: name
		};
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(content)
		});
	}
	function handleEvents(messages) {
		let evtSource = new EventSource(sseUrl);
		evtSource.onevent = function (event) {
			console.log(event.data);
			var dataobj = JSON.parse(event.data);
			messages.update((arr) => arr.connectToStream(dataobj));
			console.log(event);
		};
	}
	//functions for handling page grid

	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';

	const COLS = 6;

	const id = () => '_' + Math.random().toString(36).substr(2, 9);

	const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

	let items = [];

	const cols = [[1100, 6]];

	// Checks to see if chat box is closed, create new chat box on grid
	function openChat() {
		if (!chatStatus) {
			let newItem = {
				6: gridHelp.item({
					w: 3,
					h: 4,
					x: 0,
					y: 0
				}),
				id: 'chatBox'
			};
			let findOutPosition = gridHelp.findSpace(newItem, items, COLS);

			newItem = {
				...newItem,
				[COLS]: {
					...newItem[COLS],
					...findOutPosition
				}
			};

			items = [...items, ...[newItem]];
			chatStatus = true;
			console.log(items);
		}
	}

	//Function for removing the target item from the grid
	const remove = (item) => {
		items = items.filter((value) => value.id !== item.id);

		if (adjustAfterRemove) {
			items = gridHelp.adjust(items, COLS);
		}
	};

	let adjustAfterRemove = true;
	let chatStatus = false;
</script>

<head>
	<script src="https://kit.fontawesome.com/cda086cfbf.js" crossorigin="anonymous"></script>
</head>

<svelte:head>
	<title>Live Monitor</title>
</svelte:head>

<body>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={loginPopup}>
		<i class="fa-brands fa-tiktok login" />
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={openChat}>
		<i class="openChat fa-solid fa-message" />
	</div>
	<div>
		<i class="fa-solid fa-bell events" />
	</div>
	<div>
		<i class="fa-solid fa-stopwatch timerButton" />
	</div>
	<div>
		<i class="fa-regular fa-rectangle-list settingsButton" />
	</div>
	<div class="h-4/5 w-7/8 mx-auto">
		<Grid Grid bind:items rowHeight={100} let:item let:index let:dataItem {cols} fillSpace={true}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if dataItem.id == 'chatBox'}
				<span
					on:pointerdown={(e) => e.stopPropagation()}
					on:click={() => {
						if (dataItem.id == 'chatBox') {
							if (chatStatus) {
								remove(dataItem);
								chatStatus = false;
							}
						}
					}}
					class="remove"
				>
					<i class="fa-regular fa-circle-xmark" />
				</span>
				<div>{messages}</div>
			{/if}
		</Grid>
	</div>
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
	.openChat {
		position: fixed;
		right: 2%;
		top: 12%;
		color: white;
		height: 50px;
		width: 50px;
		z-index: 2;
	}
	.login {
		position: fixed;
		right: 2%;
		top: 2%;
		color: white;
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	.timerButton {
		position: fixed;
		right: 2%;
		top: 32%;
		color: white;
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	.events {
		position: fixed;
		right: 2%;
		top: 22%;
		color: white;
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	.settingsButton {
		position: fixed;
		right: 2%;
		top: 42%;
		color: white;
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	:global(.svlt-grid-item) {
		background-color: #374151;
		border-radius: 0.5rem;
	}
	:global(.svlt-grid-shadow) {
		background: rgb(104, 104, 104);
		opacity: 0;
	}
	:global(.svlt-grid-resizer) {
		border-color: cyan !important;
	}
	.remove {
		float: right;
		margin-right: 1%;
	}
</style>
