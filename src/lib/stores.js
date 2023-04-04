import { writable } from "svelte/store";
import { chatLayouts } from "./gridSchema";

let chatLayout = chatLayouts.left_full;
let evtLayout = chatLayouts.right_full;



export const chatProps = writable(JSON.stringify({
    open: false,
    variant: chatLayout
}
));

export const evtProps = writable(JSON.stringify({
    open: false,
    variant: evtLayout,
    view: {
        gift: {
            active: true,
            value: true,
            time: true,
        },
        subs: {
            active: false,
            recurring: true,
        },
        follows: { active: false },
        shares: { active: false },
        
    },
}
))

