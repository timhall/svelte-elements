<script>
  import { A, Input, Textarea } from '../../';

  let clicked = false;
  let focused = false;
  let keydown = false;
  let el, correct;
  let Textarea_focused = false;
  let Textarea_keydown = false;
  let Textarea_on_input_value;

  $: correct = el instanceof HTMLElement;
</script>

<h2>A</h2>
<A bind:el href="#" on:click={() => clicked = true}>Howdy!</A>

<h3>Results</h3>
<label><input type="checkbox" disabled bind:checked={clicked} /> Click</label><br>
<label><input type="checkbox" disabled bind:checked={correct} /> Element</label>

<h2>Input</h2>
<Input type="text" on:focus={() => focused = true} listen={{ keydown: () => keydown = true}} />

<h3>Results</h3>
<label><input type="checkbox" disabled bind:checked={focused} /> Focus</label><br>
<label><input type="checkbox" disabled bind:checked={keydown} /> listen</label>

<h2>Textarea</h2>
<Textarea
  type="text"
  on:focus={() => Textarea_focused = true}
  listen={{
    keydown: () => Textarea_keydown = true,
    input: (event) => Textarea_on_input_value = event.target.value,
  }}
/>

<h3>Results</h3>
<label><input type="checkbox" disabled bind:checked={Textarea_focused} /> Focus</label><br>
<label><input type="checkbox" disabled bind:checked={Textarea_keydown} /> listen: keydown</label>
<div><label>listen: input: <input type="input" disabled value={Textarea_on_input_value} /></label></div>
