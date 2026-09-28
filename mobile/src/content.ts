import type { Resource, Video } from './types';

export const resources: Resource[] = [
  {
    slug: 'exemple-exercices-loi-d-ohm',
    title: 'Loi d’Ohm 4e : cours et exercices corrigés',
    level: '4e',
    subject: 'Physique',
    chapter: 'Électricité — Loi d’Ohm',
    type: 'Exercices corrigés',
    description: 'Comprendre et appliquer la loi d’Ohm avec un rappel de cours, des exercices progressifs et des corrections détaillées.',
    duration: '15 min',
    url: 'https://xamxamacademy.com/ressources/exemple-exercices-loi-d-ohm/',
    highlights: [
      'Relation entre tension, intensité et résistance',
      'Conversions mA → A',
      'Calcul de U et de R',
      'Méthode de résolution pas à pas',
    ],
  },
];

export const videos: Video[] = [
  {
    id: 'youtube',
    title: 'Retrouver les vidéos Xam Xam Academy',
    level: '4e',
    duration: 'YouTube',
    url: 'https://www.youtube.com/@XamXamAcademia',
  },
];

export const levels = ['4e', '3e', 'Seconde', 'Première', 'Terminale', 'L1', 'L2', 'L3'] as const;
