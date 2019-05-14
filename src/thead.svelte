<script>
  export let el;
</script>

<thead bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></thead>
