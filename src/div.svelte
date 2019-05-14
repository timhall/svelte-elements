<script>
  export let el;
</script>

<div bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></div>
