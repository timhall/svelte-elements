<script>
  export let el;
</script>

<h3 bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></h3>
