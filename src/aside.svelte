<script>
  export let el;
</script>

<aside bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></aside>
