<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<menuitem bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}><slot /></menuitem>
