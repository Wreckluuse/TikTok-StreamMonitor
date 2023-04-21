import { writable } from 'svelte/store';

export const username = writable('');
export const followCount = writable(0);
export const viewCount = writable(0);
export const loggedIn = writable(false);