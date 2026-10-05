// Configuration Astro — site statique Xam Xam Academy
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import 'katex/contrib/mhchem'; // équations chimiques : \ce{2H2 + O2 -> 2H2O}
import remarkBlocs from './src/lib/remark-blocs.mjs';
import rehypePonctuation from './src/lib/rehype-ponctuation.mjs';

/**
 * Adresse publique du site, utilisée pour l'adresse canonique des pages,
 * l'image de partage (WhatsApp, Facebook…) et le plan du site (sitemap).
 * 1. Variable d'environnement SITE_URL si elle est définie chez l'hébergeur
 *    (ex. https://www.xamxamacademy.com) — à utiliser avec un nom de domaine ;
 * 2. sinon, adresse détectée automatiquement sur Netlify et Vercel.
 */
function adresseDuSite() {
  const env = process.env;
  if (env.SITE_URL) return env.SITE_URL;
  return 'https://xamxamacademy.com';
}
const site = adresseDuSite();

export default defineConfig({
  site,

  // Plan du site pour Google (généré seulement si l'adresse est connue).
  integrations: site ? [sitemap({ filter: (page) => !/\/404\/?$/.test(page) })] : [],

  // Conserve les espaces entre éléments en ligne (règles HTML classiques).
  compressHTML: true,

  devToolbar: { enabled: false },

  markdown: {
    processor: unified({
      // Formules ($…$ et $$…$$), blocs « :::correction », « :::definition »…
      remarkPlugins: [remarkMath, remarkDirective, remarkBlocs],
      rehypePlugins: [[rehypeKatex, { strict: false }], rehypePonctuation],
    }),
  },
});
