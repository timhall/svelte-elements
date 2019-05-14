<script>
  export let el;
</script>

<tfoot bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></tfoot>
