<script>
  import { subscribe } from './utils';

  export let href;
  export let el = undefined;
  export let listen = undefined;
</script>

<a {href} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></a>
