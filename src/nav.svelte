<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<nav bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></nav>
