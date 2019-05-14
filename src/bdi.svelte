<script>
  export let el;
</script>

<bdi bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></bdi>
