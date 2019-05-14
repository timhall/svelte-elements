<script>
  import { subscribe } from './utils';

  export let el = undefined;
  export let listen = undefined;
</script>

<audio bind:this={el} on:focus on:blur on:keypress on:click on:pause on:play use:subscribe={listen} {...$$props}><slot /></audio>
