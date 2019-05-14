<script>
  export let el;
</script>

<fieldset bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></fieldset>
