<script>
  export let el;
</script>

<strong bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></strong>
