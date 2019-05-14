<script>
  export let el;
</script>

<bdo bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></bdo>
