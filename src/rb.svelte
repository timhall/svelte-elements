<script>
  export let el;
</script>

<rb bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></rb>
