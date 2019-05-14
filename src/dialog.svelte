<script>
  export let el;
</script>

<dialog bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></dialog>
