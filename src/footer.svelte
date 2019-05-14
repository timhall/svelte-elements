<script>
  export let el;
</script>

<footer bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></footer>
