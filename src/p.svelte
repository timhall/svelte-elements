<script>
  export let el;
</script>

<p bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></p>
