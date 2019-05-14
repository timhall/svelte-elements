<script>
  export let el;
</script>

<colgroup bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></colgroup>
