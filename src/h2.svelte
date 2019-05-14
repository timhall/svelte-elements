<script>
  export let el;
</script>

<h2 bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></h2>
