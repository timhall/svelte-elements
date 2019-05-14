<script>
  import { subscribe, optional } from './utils';

  export let title;
  export let el = undefined;
  export let listen = undefined;
</script>

<object title={title} use:optional={{title}} bind:this={el} on:focus on:blur on:keypress on:click use:subscribe={listen} {...$$props}>
  <slot />
</object>
