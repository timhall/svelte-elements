<script>
  export let el;
</script>

<tbody bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></tbody>
