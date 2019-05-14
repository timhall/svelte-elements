<script>
  export let el;
</script>

<h6 bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></h6>
