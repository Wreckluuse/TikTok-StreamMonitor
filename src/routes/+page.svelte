<script>
	//Initializing websocket client
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, afterUpdate, tick } from 'svelte';

	let chatMessages = [];
	let chatElement;
	let evtMessages = [];
	let evtElement;

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
		});

		io.on('evtMessage', (data) => {
			const payload = JSON.parse(data);
			evtMessages = [...evtMessages, payload];
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
	import EvtBox from '../lib/evtBox.svelte/evtBox.svelte';
	import { chatProps, evtProps } from '../lib/stores.js';

	let cProps;
	let eProps;

	chatProps.subscribe((value) => {
		cProps = JSON.parse(value);
	});

	evtProps.subscribe((value) => {
		eProps = JSON.parse(value);
	});

	function openChat() {
		cProps.open = !cProps.open;
	}

	function openEvt() {
		eProps.open = !eProps.open;
	}

	afterUpdate(() => {
		if (chatMessages) scrollToBottom(chatElement);
	});
	$: if (chatMessages && chatElement) {
		scrollToBottom(chatElement);
	}
	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	function isHighlighted(msgBool) {
		if (msgBool) return 'background-sky-500 rounded-sm text-zinc-600';
		else return '';
	}
	function calculateCols(view) {
		let out = 0;
		for (let obj in view) {
			let len = 0;
			for (let i in obj) {
				if (i == true) len += 1;
			}
			if (len >= out) out = len;
		}
		return out;
	}
	let tabCount;
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
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={openEvt}>
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
						class="h-[95%] w-7/8 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
						bind:this={chatElement}
					>
						{#each chatMessages as message}
							<li class={isHighlighted(message.hightlightMsg)}>
								<img
									height="15"
									width="15"
									class="rounded-md inline"
									src={message.profilePictureUrl}
									alt={message.nickname + "'s Profile Picture"}
								/>
								<p class="inline" style:color={message.color}>{' ' + message.nickname}</p>
								<p class="break-words inline text-gray-700 whitespace-normal">
									{': ' + message.msgContent}
								</p>
							</li>
						{/each}
					</ul>
				</ChatBox>
			{/if}
			{#if eProps.open}
				<EvtBox>
					<ul
						class="h-[95%] w-7/8 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
						bind:this={evtElement}
					>
						{#each evtMessages as message, i}
							{#if i % 0 == 1}
								<li
									class={'background-sky-200 ring-2 ring-white/25 grid grid-cols-' +
										eProps.colCount}
								>
									{#if message.type == 'gift' && eProps.view.gift.active == true}
										<p>
											{message.nickname + ' just gifted x' + message.giftCount}<img
												class="inline"
												src={message.icon}
												alt={message.giftType}
												height="25"
												width="25"
											/>{message.giftType + "'s"}
										</p>
										{#if eProps.view.gift.value == true}
											<p>{message.priceValue}</p>
										{/if}
										<p>{message.timeStamp}</p>
									{:else if message.type == 'subscribe' && eProps.view.subs.active == true}
										<p>{message.nickname + ' just subscribed!'}</p>
										{#if eProps.view.subs.recurring == true}
											<p>{'x' + message.months}</p>
										{/if}
										<p>{message.timeStamp}</p>
									{:else if message.type == 'follow' && eProps.view.follows.active == true}
										<p>{message.nickname + ' just followed!'}</p>
										<p>{message.timeStamp}</p>
									{:else if message.type == 'share' && eProps.view.shares.active == true}
										<p>{message.nickname + ' just shared the stream!'}</p>
										<p>{message.timeStamp}</p>
									{/if}
								</li>
							{:else}
								<li
									class={'background-sky-400 ring-2 ring-white/25 grid grid-cols-' +
										eProps.colCount}
								>
									{#if message.type == 'gift' && eProps.view.gift.active == true}
										<p class="inline">
											{message.nickname + ' just gifted x' + message.giftCount}<img
												class="inline"
												src={message.icon}
												alt={message.giftType}
												height="25"
												width="25"
											/>{message.giftType + "'s"}
										</p>
										{#if eProps.view.gift.value == true}
											<p class="inline">{message.priceValue}</p>
										{/if}
										<p class="inline">{message.timeStamp}</p>
									{:else if message.type == 'subscribe' && eProps.view.subs.active == true}
										<p class="inline">{message.nickname + ' just subscribed!'}</p>
										{#if eProps.view.subs.recurring == true}
											<p class="inline">{'x' + message.months}</p>
										{/if}
										<p class="inline">{message.timeStamp}</p>
									{:else if message.type == 'follow' && eProps.view.follows.active == true}
										<p class="inline">{message.nickname + ' just followed!'}</p>
										<p class="inline">{message.timeStamp}</p>
									{:else if message.type == 'share' && eProps.view.shares.active == true}
										<p class="inline">{message.nickname + ' just shared the stream!'}</p>
										<p class="inline">{message.timeStamp}</p>
									{/if}
								</li>
							{/if}
						{/each}
					</ul>
				</EvtBox>
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
