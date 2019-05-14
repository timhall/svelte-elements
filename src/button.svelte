<script>
  export let el;
</script>

<button bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></button>
