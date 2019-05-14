<script>
  export let el;
</script>

<span bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></span>
