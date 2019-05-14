<script>
  export let el;
</script>

<dd bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></dd>
