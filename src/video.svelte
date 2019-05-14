<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<video bind:this={el} on:focus on:blur on:keypress on:click on:pause on:play use:subscribe={listen} {...$$props}><slot /></video>
