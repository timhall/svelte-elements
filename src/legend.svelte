<script>
  export let el;
</script>

<legend bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></legend>
