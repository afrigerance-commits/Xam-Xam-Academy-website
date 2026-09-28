import type { Resource, Video } from './types';

export const fallbackResources: Resource[] = [
  {
    slug: 'exemple-exercices-loi-d-ohm',
    title: 'Loi d’Ohm 4e : cours et exercices corrigés',
    level: '4e',
    subject: 'Physique',
    chapter: 'Électricité — Loi d’Ohm',
    type: 'Exercices corrigés',
    description:
      'Comprendre et appliquer la loi d’Ohm avec un rappel de cours, des exercices progressifs et des corrections détaillées.',
    duration: '15 min',
    content: ":::retenir\nPour un conducteur ohmique, la tension $U$ (en volts) est proportionnelle à l'intensité $I$ (en ampères) :\n\n$\nU = R \\times I\n$\n\noù $R$ est la résistance du conducteur, exprimée en ohms ($\\Omega$).\n:::\n\n## Exercice 1 — Calculer une tension\n\nUn conducteur ohmique de résistance $R = 220\\ \\Omega$ est traversé par un courant d'intensité $I = 50\\ \\text{mA}$.\n\n**Calculer la tension $U$ à ses bornes.**\n\n:::correction\nOn commence par convertir l'intensité en ampères :\n\n$\nI = 50\\ \\text{mA} = 0{,}050\\ \\text{A}\n$\n\nOn applique ensuite la loi d'Ohm :\n\n$\nU = R \\times I\n$\n\n$\nU = 220 \\times 0{,}050\n$\n\n$\nU = 11\\ \\text{V}\n$\n\n**Réponse :** la tension aux bornes du conducteur ohmique est :\n\n$\n\\boxed{U = 11\\ \\text{V}}\n$\n:::\n\n## Exercice 2 — Calculer une résistance\n\nUn conducteur ohmique soumis à une tension $U = 6\\ \\text{V}$ est traversé par un courant d'intensité $I = 0{,}12\\ \\text{A}$.\n\n**Calculer sa résistance $R$.**\n\n:::correction\nOn part de la loi d'Ohm :\n\n$\nU = R \\times I\n$\n\nOn isole $R$ :\n\n$\nR = \\frac{U}{I}\n$\n\nApplication numérique :\n\n$\nR = \\frac{6}{0{,}12}\n$\n\n$\nR = 50\\ \\Omega\n$\n\n**Réponse :**\n\n$\n\\boxed{R = 50\\ \\Omega}\n$\n:::\n\n:::methode\nPour résoudre un exercice utilisant la loi d'Ohm :\n\n1. Relever les données de l'énoncé.\n2. Convertir les grandeurs dans les unités adaptées : volt (V), ampère (A) et ohm ($\\Omega$).\n3. Écrire la relation littérale.\n4. Isoler la grandeur recherchée si nécessaire.\n5. Effectuer l'application numérique.\n6. Donner le résultat avec son unité.\n:::",
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

export const levels = [
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
