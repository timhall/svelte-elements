<script>
  export let el;
</script>

<dir bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></dir>
