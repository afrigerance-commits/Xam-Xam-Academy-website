// Configuration Astro — site statique Xam Xam Academy
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import 'katex/contrib/mhchem'; // équations chimiques : \ce{2H2 + O2 -> 2H2O}
import remarkBlocs from './src/lib/remark-blocs.mjs';
import rehypePonctuation from './src/lib/rehype-ponctuation.mjs';

export default defineConfig({
  // Après la mise en ligne, indiquer l'adresse définitive du site :
  // site: 'https://www.votre-domaine.com',

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
