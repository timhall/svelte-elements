<script>
  import { subscribe } from './utils';

  export let alt;
  export let el = undefined;
  export let listen = undefined;
</script>

<img {alt} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props} />
