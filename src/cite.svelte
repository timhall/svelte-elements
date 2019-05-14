<script>
  export let el;
</script>

<cite bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></cite>
