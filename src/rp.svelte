<script>
  export let el;
</script>

<rp bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></rp>
