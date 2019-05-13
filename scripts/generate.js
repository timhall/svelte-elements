const { join } = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');

const src = join(__dirname, '../src');
const index = join(src, 'index.js');

const tags = process.argv.slice(2);
const list = readFileSync(index, 'utf8')
  .split('\n')
  .filter(Boolean);

const capitalize = tag => tag[0].toUpperCase() + tag.slice(1);

const exportName = line => line.replace(`export { default as }`, '');
const byExport = (a, b) => {
  const a_name = exportName(a);
  const b_name = exportName(b);

  if (a_name < b_name) return -1;
  if (a_name > b_name) return 1;
  return 0;
};

for (const tag of tags) {
  const path = join(src, `${tag}.svelte`);
  if (existsSync(path)) {
    console.log(`<${tag}> - Skipped`);
    continue;
  }

  const data = `<${tag} {...$$props}><slot /></${tag}>\n`;
  writeFileSync(path, data, 'utf8');

  list.push(`export { default as ${capitalize(tag)} } from './${tag}.svelte';`);

  console.log(`<${tag}> - Created`);
}

writeFileSync(index, `${list.sort(byExport).join('\n')}\n`, 'utf8');
