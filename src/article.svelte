<script>
  export let el;
</script>

<article bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></article>
