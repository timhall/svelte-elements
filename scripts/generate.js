const { join } = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const dedent = require('dedent');

// Load existing exports from src/index.js
const src = join(__dirname, '../src');
const index = join(src, 'index.js');

const list = new Set(
  readFileSync(index, 'utf8')
    .split('\n')
    .filter(Boolean)
);

// Get tags from stdin or all tags
let tags = process.argv.slice(2);
if (!tags.length) tags = allTags();

// Generate tags
for (const tag of tags) {
  const path = join(src, `${tag}.svelte`);
  if (existsSync(path)) {
    console.log(`<${tag}> - Skipped`);
    continue;
  }

  const events = matchingEvents(tag);

  const data = dedent`<script>
    export let el;
  </script>

  <${tag} bind:this={el} ${events}{...$$props}${isVoid(tag) ? ' />' : `><slot /></${tag}>`}\n`;

  writeFileSync(path, data, 'utf8');
  list.add(`export { default as ${capitalize(tag)} } from './${tag}.svelte';`);

  console.log(`<${tag}> - Created`);
}

writeFileSync(index, `${[...list].sort(byExport).join('\n')}\n`, 'utf8');

//
// utils
//

function capitalize(tag) {
  return tag[0].toUpperCase() + tag.slice(1);
}

function exportName(line) {
  return line.replace(`export { default as }`, '');
}

function byExport(a, b) {
  const a_name = exportName(a);
  const b_name = exportName(b);

  if (a_name < b_name) return -1;
  if (a_name > b_name) return 1;
  return 0;
}

// All events:
// (https://developer.mozilla.org/en-US/docs/Web/Events)
//
// on:focus on:blur
// on:cut on:copy on:paste
// on:keydown on:keypress on:keyup
// on:auxclick on:click on:contextmenu on:dblclick on:mousedown on:mouseenter on:mouseleave on:mousemove on:mouseover on:mouseout on:mouseup on:pointerlockchange on:pointerlockerror on:select on:wheel
// on:drag on:dragend on:dragenter on:dragstart on:dragleave on:dragover on:drop
// on:audioprocess on:canplay on:canplaythrough on:complete on:durationchange on:emptied on:ended on:loadeddata on:loadedmetadata on:pause on:play on:playing on:ratechange on:seeked on:seeking on:stalled on:suspend on:timeupdate on:volumechange on:waiting
//
// Forwarding events adds an event listener per event, which could get fairly expensive
// Instead, forward common events:
//
// everything: on:focus on:blur on:keypress on:click
// media: on:pause on:play
function matchingEvents(tag) {
  let events = !['br', 'hr'].includes(tag)
    ? ['on:focus', 'on:blur', 'on:keypress', 'on:click']
    : [];
  if (['audio', 'video'].includes(tag)) events = events.concat(['on:pause', 'on:play']);

  return events.length ? `${events.join(' ')} ` : '';
}

function isVoid(tag) {
  return ['br', 'col', 'embed', 'hr', 'input', 'param', 'source', 'track', 'wbr'].includes(tag);
}

function allTags() {
  return [
    'a',
    'abbr',
    'address',
    'applet',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'blockquote',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'noembed',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rb',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'small',
    'source',
    'span',
    'strong',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr'
  ];
}
