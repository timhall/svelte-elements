<script>
  import { subscribe } from './utils';

  export let el = undefined;
  export let listen = undefined;
</script>

<video bind:this={el} on:focus on:blur on:keypress on:click on:pause on:play use:subscribe={listen} {...$$restProps}><slot /></video>
