<script>
  export let el;
</script>

<menuitem bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></menuitem>
