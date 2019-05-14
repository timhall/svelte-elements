<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<br bind:this={el} use:subscribe={listen} {...$$props} />
