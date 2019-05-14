<script>
  import { subscribe } from './utils';

  export let el = undefined;
  export let listen = undefined;
</script>

<hr bind:this={el} use:subscribe={listen} {...$$props} />
