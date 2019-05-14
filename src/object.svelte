<script>
  import { subscribe } from './utils';

  export let title;
  export let el;
  export let listen;
</script>

<object {title} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></object>
