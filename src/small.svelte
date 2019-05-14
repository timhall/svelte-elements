<script>
  export let el;
</script>

<small bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></small>
