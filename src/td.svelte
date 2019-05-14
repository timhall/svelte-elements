<script>
  export let el;
</script>

<td bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></td>
