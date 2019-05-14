<script>
  export let el;
</script>

<b bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></b>
