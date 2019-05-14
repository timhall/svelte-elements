<script>
  export let el;
</script>

<ruby bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></ruby>
