<script>
  export let el;
</script>

<del bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></del>
