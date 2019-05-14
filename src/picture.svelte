<script>
  export let el;
</script>

<picture bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></picture>
