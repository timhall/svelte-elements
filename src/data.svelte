<script>
  export let el;
</script>

<data bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></data>
