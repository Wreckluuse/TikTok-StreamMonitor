<script>
	//Initializing websocket client
	import { io } from '$lib/webSocketConnection.js';
	import { onMount, afterUpdate, tick } from 'svelte';
	import ContentGrid from '../lib/contentGrid/contentGrid.svelte';
	import Nav from '../lib/nav/nav.svelte';
	import ChatBox from '../lib/chatBox/chatBox.svelte';
	import { modColor, subColor, defaultColor } from '../lib/chatStores';
	import { evtOpen, giftInfo, subInfo, followInfo, shareInfo } from '../lib/eventStores';
	import { username, followCount, viewCount, loggedIn } from '../lib/userStores';
	import EvtBox from '../lib/evtBox/evtBox.svelte';
	import Modal from '../lib/modal/modal.svelte';
	import ChatMessage from '../lib/chatMessage/chatMessage.svelte';

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
		});

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

	function loginPopup() {
		let uName = prompt('<PLACEHOLDER> Please input your username');
		if (uName == null || uName == '') {
			alert('Error: Not a valid username.');
		} else {
			username.update((prop) => (prop = uName));
			io.emit('tryConnection', uName);
		}
	}

	//Main Content

	let uname;
	let followers;
	let viewers;
	let loggedInState;
	let cboxOpen = false;
	let eboxOpen = false;
	let settingsboxOpen = false;
	let mColor;
	let sColor;
	let dColor;
	let displayGifts;
	let displaySubs;
	let displayFollows;
	let displayShares;
	let showModal = false;
	let modalNickname = '';
	let modalPfp = '';
	let modalFollowCount = 0;
	let modalColor = '#9ca3af;';
	let modalBio = '';
	let modal_createDate = '0';

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

	giftInfo.subscribe((value) => {
		displayGifts = value;
	});

	subInfo.subscribe((value) => {
		displaySubs = value;
	});

	followInfo.subscribe((value) => {
		displayFollows = value;
	});

	shareInfo.subscribe((value) => {
		displayShares = value;
	});

	defaultColor.subscribe((value) => {
		dColor = value;
	});

	modColor.subscribe((value) => {
		mColor = value;
	});

	subColor.subscribe((value) => {
		sColor = value;
	});

	function getViewerColor(roles) {
		let outColor;
		let outRole;

		for (let i = 0; i < roles.length; i++) {
			if (roles[i].value == true) {
				outRole = roles[i].role;
				break;
			}
		}

		switch (outRole) {
			case 'mod':
				outColor = mColor;
				break;
			case 'sub':
				outColor = sColor;
				break;
			case 'follower':
				outColor = dColor;
				break;
			default:
				outColor = dColor;
		}

		return outColor;
	}

	function openChat() {
		cboxOpen = !cboxOpen;
	}

	function openEvt() {
		eboxOpen = !eboxOpen;
	}

	function openCfg() {
		settingsboxOpen = !settingsboxOpen;
	}

	function openModal(name, pfp, fCount, color, bio, createDate) {
		showModal = true;
		modalNickname = name;
		modalPfp = pfp;
		modalFollowCount = fCount;
		modalColor = color;
		modalBio = bio;
		modal_createDate = createDate;
	}

	afterUpdate(() => {
		if (cboxOpen && chatMessages.length > 0) scrollToBottom(chatElement);
		if (eboxOpen && evtMessages.length > 0) scrollToBottom(evtElement);
	});

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	function isHighlighted(msgBool) {
		if (msgBool) return 'background-sky-500 rounded-sm text-zinc-600';
		else return '';
	}

	$: if (chatMessages.length > 0 && chatElement) {
		scrollToBottom(chatElement);
	}
	$: if (evtMessages.length > 0 && evtElement) {
		scrollToBottom(evtElement);
	}

	function disconnect() {
		io.emit('beginDC');
	}

</script>

<head>
	<script src="https://kit.fontawesome.com/cda086cfbf.js" crossorigin="anonymous"></script>
</head>

<svelte:head>
	<title>Live Monitor</title>
</svelte:head>

<body class="bg-base-100">
	<Modal
		{modalNickname}
		{modalPfp}
		{modalColor}
		{modalFollowCount}
		{modalBio}
		{modal_createDate}
		bind:showModal
	/>

	<!-- {#if loggedInState} -->
		<!-- <div -->
			<!-- class="overflow-y-hidden bg-info stats-vertical mt-5 ml-[5%] fixed backdrop-blur-sm shadow-2xl rounded-md grid grid-rows-auto grid-gap-2 h-[7%] w-[15%] px-5 pb-2" -->
		<!-- > -->
			<!-- <div class="stat h-[50%]"> -->
				<!-- <div name=" inline currentStreamer h-[50%]"> -->
					<!-- <p class="inline text-sm">Live:</p> -->
					<!-- {'@' + uname} -->
				<!-- </div> -->
			<!-- </div> -->
			<!-- <div class="stat h-[50%]"> -->
				<!-- <div name="viewCount inline h-[50%]"> -->
					<!-- <p class="inline text-sm">Viewers:</p> -->
					<!-- {viewers} -->
				<!-- </div> -->
			<!-- </div> -->
		<!-- </div> -->
	<!-- {:else} -->
		<!-- <div -->
			<!-- class="mt-5 ml-[2%] fixed backdrop-blur-sm bg-info shadow-2xl h-[10%] w-[15%] rounded-md " -->
		<!-- > -->
			<!-- <p class="text-center mt-5">Stream disconnected</p> -->
		<!-- </div> -->
	<!-- {/if} -->
	<Nav>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="bg-neutral pt-2 pb=2 hover:shadow-inner-2xl hover:active w-full h-full" on:click={loginPopup}>
			<i
				class="fa-brands text-zinc-100 fa-tiktok login hover:text-accent hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="bg-neutral pt-2 pb=2 hover:shadow-inner-2xl hover:active w-full h-full" on:click={openChat}>
			<i
				class="openChat text-primary  fa-solid fa-message hover:text-accent  hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="bg-neutral pt-2 pb=2 hover:shadow-inner-2xl hover:active w-full h-full" on:click={openEvt}>
			<i
				class="fa-regular  text-secondary fa-bell events hover:text-accent  hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</button>
		<button class="bg-neutral pt-2 pb=2 hover:shadow-inner-2xl w-full h-full hover:active">
			<i
				class="fa-solid text-yellow-400  fa-stopwatch timerButton hover:text-accent  hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</button>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="bg-neutral pt-2 pb=2 hover:shadow-inner-2xl hover:active w-full h-full" on:click={openCfg}>
			<i
				class="fa-regular text-gray-300 fa-solid fa-gear settingsButton hover:text-accent  hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</button>
	</Nav>
	{#if settingsboxOpen}
		<div
			class="top-5 pt-2 right-7 fixed backdrop-blur-sm bg-white/50 shadow-2xl rounded-md h-min  w-[20%] ring-sky-100 px-5 pb-2 text-gray-700"
		>
			<div class="grid grid-rows-auto gap-2 w-[30%] h-[98%]">
				<button class="btn text-gray-500 btn-primary btn-xs"> Chat </button>
				<button class="btn text-gray-500 btn-accent btn-xs"> Events </button>
				<button class="btn text-gray-500 btn-success btn-xs"> Timer </button>
			</div>
			<div class="fixed right-4 top-1 h-[90%] w-[60%] right-2 grid grid-rows-2 grid-cols-2 gap-1">
				<div class="bg-gray-300 rounded-sm" />
				<div class="bg-gray-300 rounded-sm" />
				<div class="bg-gray-300 rounded-sm" />
				<div class="bg-gray-300 rounded-sm" />
			</div>
		</div>
	{/if}
	<div class="h-[90%] w-7/8 ml-4 mr-4">
		<ContentGrid>
			{#if cboxOpen}
				<ChatBox>
					<div
						bind:this={chatElement}
						class="overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2 h-[90%] w-[98%] mt-2"
					>
						<table class="table-normal h-full w-full">
							<!-- <ul
						class="list-outside h-[90%] w-[98%] mt-2 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
						bind:this={chatElement}
					> -->
							{#each chatMessages as message}
								<ChatMessage
									chat_pfpUrl={message.profilePictureUrl}
									chat_nickname={message.nickname}
									chat_roles={message.roles}
									chat_messageContent={message.msgContent}
									chat_timeStamp={message.timeStamp}
									chat_badges={message.badges}
								/>

							{/each}
						</table>
					</div>
					<!-- </ul> -->
				</ChatBox>
			{/if}
			{#if eboxOpen}
				<EvtBox>
					<ul
						class="divide-y divide-solid mt-2 h-[90%] w-[98%] text-base-content overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-gray-900 scrollbar-track-gray-100 ml-2"
						bind:this={evtElement}
					>
						{#each evtMessages as message, i}
							{#if message.type == 'gift' && displayGifts == true}
								<li class="grid grid-cols-7 mx-5% w-[95%] h-[7%] rounded-md">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										on:click={openModal(
											message.nickname,
											message.profilePictureUrl,
											message.followCount,
											getViewerColor(message.roles)
										)}
										style={'background-image: url(' + message.profilePictureUrl + ')'}
										class="w-[30%] h-[80%] mt-1 transition transform hover:-translate-y-[1px] shadow-2xl bg-cover bg-center col-start-1 col-end-3 rounded-lg bg-zinc-100 text-primary-content ml-2 grid grid-cols-3 grid-rows-"
									/>
									<div class="w-full col-start-3 col-end-7 text-left float-left">
										<p>
											{message.nickname + ' just gifted x' + message.giftCount}
											{message.giftType + "'s "}<img
												class="inline"
												src={message.icon}
												alt={message.giftType}
												height="25"
												width="25"
											/>
											{' (' + message.priceValue + ')'}
										</p>
									</div>
									<div class="col-start-7 col-end-7 text-right float-right mr-5">
										{message.timeStamp}
									</div>
								</li>
							{:else if message.type == 'subscribe' && displaySubs == true}
								<li class="grid grid-cols-7 mx-5% w-[95%] h-[6%] rounded-md">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										on:click={openModal(
											message.nickname,
											message.profilePictureUrl,
											message.followCount,
											message.color
										)}
										style={'background-image: url(' + message.profilePictureUrl + ')'}
										class="w-[30%] h-[80%] mt-1 transition transform hover:-translate-y-[1px] shadow-2xl bg-cover bg-center col-start-1 col-end-3 rounded-lg bg-zinc-100 text-primary-content ml-2 grid grid-cols-3 grid-rows-"
									/>
									<div class="w-full col-start-3 col-end-7 text-left float-left">
										<p>
											{message.nickname +
												' just subscribed! (x' +
												message.months +
												' month streak)'}
										</p>
									</div>
									<div class="col-start-7 col-end-7 text-right float-right mr-5">
										{message.timeStamp}
									</div>
								</li>
							{:else if message.type == 'follow' && displayFollows == true}
								<li class="grid grid-cols-7 mx-5% w-[95%] h-[6%] rounded-md">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										on:click={openModal(
											message.nickname,
											message.profilePictureUrl,
											message.followCount,
											message.color
										)}
										style={'background-image: url(' + message.profilePictureUrl + ')'}
										class="w-[30%] h-[80%] mt-1 transition transform hover:-translate-y-[1px] shadow-2xl bg-cover bg-center col-start-1 col-end-3 rounded-lg bg-zinc-100 text-primary-content ml-2 grid grid-cols-3 grid-rows-"
									/>
									<div class="w-full col-start-3 col-end-7 text-left float-left">
										<p>{message.nickname + ' just followed!'}</p>
									</div>
									<div class="col-start-7 col-end-7 text-right float-right mr-5">
										{message.timeStamp}
									</div>
								</li>
							{:else if message.type == 'share' && displayShares == true}
								<li class="grid grid-cols-7 mx-5% w-[95%] h-[6%] rounded-md">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										on:click={openModal(
											message.nickname,
											message.profilePictureUrl,
											message.followCount,
											message.color
										)}
										style={'background-image: url(' + message.profilePictureUrl + ')'}
										class="w-[30%] h-[80%] mt-1 transition transform hover:-translate-y-[1px] shadow-2xl bg-cover bg-center col-start-1 col-end-3 rounded-lg bg-zinc-100 text-primary-content ml-2 grid grid-cols-3 grid-rows-"
									/>
									<div class="w-full col-start-3 col-end-7 text-left float-left">
										<p>{message.nickname + ' just shared the stream!'}</p>
									</div>
									<div class="col-start-7 col-end-7 text-right float-right mr-5">
										{message.timeStamp}
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
		/*background: rgb(230, 252, 255);
		background: radial-gradient(
			circle,
			rgba(230, 252, 255, 1) 0%,
			rgba(46, 255, 253, 1) 5%,
			rgba(38, 38, 38, 1) 100%
		); */
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
