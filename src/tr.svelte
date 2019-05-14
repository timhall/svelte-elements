<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<tr bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></tr>
