<script>
  export let el;
</script>

<abbr bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></abbr>
