<script>
  export let el;
</script>

<em bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></em>
