import type { APIRoute } from 'astro';
import { ressourcesPubliees } from '../../lib/contenus';

export const prerender = true;

export const GET: APIRoute = async () => {
  const ressources = await ressourcesPubliees();

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    count: ressources.length,
    resources: ressources.map((ressource) => ({
      slug: ressource.id,
      title: ressource.data.titre,
      level: ressource.data.niveau,
      subject: ressource.data.matiere,
      chapter: ressource.data.chapitre ?? '',
      type: ressource.data.type,
      description: ressource.data.description ?? '',
      date: ressource.data.date.toISOString(),
      pdfUrl: ressource.data.fichier || null,
      url: `/ressources/${ressource.id}/`,
    })),
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
