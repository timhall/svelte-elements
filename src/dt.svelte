<script>
  export let el;
</script>

<dt bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></dt>
