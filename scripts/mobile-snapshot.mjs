// npm run mobile:snapshot après npm run build (aucun déploiement).
import { readFile, writeFile } from 'node:fs/promises';
const payload = JSON.parse(await readFile(new URL('../dist/api/ressources.json', import.meta.url), 'utf8'));
if (payload.version !== 2 || !payload.resources.every(item => item.content?.version === 1)) {
  throw new Error('Construire le site avec npm run build avant de générer les cours embarqués.');
}
await writeFile(new URL('../mobile/src/data/resources.json', import.meta.url), JSON.stringify(payload, null, 2) + '\n');
console.log(`${payload.count} cours complets embarqués dans l’application.`);
