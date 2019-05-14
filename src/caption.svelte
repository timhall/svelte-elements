<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<caption bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></caption>
