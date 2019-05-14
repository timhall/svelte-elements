<script>
  export let el;
</script>

<u bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></u>
