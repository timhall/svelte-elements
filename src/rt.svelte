<script>
  export let el;
</script>

<rt bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></rt>
