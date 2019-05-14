<script>
  export let el;
</script>

<i bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></i>
