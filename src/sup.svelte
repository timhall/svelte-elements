<script>
  export let el;
</script>

<sup bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></sup>
