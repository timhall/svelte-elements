<script>
  export let href;
  export let el;
</script>

<a {href} bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></a>
