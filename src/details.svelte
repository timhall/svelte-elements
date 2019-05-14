<script>
  export let el;
</script>

<details bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></details>
