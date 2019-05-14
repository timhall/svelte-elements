<script>
  export let el;
</script>

<summary bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></summary>
