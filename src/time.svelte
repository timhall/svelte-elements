<script>
  export let el;
</script>

<time bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></time>
