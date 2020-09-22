<script>
  import { A, Input, Textarea } from '../../';

  let A_clicked = false;
  let A_el;
  $: A_el_correct = A_el instanceof HTMLElement;

  let Input_value;
  let Input_focused = false;
  let Input_keydown = false;

  let Textarea_value;
  let Textarea_focused = false;
  let Textarea_keydown = false;
</script>

<h2>A</h2>
<A
  bind:el={A_el}
  href="#"
  on:click={() => A_clicked = true}
>Howdy!</A>

<h3>Results</h3>
<label><input type="checkbox" disabled bind:checked={A_clicked} /> Click</label><br>
<label><input type="checkbox" disabled bind:checked={A_el_correct} /> Element</label>

<h2>Input type="text"</h2>
<label>
  Text input:
  <Input
    type="text"
    bind:value={Input_value}
    on:focus={() => Input_focused = true}
    listen={{ keydown: () => Input_keydown = true}}
  />
</label>

<h3>Results</h3>
<div><label>bind:value: <input type="input" disabled value={Input_value} /></label></div>
<label><input type="checkbox" disabled bind:checked={Input_focused} /> on:focus</label><br>
<label><input type="checkbox" disabled bind:checked={Input_keydown} /> listen: keydown</label>

<h2>Textarea</h2>
<Textarea
  type="text"
  bind:value={Textarea_value}
  on:focus={() => Textarea_focused = true}
  listen={{ keydown: () => Textarea_keydown = true }}
/>

<h3>Results</h3>
<div><label>bind:value: <input type="input" disabled value={Textarea_value} /></label></div>
<label><input type="checkbox" disabled bind:checked={Textarea_focused} /> on:focus</label><br>
<label><input type="checkbox" disabled bind:checked={Textarea_keydown} /> listen: keydown</label>
