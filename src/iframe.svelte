<script>
  export let title;
  export let el;
</script>

<iframe {title} bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></iframe>
