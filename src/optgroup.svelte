<script>
  export let el;
</script>

<optgroup bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></optgroup>
