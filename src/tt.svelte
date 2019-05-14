<script>
  export let el;
</script>

<tt bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></tt>
