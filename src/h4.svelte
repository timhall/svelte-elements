<script>
  export let el;
</script>

<h4 bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></h4>
