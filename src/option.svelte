<script>
  import { subscribe } from './utils';

  export let value;
  export let el = undefined;
  export let listen = undefined;
</script>

<option {value} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$restProps}><slot /></option>
