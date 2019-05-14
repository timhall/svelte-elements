<script>
  export let el;
</script>

<caption bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></caption>
