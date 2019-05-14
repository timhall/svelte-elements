<script>
  export let el;
</script>

<dfn bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></dfn>
