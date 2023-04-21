import { writable } from "svelte/store";
import { chatLayouts } from "./gridStores";

let chatLayout = chatLayouts.left_full;
let evtLayout = chatLayouts.right_full;

export const username = writable('');
export const followCount = writable(0);
export const viewCount = writable(0);
export const loggedIn = writable(false);
export const chatPosition = writable(chatLayout);


export const chatProps = writable(JSON.stringify({
    open: false,
    variant: chatLayout
}));

export const evtProps = writable(JSON.stringify({
    open: false,
    variant: evtLayout,
    view: {
        gift: {
            active: true,
            value: true,
            time: true,
            cols: 0
        },
        subs: {
            active: false,
            recurring: true,
            cols: 0
        },
        follows: {
            active: false,
            cols: 2
        },
        shares: {
            active: false,
            cols: 2
        },

    },
}
)
)

