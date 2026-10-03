import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildCourse } from '../src/lib/mobile-course.mjs';
import { isResourceList, mergeResources } from '../mobile/src/resource-data.ts';
const snapshot = JSON.parse(await readFile(new URL('../mobile/src/data/resources.json', import.meta.url), 'utf8'));
function nodes(value) {
  return [value, ...(value.children ?? []).flatMap(nodes)];
}
test('les cours réels contiennent les corrections et des formules autonomes', () => {
  assert.equal(snapshot.version, 2);
  assert.equal(snapshot.count, snapshot.resources.length);
  assert.ok(isResourceList(snapshot.resources));
  const course = snapshot.resources.find(item => item.slug.includes('ohm'));
  const all = course.content.nodes.flatMap(nodes);
  assert.equal(all.filter(node => node.name === 'correction').length, 2);
  const math = all.filter(node => ['math', 'inlineMath'].includes(node.type));
  assert.ok(math.length > 10);
  for (const node of math) {
    assert.match(node.svg, /<path/);
    assert.ok(node.width > 0 && node.height > 0);
    assert.doesNotMatch(node.svg, /https?:\/\/(?!www.w3.org)/);
  }
});
test('chimie, titre personnalisé, tableaux, illustrations et liens référencés', () => {
  const course = buildCourse(':::correction[Solution]\n$$\\ce{2H2 + O2 -> 2H2O}$$\n:::\n\n![Schéma](/schema.png)\n\n| U | I |\n| - | - |\n| 6 | 2 |\n\n[Source][s]\n\n[s]: https://example.org');
  const all = course.nodes.flatMap(nodes);
  assert.equal(all.find(node => node.name === 'correction').label, 'Solution');
  assert.ok(all.find(node => ['math', 'inlineMath'].includes(node.type)).svg);
  assert.ok(all.some(node => node.type === 'table'));
  assert.equal(all.find(node => node.type === 'image').url, '/schema.png');
  assert.equal(all.find(node => node.type === 'link').url, 'https://example.org');
});
test('ancienne API : ne pas effacer le cours embarqué, ni ressusciter les suppressions', () => {
  const old = mergeResources(snapshot.resources, [], 'https://xamxamacademy.com', 'bundled');
  const incoming = [{ ...snapshot.resources[0], content: undefined }];
  const merged = mergeResources(incoming, old, 'https://xamxamacademy.com', 'synced');
  assert.equal(merged.length, 1);
  assert.deepEqual(merged[0].content, old[0].content);
  assert.equal(merged[0].contentSource, 'bundled');
  assert.deepEqual(mergeResources([], old, 'https://xamxamacademy.com'), []);
});
test('cache JSON relu au démarrage, mise à jour et flux invalide', () => {
  const complete = mergeResources(snapshot.resources, [], 'http://192.168.1.10:4321', 'synced');
  const restored = JSON.parse(JSON.stringify(complete));
  assert.ok(isResourceList(restored));
  assert.equal(restored[0].contentSource, 'synced');
  const updated = { ...restored[0], content: buildCourse('## Nouvelle version\n\nCours actualisé.') };
  assert.deepEqual(mergeResources([updated], restored, 'http://192.168.1.10:4321', 'synced')[0].content, updated.content);
  assert.equal(isResourceList([{ slug: 'cassé' }]), false);
  assert.equal(isResourceList([{ ...complete[0], content: { version: 1, nodes: [null] } }]), false);
});
