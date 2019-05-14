<script>
  export let el;
</script>

<audio bind:this={el} on:focus on:blur on:keypress on:click on:pause on:play {...$$props}><slot /></audio>
