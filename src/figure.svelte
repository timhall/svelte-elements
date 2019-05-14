<script>
  export let el;
</script>

<figure bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></figure>
