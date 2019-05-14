<script>
  export let el;
</script>

<s bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></s>
