<script>
  export let el;
</script>

<header bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></header>
