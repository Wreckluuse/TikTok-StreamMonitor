<script>
	//Initializing websocket client
	import { io } from '$lib/webSocketConnection.js';
	import { onMount } from 'svelte';

	let chatMessages = [];

	onMount(() => {
		io.on('connectionSuccessful', () => {
			loggedIn = true;
		});

		io.on('connectionUnsuccessful', () => {
			loggedIn = false;
		});

		io.on('chatMessage', (data) => {
			const payload = JSON.parse(data);
			const messageInfo = {
				username: payload.nickname,
				chat: payload.msgContent,
				profilePic: payload.profilePictureUrl,
				color: payload.color
			};
			chatMessages.push(messageInfo);
		});
	});

	//functions for handling username and tiktok connection

	let username;
	let loggedIn = false;

	async function loginPopup() {
		let uName = prompt('<PLACEHOLDER> Please input your username');
		if (uName == null || uName == '') {
			alert('Error: Not a valid username.');
			loginPopup();
		} else {
			username = uName;
			io.emit('tryConnection', username);
		}
	}

	import Grid from 'svelte-grid-extended';

	const items = [{ id: 'chatBox', x: 0, y: 0, w: 3, h: 6, data: chatMessages }];

	// import { fit, parent_style } from '@leveluptuts/svelte-fit';
	// import Grid from 'svelte-grid';
	// import gridHelp from 'svelte-grid/build/helper/index.mjs';

	// const COLS = 6;

	// const id = () => '_' + Math.random().toString(36).substr(2, 9);

	// const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

	// let items = [];

	// const cols = [[1100, 6]];

	// // Checks to see if chat box is closed, create new chat box on grid
	function openChat() {
		// 	if (!chatStatus) {
		// 		let newItem = {
		// 			6: gridHelp.item({
		// 				w: 3,
		// 				h: 4,
		// 				x: 0,
		// 				y: 0
		// 			}),
		// 			id: 'chatBox',
		// 			msgs: chatMessages
		// 		};
		// 		let findOutPosition = gridHelp.findSpace(newItem, items, COLS);
		// 		newItem = {
		// 			...newItem,
		// 			[COLS]: {
		// 				...newItem[COLS],
		// 				...findOutPosition
		// 			}
		// 		};
		// 		items = [...items, ...[newItem]];
		// 		chatStatus = true;
		// 		console.log(items);
		// 	}
	}

	// //Function for removing the target item from the grid
	// const remove = (item) => {
	// 	items = items.filter((value) => value.id !== item.id);

	// 	if (adjustAfterRemove) {
	// 		items = gridHelp.adjust(items, COLS);
	// 	}
	// };

	// let adjustAfterRemove = true;
	// let chatStatus = false;
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
	<!-- {#if loggedIn} -->
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
	<!-- {/if} -->
	<div class="h-full w-full mx-auto">
		<Grid
			{items}
			cols={12}
			rows={12}
			bounds={true}
			class="grid-container"
			itemClass="grid-item"
			itemActiveClass="grid-item-active"
			itemPreviewClass="rounded"
		>
			{#each items as item}
				{#if (item.id === 'chatBox')}
					<ul>
						{#each item.data as msg}
							<li>
								<img
									height="5"
									width="5"
									src={msg.profilePic}
									alt={msg.username + "'s Profile Picture"}
								/>
								<p>{msg.username}</p>
								{msg.chat}
							</li>
						{/each}
					</ul>
				{/if}
			{/each}
		</Grid>

		<!-- 	<Grid Grid bind:items rowHeight={100} let:item let:index let:dataItem {cols} fillSpace={true}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- {#if dataItem.id == 'chatBox'}
			 <div class="overflow-auto">
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
				<div style={parent_style}>
				<ul class="w-95/100 h-95/100 mt-2 ml-2 overflow-y-hidden overflow-x-hidden scrollbar-thin">
					{#each dataItem.msgs as incMsg}
						<li use:fit={{min_size: 5, max_size:16}}><img class="inline h-5 w-5" src={incMsg.profilePic} alt="user pfp"><p class="inline" style:color = {incMsg.color}>{incMsg.username + ': '}</p>{incMsg.chat}</li>
					{/each}
				</ul>
				</div>
			</div>
			{/if}
		</Grid> -->
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
	:global(.grid-container) {
		opacity: 1;
	}

	:global(.grid-item) {
		background-color: #374151;
		border-radius: 0.5rem;
	}

	:global(.grid-item-active) {
		opacity: 0.8;
	}

	/* tailwind classes */
	/* :global(.bg-red-500) {
		background-color: rgb(202, 33, 33);
	} */

	:global(.rounded) {
		border-radius: 0.25rem;
	}
	/* .remove {
		float: right;
		margin-right: 1%;
	} */
</style>
