<script>
  import { subscribe } from './utils';

  export let el = undefined;
  export let listen = undefined;
  export let value = '';
</script>

<input
  bind:this={el}
  bind:value
  on:focus
  on:blur
  on:keypress
  on:click
  use:subscribe={listen}
  {...$$restProps}
/>
