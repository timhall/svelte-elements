# svelte-elements

`svelte:component` is a powerful primitive for rendering _components_ dynamically in svelte, but it doesn't handle html _elements_... until now.

```html
<!-- Block.svelte -->
<script>
  import { P, Blockquote } from 'svelte-elements';

  export let type;
</script>

<svelte:component this="{type === 'blockquote' ? Blockquote : P}">
  <slot />
</svelte:component>
```

There are some limitations in this approach, namely `bind:this` does not point to the native element and events are not forwarded by default from the native element. This can be addressed in two ways:

### `bind:el`

Instead of `bind:this={ref}`, use `bind:el={ref}`. `this` points to the wrapper component, `el` points to the native element

```html
<script>
  import { A } from 'svelte-elements';

  let el;
  $: console.log(el); // -> HTMLElement
</script>

<A bind:el href="#">...</A>
```

### `listen`

Forwarding events from the native element through the wrapper element comes with a cost, so to avoid adding extra event handlers only a few are forwarded.
For all elements except `<br>` and `<hr>`, `on:focus`, `on:blur`, `on:keypress`, and `on:click` are forwarded.
For `input` and `textarea`, `on:input` and `on:change` are also forwarded.
For `audio` and `video`, `on:pause` and `on:play` are also forwarded.

For any other events that need to be listened to, you can use the `listen` property:

```html
<script>
  import { A } from 'svelte-elements';

  const preload = () => {};
  const navigate = () => {};
</script>

<A on:click="{navigate}" listen="{{ mouseenter: preload }}">...</A>
```
