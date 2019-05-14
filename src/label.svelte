<script>
  export let el;
</script>

<label bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></label>
