<script>
  import { A, Input } from '../../';

  let clicked = false;
  let focused = false;
  let keydown = false;
  let el, correct;

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
