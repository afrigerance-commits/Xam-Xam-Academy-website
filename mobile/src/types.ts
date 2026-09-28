export type Level =
  | '4e'
  | '3e'
  | 'Seconde'
  | 'Première'
  | 'Terminale'
  | 'L1'
  | 'L2'
  | 'L3'
  | 'Tous niveaux';

export type ResourceType =
  | 'Cours'
  | 'Exercices corrigés'
  | 'Fiche de révision'
  | 'Méthode'
  | 'Fascicule';

export type Resource = {
  slug: string;
  title: string;
  level: Level;
  subject: 'Physique' | 'Chimie' | 'Physique-Chimie';
  chapter: string;
  type: ResourceType;
  description: string;
  date?: string;
  duration?: string;
  url: string;
  pdfUrl?: string | null;
  highlights?: string[];
};

export type Video = {
  id: string;
  title: string;
  level: Level;
  duration: string;
  url: string;
};
