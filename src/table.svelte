<script>
  export let el;
</script>

<table bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></table>
