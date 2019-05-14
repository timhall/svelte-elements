<script>
  export let el;
</script>

<kbd bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></kbd>
