<script>
  export let el;
</script>

<ol bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></ol>
