<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<embed bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props} />
