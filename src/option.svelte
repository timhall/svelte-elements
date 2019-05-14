<script>
  export let value;
  export let el;
</script>

<option {value} bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></option>
