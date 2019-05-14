<script>
  export let el;
</script>

<output bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></output>
