<script>
  export let el;
</script>

<mark bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></mark>
