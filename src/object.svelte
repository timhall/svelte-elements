<script>
  export let title;
  export let el;
</script>

<object {title} bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></object>
