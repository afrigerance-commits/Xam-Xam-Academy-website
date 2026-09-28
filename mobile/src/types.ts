export type Level = '4e' | '3e' | 'Seconde' | 'Première' | 'Terminale' | 'L1' | 'L2' | 'L3';

export type Resource = {
  slug: string;
  title: string;
  level: Level;
  subject: 'Physique' | 'Chimie' | 'Physique-Chimie';
  chapter: string;
  type: 'Cours' | 'Exercices corrigés' | 'Fiche de révision' | 'Méthode';
  description: string;
  duration: string;
  url: string;
  highlights: string[];
};

export type Video = {
  id: string;
  title: string;
  level: Level;
  duration: string;
  url: string;
};
