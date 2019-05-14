<script>
  export let el;
</script>

<sub bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></sub>
