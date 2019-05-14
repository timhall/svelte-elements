<script>
  export let el;
</script>

<dl bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></dl>
