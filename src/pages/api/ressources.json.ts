import type { APIRoute } from 'astro';
import { ressourcesPubliees } from '../../lib/contenus';
import { buildCourse } from '../../lib/mobile-course.mjs';

export const prerender = true;

export const GET: APIRoute = async () => {
  const ressources = await ressourcesPubliees();

  const payload = {
    version: 2,
    generatedAt: new Date().toISOString(),
    count: ressources.filter((ressource) => !ressource.data.brouillon).length,
    resources: ressources.filter((ressource) => !ressource.data.brouillon).map((ressource) => ({
      slug: ressource.id,
      content: buildCourse(ressource.body),
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
