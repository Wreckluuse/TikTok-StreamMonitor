<script>
	import { bind } from 'svelte/internal';
	import { chatProps } from '../stores.js';

	let cProps;
	let chatVariant;

	chatProps.subscribe((value) => {
		cProps = JSON.parse(value);

		switch (cProps.variant) {
			case 'left_full':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-1 col-span-4 row-start-1 row-span-4';
				break;
			case 'right_full':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-9 col-span-4 row-start-1 row-span-4';
				break;
            case 'center_full':
                chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-5 col-span-4 row-start-1 row-span-4';
                break;
			case 'top_left_sq':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-1 col-span-4 row-start-1 row-span-2';
				break;
			case 'top_right_sq':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-9 col-span-4 row-start-1 row-span-2';
				break;
			case 'bottom_left_sq':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-1 col-span-4 row-start-3 row-span-2';
				break;
			case 'bottom_right_sq':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-9 col-span-4 row-start-3 row-span-2';
				break;
			case 'top_wide':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-1 col-span-12 row-start-1 row-span-2';
				break;
			case 'bottom_wide':
				chatVariant =
					'backdrop-blur-sm bg-white/50 shadow-2xl rounded-lg col-start-1 col-span-12 row-start-3 row-span-2';
                break;
		}
	});
</script>

<div class={"scroll-auto" + chatVariant}>
    <p class="mx-auto text-center text-zinc-100 text-2xl w-full shadow-bottom-2xl rounded-t-lg">Chat</p>
	<slot />
</div>
