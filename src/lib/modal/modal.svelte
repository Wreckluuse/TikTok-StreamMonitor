<script> import { fade, fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	export let showModal;
	export let modalNickname;
	export let modalPfp;
	export let modalFollowCount;
	export let modalColor;
	export let modalBio;
	export let modal_createDate;

	let dialog;

	$: if (dialog && showModal) dialog.showModal();
</script>
<input type="checkbox" id="modal" class="modal-toggle">
<!-- 
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!--<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
<div class="z-10 card bg-primary shadow-xl">

</div>
	<div class="grid grid-cols-12 grid-rows-12 h-full w-full gap-none">
	<div class="h-full w-full text-center col-start-1 col-end-13 row-start-1 row-end-3">
		<div
			class="text-lg text-gray-700 rounded-t-md text-center"
			style:background-color={modalColor}
			name="nickname"
		>
			{modalNickname}
		</div>
		<div class="fixed top-[2px] right-[2px] h-fit w-fit" on:click={dialog.close()}>
			<i
				class="fa-solid fa-xmark text-red-500 text-lg hover:text-red-600 hover:drop-shadow-xl transition transform hover:-translate-y-1"
			/>
		</div>
	</div>
	<div class="h-fit w-fit col-start-1 col-end-4 row-start-3 row-end-6">
		<div
			class="h-[80px] w-[100px] avatar bg-center bg-cover rounded-md "
			style={'background-image: url(' + modalPfp + ');'}
		/>
	</div>
	<div class="text-center text-gray-700 col-start-5 col-end-9">
		<p class="float-left text-left">Bio:</p>
		{modalBio}
	</div>
	 <div class="text-center text-zinc-100 col-start-5 col-end-9 row-start-" name="followCount">
		{'Followers: ' + modalFollowCount}
	</div>
	<div class="bg-sky-200 text-gray-700 rounded-b-md text-center col-start-1 col-end-13 row-start-6 row-end-9 w-full h-full">
		<a target="_blank" rel="noreferrer" href={'https://TikTok.com/@' + modalNickname}
			><div name="visitProfile">View Profile</div></a
		>
	</div>
	<div class="col-start-1 col-end-6 row-start-9 row-end-12">
		{"Followers: " + modalFollowCount}
	</div>
	<div class="col-start-6 col-end-13 row-start-9 row-end-12">
		{"Account created: " + modal_createDate}
	</div>
	</div>
</dialog>

<style>
	 dialog {
		height: 25vh;
		width: 25vw;
	} 
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.6);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style> -->
