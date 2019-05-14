<script>
  export let el;
</script>

<track bind:this={el} on:focus on:blur on:keypress on:click {...$$props} />
