<script>
  import { A } from '../../';

  let clicked = false;
  let el, correct;

  function onClick(event) {
    event.preventDefault();
    clicked = true;
  }

  $: correct = el instanceof HTMLElement;
</script>

<A bind:el href="#" on:click="{onClick}">Howdy!</A>

<h2>Results</h2>
<label><input type="checkbox" disabled bind:checked={clicked} /> Click</label>
<label><input type="checkbox" disabled bind:checked={correct} /> Element</label>
