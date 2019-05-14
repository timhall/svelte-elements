<script>
  export let el;
</script>

<th bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></th>
