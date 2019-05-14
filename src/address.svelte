<script>
  export let el;
</script>

<address bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></address>
