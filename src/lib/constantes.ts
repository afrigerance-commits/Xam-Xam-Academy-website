/* =====================================================================
   Constantes partagées par tout le site
   ===================================================================== */

/** Numéro WhatsApp (format international, sans « + » ni espaces). */
export const WHATSAPP_NUMERO = '221711715359';

/** Numéro tel qu'il est affiché aux visiteurs. */
export const WHATSAPP_AFFICHAGE = '+221 71 171 53 59';

/** Chaîne YouTube. */
export const YOUTUBE_URL = 'https://www.youtube.com/@XamXamAcademia';

/** Niveaux proposés (l'ordre sert au tri et aux filtres). */
export const NIVEAUX = [
  '4e',
  '3e',
  'Seconde',
  'Première',
  'Terminale',
  'L1',
  'L2',
  'L3',
  'Tous niveaux',
] as const;

/** Types de ressources écrites. */
export const TYPES_RESSOURCE = [
  'Cours',
  'Exercices corrigés',
  'Fiche de révision',
  'Méthode',
  'Fascicule',
] as const;

/** Matières. */
export const MATIERES = ['Physique-Chimie', 'Physique', 'Chimie', 'Mathématiques'] as const;
