<script>
    import { evtProps } from "../stores";

    let eProps;
    let evtVariant;

    evtProps.subscribe((value) => {
        eProps = JSON.parse(value);
        evtVariant = eProps.variant;
    })
</script>
<div class={"backdrop-blur-sm bg-white/50 drop-shadow-2xl scroll-auto rounded-lg  " + evtVariant}>
    <p class="mx-auto text-center text-zinc-100 text-2xl w-full z-5 ring-2 ring-white/25 ring-inset shadow-2xl rounded-t-lg">Events</p>
    <slot class="shadow-inner overflow-y-scroll overflow-x-hidden text-gray-700" />
</div>