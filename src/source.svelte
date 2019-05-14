<script>
  export let el;
</script>

<source bind:this={el} on:focus on:blur on:keypress on:click {...$$props} />
