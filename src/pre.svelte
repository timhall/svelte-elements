<script>
  export let el;
</script>

<pre bind:this={el} on:focus on:blur on:keypress on:click {...$$props}><slot /></pre>
