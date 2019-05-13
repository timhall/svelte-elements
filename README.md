# svelte-elements

`svelte:component` is a powerful primitive for rendering _components_ dynamically in svelte, but it doesn't handle html _elements_... until now.

```html
<!-- Block.svelte -->
<script>
  import { P, Blockquote } from 'svelte-elements';

  export let type;
</script>

<svelte:component this={type === 'blockquote' ? Blockquote : P}>
  <slot />
</svelte:component>
```
