<script>

	import { chatposX, chatposY, chatHeight, chatWidth } from '../gridStores';
	let layout = {
		x: 1,
		y: 1,
		h: 2,
		w: 11
	};

		chatposX.subscribe((value) => {
			layout.x = value;
		});

		chatposY.subscribe((value) => {
			layout.y = value;
		});

		chatHeight.subscribe((value) => {
			layout.h = value;
		});

		chatWidth.subscribe((value) => {
			layout.w = value;
		});
	
</script>

<div style:grid-column-start={layout.x} style:grid-column-end={layout.w} style:grid-row-start={layout.y} style:grid-row-end={layout.h} class="backdrop-blur-sm bg-white/50 drop-shadow-2xl scroll-auto rounded-lg h-full w-full">
	<p
		class="mx-auto text-center text-zinc-100 text-2xl w-full z-5 ring-2 ring-white/25 ring-inset shadow-2xl rounded-t-lg"
	>
		Chat
	</p>
	<slot class="shadow-inner overflow-y-scroll overflow-x-hidden" />
</div>
