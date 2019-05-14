<script>
  import { subscribe } from './utils';

  export let value;
  export let el;
  export let listen;
</script>

<option {value} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></option>
