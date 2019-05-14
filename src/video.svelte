<script>
  export let el;
</script>

<video bind:this={el} on:focus on:blur on:keypress on:click on:pause on:play {...$$props}><slot /></video>
