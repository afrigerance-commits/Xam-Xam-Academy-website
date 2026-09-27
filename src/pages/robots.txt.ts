/* robots.txt généré automatiquement (avec l'adresse du plan du site si elle est connue). */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const lignes = ['User-agent: *', 'Allow: /', 'Disallow: /admin/'];
  if (site) lignes.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  return new Response(`${lignes.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
