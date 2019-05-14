<script>
  export let el;
</script>

<figcaption bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></figcaption>
