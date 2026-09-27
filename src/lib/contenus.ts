/* =====================================================================
   Lecture des contenus publiés, triés du plus récent au plus ancien.
   Les brouillons (brouillon: true) ne sont visibles qu'en local.
   ===================================================================== */
import { getCollection } from 'astro:content';
import { estPublie } from './outils';

const parDate = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export async function ressourcesPubliees() {
  return (await getCollection('ressources', estPublie)).sort(parDate);
}

export async function videosPubliees() {
  return (await getCollection('videos', estPublie)).sort(parDate);
}

export async function articlesPublies() {
  return (await getCollection('blog', estPublie)).sort(parDate);
}
