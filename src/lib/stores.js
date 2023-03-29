import { writable } from "svelte/store";

export const chatProps = writable(JSON.stringify({
    open: false,
    variant: 'left_full'
}

))