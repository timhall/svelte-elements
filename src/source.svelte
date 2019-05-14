<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<source bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props} />
