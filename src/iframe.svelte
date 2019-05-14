<script>
  import { subscribe } from './utils';

  export let title;
  export let el;
  export let listen;
</script>

<iframe {title} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></iframe>
