<script>
  export let el;
</script>

<tr bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></tr>
