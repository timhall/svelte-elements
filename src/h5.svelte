<script>
  export let el;
</script>

<h5 bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></h5>
