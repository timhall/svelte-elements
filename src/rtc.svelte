<script>
  export let el;
</script>

<rtc bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></rtc>
