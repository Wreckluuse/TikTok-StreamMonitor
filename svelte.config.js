import adapter from '@sveltejs/adapter-auto';
import { scss } from 'svelte-preprocess';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';
import preprocess from 'svelte-preprocess/dist/processors/scss.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({

	}),
	kit: {
		adapter: adapter()
	}
};

export default config;
