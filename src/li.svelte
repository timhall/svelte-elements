<script>
  export let el;
</script>

<li bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></li>
