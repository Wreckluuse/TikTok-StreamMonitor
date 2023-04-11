<script>
	//Initializing websocket client
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, afterUpdate, tick } from 'svelte';
	import ContentGrid from '../lib/contentGrid/contentGrid.svelte';
	import Nav from '../lib/nav/nav.svelte';
	import ChatBox from '../lib/chatBox/chatBox.svelte';
	import EvtBox from '../lib/evtBox.svelte/evtBox.svelte';
	import {
		chatProps,
		evtProps,
		username,
		viewCount,
		loggedIn,
		followCount
	} from '../lib/stores.js';

	let chatMessages = [];
	let chatElement;
	let evtMessages = [];
	let evtElement;

	onMount(() => {
		io.on('connectionSuccessful', () => {
			loggedIn.update((prop) => (prop = true));
		});

		io.on('connectionUnsuccessful', () => {
			loggedIn.update((prop) => (prop = false));
		});

		io.on('updateInfo', (data) => {
			const payload = JSON.parse(data);
			viewCount.update((n) => (n = payload.viewers));
			username.update((name) => (name = payload.streamerName));
			loggedIn.update((p) => (p = true));
		})

		io.on('chatMessage', (data) => {
			const payload = JSON.parse(data);
			chatMessages = [...chatMessages, payload];
		});

		io.on('evtMessage', (data) => {
			const payload = JSON.parse(data);
			evtMessages = [...evtMessages, payload];
		});

		io.on('dcSuccess', () => {
			loggedIn.update((prop) => (prop = false));
			chatMessages = [];
			evtMessages = [];
		});

	});

	//functions for handling username and tiktok connection

	async function loginPopup() {
		let uName = prompt('<PLACEHOLDER> Please input your username');
		if (uName == null || uName == '') {
			alert('Error: Not a valid username.');
		} else {
			username.update((prop) => (prop = uName));
			io.emit('tryConnection', uName);
		}
	}

	//Main Content

	let cProps;
	let eProps;
	let uname;
	let followers;
	let viewers;
	let loggedInState;

	username.subscribe((value) => {
		uname = value;
	});

	viewCount.subscribe((value) => {
		viewers = value;
	});

	followCount.subscribe((value) => {
		followers = value;
	});

	loggedIn.subscribe((value) => {
		loggedInState = value;
	});

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
		if (cProps.open && chatMessages.length > 0) scrollToBottom(chatElement);
		if (eProps.open && evtMessages.length > 0) scrollToBottom(evtElement);
	});

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	function isHighlighted(msgBool) {
		if (msgBool) return 'background-sky-500 rounded-sm text-zinc-600';
		else return '';
	}

	function evtCols(schema) {
		eProps.view.gift.cols = currentCols(schema.gift);
		eProps.view.subs.cols = currentCols(schema.subs);
		eProps.view.follows.cols = currentCols(schema.follows);
		eProps.view.shares.cols = currentCols(schema.shares);
	}

	function currentCols(obj) {
		let count = 0;
		for (let item in obj) {
			if (item === true) count++;
		}
		return count;
	}

	let localColStates = {
		gifts: eProps.view.gift.colCount,
		subs: eProps.view.subs.colCount,
		follows: eProps.view.follows.colCount,
		shares: eProps.view.shares.colCount
	};

	$: if (chatMessages.length > 0 && chatElement) {
		scrollToBottom(chatElement);
	}
	$: if (evtMessages.length > 0 && evtElement) {
		scrollToBottom(evtElement);
	}

	function disconnect() {
		io.emit('beginDC');
	}

	let listClasses = {
		gift: 'background-sky-200 ring-2 h-[10%] grid grid-cols-2 text-justify ring-white/25 ',
		sub: 'background-sky-200 ring-2 h-[10%] grid grid-cols-2 text-justify ring-white/25 ',
		follow: 'background-sky-200 ring-2 h-[10%] grid grid-cols-2 text-justify ring-white/25 ',
		share: 'background-sky-200 ring-2 h-[10%] grid grid-cols-2 text-justify ring-white/25 '
	};

</script>

<head>
	<script src="https://kit.fontawesome.com/cda086cfbf.js" crossorigin="anonymous"></script>
</head>

<svelte:head>
	<title>Live Monitor</title>
</svelte:head>

<body>
	{#if loggedInState}
		<div
			class="mt-5 ml-[5%] fixed backdrop-blur-sm bg-white/50 shadow-2xl rounded-md grid grid-rows-auto grid-gap-2 h-auto w-fit ring-sky-100 px-5 pb-2 text-gray-700"
		>
			<div>
				<div name="inline currentStreamer">
					<p class="inline">Live:</p>
					{'@' + uname}
				</div>
			</div>
			<div>
				<div name="viewCount inline">
					<p class="inline">Viewers:</p>
					{viewers}
				</div>
			</div>
			<div>
				<button on:click={disconnect} class="rounded-md bg-sky-200 w-[40%] ml-[30%] mr-[30%] mt-5"
					>Logout</button
				>
			</div>
		</div>
	{:else}
		<div
			class="mt-5 ml-[2%] fixed backdrop-blur-sm bg-white/50 shadow-2xl h-[10%] w-[20%] ring-sky-100 text-gray-700 rounded-md "
		>
		<p class="text-center mt-5">
			Stream disconnected
		</p>
		</div>
	{/if}
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
						class="h-[90%] w-[98%] overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
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
						class="h-[90%] w-[98%] text-gray-700 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
						bind:this={evtElement}
					>
						{#each evtMessages as message, i}
							{#if i % 0 == 1}
								{#if message.type == 'gift' && eProps.view.gift.active == true}
									<li class={listClasses.gift}>
										<p>
											{message.nickname + ' just gifted x' + message.giftCount}
											{message.giftType + "'s "}<img
												class="inline"
												src={message.icon}
												alt={message.giftType}
												height="25"
												width="25"
											/>
										</p>
										<div
											class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-1  ring ring-gap-2 rounded-lg"
										>
											{#if eProps.view.gift.value == true}
												<p>{message.priceValue}</p>
											{/if}
											<p class="inline">{message.timeStamp}</p>
										</div>
									</li>
								{:else if message.type == 'subscribe' && eProps.view.subs.active == true}
									<li class={listClasses.sub}>
										<p>{message.nickname + ' just subscribed!'}</p>
										{#if eProps.view.subs.recurring == true}
											<p>{'x' + message.months}</p>
										{/if}
										<div
											class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
										>
											<p>{message.timeStamp}</p>
										</div>
									</li>
								{:else if message.type == 'follow' && eProps.view.follows.active == true}
									<li class={listClasses.follow}>
										<p>{message.nickname + ' just followed!'}</p>
										<div
											class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
										>
											<p>{message.timeStamp}</p>
										</div>
									</li>
								{:else if message.type == 'share' && eProps.view.shares.active == true}
									<li class={listClasses.share}>
										<p>{message.nickname + ' just shared the stream!'}</p>
										<div
											class="inline w-[50%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
										>
											<p>{message.timeStamp}</p>
										</div>
									</li>
								{/if}
							{:else if message.type == 'gift' && eProps.view.gift.active == true}
								<li class={listClasses.gift}>
									<p class="inline">
										{message.nickname + ' just gifted x' + message.giftCount}
										{message.giftType + "'s"}<img
											class="inline"
											src={message.icon}
											alt={message.giftType}
											height="25"
											width="25"
										/>
									</p>
									<div
										class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
									>
										{#if eProps.view.gift.value == true}
											<p class="inline">{message.priceValue}</p>
										{/if}
										<p class="inline">{message.timeStamp}</p>
									</div>
								</li>
							{:else if message.type == 'subscribe' && eProps.view.subs.active == true}
								<li class="listClasses.sub}">
									<p class="inline">{message.nickname + ' just subscribed!'}</p>
									<div
										class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
									>
										{#if eProps.view.subs.recurring == true}
											<p class="inline">{'x' + message.months}</p>
										{/if}
										<p class="inline">{message.timeStamp}</p>
									</div>
								</li>
							{:else if message.type == 'follow' && eProps.view.follows.active == true}
								<li class={listClasses.follow}>
									<p class="inline">{message.nickname + ' just followed!'}</p>
									<div
										class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
									>
										<p class="inline">{message.timeStamp}</p>
									</div>
								</li>
							{:else if message.type == 'share' && eProps.view.shares.active == true}
								<li class={listClasses.share}>
									<p class="inline">{message.nickname + ' just shared the stream!'}</p>
									<div
										class="inline w-[30%] h-[90%] grid grid-rows-auto grid-gap-2  ring ring-gap-2 rounded-lg"
									>
										<p class="inline">{message.timeStamp}</p>
									</div>
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
