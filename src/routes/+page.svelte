<script>
	//Initializing websocket client
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, afterUpdate, tick } from 'svelte';

	let chatMessages = [];
	let element;

	onMount(() => {
		io.on('connectionSuccessful', () => {
			loggedIn = true;
		});

		io.on('connectionUnsuccessful', () => {
			loggedIn = false;
		});

		io.on('chatMessage', (data) => {
			const payload = JSON.parse(data);
			chatMessages = [...chatMessages, payload];
			scrollToBottom();
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

	//Main Content

	import ContentGrid from '../lib/contentGrid/contentGrid.svelte';
	import Nav from '../lib/nav/nav.svelte';
	import ChatBox from '../lib/chatBox/chatBox.svelte';
	import { chatProps } from '../lib/stores.js';

	let cProps;
	chatProps.subscribe((value) => {
		cProps = JSON.parse(value);
	});

	console.info(chatProps);
	console.info(cProps);
	function openChat() {
		cProps.open = !cProps.open;
	}
	afterUpdate(() => {
		console.log('afterUpdate');
		if (chatMessages) scrollToBottom(element);
	});
	$: if (chatMessages && element) {
		console.log('tick');
		scrollToBottom(element);
	}
	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<head>
	<script src="https://kit.fontawesome.com/cda086cfbf.js" crossorigin="anonymous"></script>
</head>

<svelte:head>
	<title>Live Monitor</title>
</svelte:head>

<body>
	<Nav>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={loginPopup}>
			<i
				class="fa-brands text-zinc-100 fa-tiktok login hover:text-gray-500 hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={openChat}>
			<i
				class="openChat text-zinc-100  fa-solid fa-message hover:text-gray-500 hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</div>
		<div>
			<i
				class="fa-regular  text-zinc-100 fa-bell events hover:text-gray-500 hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</div>
		<div>
			<i
				class="fa-solid text-zinc-100  fa-stopwatch timerButton hover:text-gray-500 hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</div>
		<div>
			<i
				class="fa-regular text-zinc-100  fa-rectangle-list settingsButton hover:text-gray-500 hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</div>
	</Nav>

	<div class="h-5/6 w-7/8 ml-4 mr-4">
		<ContentGrid>
			{#if cProps.open}
				<ChatBox>
					<ul
						class="overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
						bind:this={element}
					>
						{#each chatMessages as message}
							<li>
								<img
									height="12"
									width="12"
									class="rounded-md inline"
									src={message.profilePictureUrl}
									alt={message.nickname + "'s Profile Picture"}
								/>
								<p class="inline" style:color={message.color}>{' ' + message.nickname}</p>
								<p class="break-words inline text-gray-500 whitespace-normal">
									{': ' + message.msgContent}
								</p>
							</li>
						{/each}
					</ul>
				</ChatBox>
			{/if}
		</ContentGrid>
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
		background: rgb(230, 252, 255);
		background: radial-gradient(
			circle,
			rgba(230, 252, 255, 1) 0%,
			rgba(46, 255, 253, 1) 5%,
			rgba(38, 38, 38, 1) 100%
		);
	}
	.openChat {
		height: 50px;
		width: 50px;
		z-index: 2;
	}
	.login {
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	.timerButton {
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	.events {
		height: 50px;
		width: 50px;
		z-index: 2;
	}

	.settingsButton {
		height: 50px;
		width: 50px;
		z-index: 2;
	}
</style>
