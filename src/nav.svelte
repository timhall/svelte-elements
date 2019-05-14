<script>
  export let el;
</script>

<nav bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></nav>
