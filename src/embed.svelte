<script>
  export let el;
</script>

<embed bind:this={el} on:focus on:blur on:keypress on:click {...$$props} />
