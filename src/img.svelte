<script>
  export let alt;
  export let el;
</script>

<img {alt} bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></img>
