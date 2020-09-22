<script>
  import { subscribe } from './utils';

  export let el = undefined;
  export let listen = undefined;
</script>

<br bind:this={el} use:subscribe={listen} {...$$restProps} />
