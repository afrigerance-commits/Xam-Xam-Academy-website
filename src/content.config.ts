/* =====================================================================
   Collections de contenus : ressources écrites, vidéos et blog.
   Chaque fichier Markdown d'un dossier de src/content/ devient une page.
   Les noms des champs (titre, niveau…) sont ceux à écrire en haut des
   fichiers, entre les lignes « --- ».
   ===================================================================== */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { MATIERES, NIVEAUX, TYPES_RESSOURCE } from './lib/constantes';

/** Cours, exercices corrigés, fiches, méthodes, fascicules. */
const ressources = defineCollection({
  loader: glob({ base: './src/content/ressources', pattern: '**/*.md' }),
  schema: z.object({
    titre: z.string(),
    type: z.enum(TYPES_RESSOURCE),
    niveau: z.enum(NIVEAUX),
    matiere: z.enum(MATIERES).default('Physique-Chimie'),
    chapitre: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
    /** Document PDF à télécharger : /documents/nom-du-fichier.pdf ou lien externe. */
    fichier: z.string().optional(),
    brouillon: z.boolean().default(false),
  }),
});

/** Vidéos de cours (YouTube et/ou lien de téléchargement). */
const videos = defineCollection({
  loader: glob({ base: './src/content/videos', pattern: '**/*.md' }),
  schema: z.object({
    titre: z.string(),
    niveau: z.enum(NIVEAUX),
    chapitre: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
    /** Lien de la vidéo YouTube (ou son identifiant). */
    youtube: z.string().optional(),
    /** Lien de téléchargement du fichier vidéo (Google Drive, etc.). */
    telechargement: z.string().optional(),
    duree: z.string().optional(),
    brouillon: z.boolean().default(false),
  }),
});

/** Articles du blog. */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    titre: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    categorie: z.string().optional(),
    /** Image de couverture : /images/blog/nom-de-l-image.jpg */
    image: z.string().optional(),
    image_alt: z.string().optional(),
    auteur: z.string().default('Xam Xam Academy'),
    brouillon: z.boolean().default(false),
  }),
});

export const collections = { ressources, videos, blog };
