<script>
  export let el;
</script>

<hgroup bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></hgroup>
