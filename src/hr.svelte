<script>
  import { subscribe } from './utils';

  export let el;
  export let listen;
</script>

<hr bind:this={el} use:subscribe={listen} {...$$props} />
