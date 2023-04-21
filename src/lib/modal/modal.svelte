<script>
	import { fade, fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	export let showModal;
	export let modalNickname;
	export let modalPfp;
	export let modalFollowCount;
	export let modalColor;
	export let modalBadges;

	let dialog;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	transition:fade={{duration:250, easing: quintInOut}}
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
		<div
		style={'background-image: url(' + modalPfp + ')'}
		style:background-color={modalColor}
		class="w-full h-full bg-cover bg-center grid grid-cols-2 gap-2 grid-rows-3 bg-gray-400 z10 rounded-md">
			<div
				class="col-start-1 col-end-1 row-start-1 row-end-3 bg-cover bg-center w-[90%]"
				name="pfp"
			/>
			<div class="col-start-2 col-end-2 row-start-1 row-end-1" name="nickname">{modalNickname}</div>
			<div class="col-start-2 col-end-2 row-start-2 row-end-2" name="followCount">
				{modalFollowCount}
			</div>
			<a target="_blank" rel="noreferrer" href={'https://TikTok.com/@' + modalNickname}
				><div
					class="col-start-2 col-end-2 row-start-3 row-end-3 radius-full bg-zinc-100 text-gray-700"
					name="visitProfile"
				>
					View Profile
				</div></a
			>
			<div class="fixed top-[2px] right-[2px] h-fit w-fit" on:click={dialog.close()}>
				<i
					class="fa-solid fa-xmark text-red-500 text-lg hover:text-red-600 hover:drop-shadow-xl transition transform hover:-translate-y-1"
				/>
			</div>
		</div>
</dialog>

<style>

	dialog {
		height: 20vh;
		width: 20vw;
		background-color: #9ca3af;
		border-radius: 7px;
	}
		dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
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
</style>
