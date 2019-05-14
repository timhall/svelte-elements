<script>
  export let el;
</script>

<progress bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></progress>
