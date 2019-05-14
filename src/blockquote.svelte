<script>
  export let el;
</script>

<blockquote bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></blockquote>
