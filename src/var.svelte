<script>
  export let el;
</script>

<var bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></var>
