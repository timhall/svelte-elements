<script>
  export let el;
</script>

<form bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></form>
