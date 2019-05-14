<script>
  import { subscribe } from './utils';

  export let alt;
  export let el;
  export let listen;
</script>

<area {alt} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props} />
