<script>
  export let el;
</script>

<canvas bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></canvas>
