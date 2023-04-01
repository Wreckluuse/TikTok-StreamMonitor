<script>
	import { chatProps } from '../stores.js';

	let cProps;
	let chatVariant;

	chatProps.subscribe((value) => {
		cProps = JSON.parse(value);
		chatVariant = cProps.variant;
	});
</script>

<div class={"backdrop-blur-sm bg-white/50 drop-shadow-2xl scroll-auto rounded-lg " + chatVariant}>
    <p class="mx-auto text-center text-zinc-100 text-2xl w-full z-5 ring-2 ring-white/25 ring-inset shadow-2xl rounded-t-lg">Chat</p>
	<slot class="shadow-inner overflow-y-scroll overflow-x-hidden" />
</div>
