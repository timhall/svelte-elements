<script>
  export let el;
</script>

<code bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></code>
