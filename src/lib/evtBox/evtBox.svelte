<script>
	import { giftInfo, subInfo, followInfo, shareInfo } from '../eventStores';
	import { evtposX, evtposY, evtHeight, evtWidth } from '../gridStores';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let settingsOpen = false;
	let localFilters = {
		gifts: false,
		subs: false,
		follows: false,
		shares: false
	};
	let layout = {
		x: 0,
		y: 0,
		h: 0,
		w: 0
	};

	giftInfo.subscribe((value) => {
		localFilters.gifts = value;
	});
	subInfo.subscribe((value) => {
		localFilters.subs = value;
	});
	followInfo.subscribe((value) => {
		localFilters.follows = value;
	});
	shareInfo.subscribe((value) => {
		localFilters.shares = value;
	});
	evtposX.subscribe((value) => {
		layout.x = value;
	});

	evtposY.subscribe((value) => {
		layout.y = value;
	});

	evtHeight.subscribe((value) => {
		layout.h = value;
	});

	evtWidth.subscribe((value) => {
		layout.w = value;
	});

	function toggleSettings() {
		settingsOpen = !settingsOpen;
	}

	function updateFilters() {
		giftInfo.update((visible) => (visible = localFilters.gifts));
		subInfo.update((visible) => (visible = localFilters.subs));
		followInfo.update((visible) => (visible = localFilters.follows));
		shareInfo.update((visible) => (visible = localFilters.shares));
	}
</script>


<div style:grid-column-start={layout.x} style:grid-column-end={layout.w} style:grid-row-start={layout.y} style:grid-row-end={layout.h} class="backdrop-blur-sm bg-white/50 drop-shadow-2xl scroll-auto rounded-lg h-full w-full">

	<p
		class="mx-auto text-center text-zinc-100 text-2xl w-full z-5 ring-2 ring-white/25 ring-inset shadow-2xl rounded-t-lg"
	>
		Events
	</p>

	{#if settingsOpen == true}
		<div
			class="fixed top-[4px] right-[5%] grid grid-cols-5 grid-gap-1 justify-center w-[90%] backdrop-blur-sm bg-white/50 drop-shadow-2xl"
			transition:scale={{ duration: 500, opacity: 1, start: 0.8, easing: quintOut }}
		>
			<div class="text-gray-700 w-max">
				<input type="checkbox" bind:checked={localFilters.gifts} /> Gifts
			</div>
			<div class="text-gray-700 w-max">
				<input type="checkbox" bind:checked={localFilters.subs} /> Subs
			</div>
			<div class="text-gray-700 w-max">
				<input type="checkbox" bind:checked={localFilters.follows} /> Follows
			</div>
			<div class="text-gray-700 w-max">
				<input type="checkbox" bind:checked={localFilters.shares} /> Shares
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={updateFilters}
				class="text-gray-700 w-[100%] text-center bg-zinc-100 rounded-md select-none hover:drop-shadow-xl transition transform hover:-translate-y-1"
			>
				Update Filters
			</div>
		</div>
	{/if}

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={toggleSettings}>
		<i
			class="fixed right-[7px] top-[7px] text-xl ml-[90%] fa-solid fa-filter text-zinc-100 hover:text-gray-500 hover:drop-shadow-xl transition transform hover:-translate-y-1"
		/>
	</div>
		<slot class="shadow-inner scroll-auto overflow-y-scroll overflow-x-hidden text-gray-700" />
</div>
