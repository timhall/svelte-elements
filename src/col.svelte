<script>
  export let el;
</script>

<col bind:this={el} on:focus on:blur on:keypress on:click {...$$props} />
