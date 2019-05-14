<script>
  export let el;
</script>

<noscript bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></noscript>
