<script>
  export let el;
</script>

<menu bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></menu>
