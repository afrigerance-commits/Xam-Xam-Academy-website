# Xam Xam Academy — application mobile MVP

Prototype mobile Android/iOS construit avec **Expo SDK 57 + React Native + Expo Router + TypeScript**.

Cette branche est volontairement séparée de `main` : elle ne modifie pas le site public actuel.

## Ce qui fonctionne déjà dans le MVP

- accueil mobile avec l'identité Xam Xam ;
- navigation native par onglets ;
- rubrique **Réviser** avec recherche et filtre par niveau ;
- première vraie fiche : **Loi d'Ohm 4e** ;
- ajout/suppression de favoris avec stockage local ;
- espace vidéos ;
- page profil avec site, WhatsApp et YouTube ;
- ouverture du cours complet sur `xamxamacademy.com`.

## Lancer sur Android

Depuis la racine du dépôt :

```bash
cd mobile
npm install
npx expo install --fix
npx expo start
```

Installe **Expo Go** sur le téléphone Android, connecte-toi au même compte Expo que sur l'ordinateur, puis scanne le QR code.

> Expo SDK 57 est utilisé volontairement : SDK 58 est encore en bêta au 28 septembre 2026.

## Architecture

```text
mobile/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── reviser.tsx
│   │   ├── videos.tsx
│   │   ├── favoris.tsx
│   │   └── profil.tsx
│   └── ressource/
│       └── [slug].tsx
└── src/
    ├── components.tsx
    ├── content.ts
    ├── favorites.tsx
    ├── theme.ts
    └── types.ts
```

## Étape suivante : synchronisation site + application

Pour le prototype, la liste de contenus vit dans `src/content.ts` et les pages détaillées ouvrent le site.

La V2 prévue est :

```text
Sveltia CMS
    ↓
contenus Astro
    ↓
flux JSON statique Xam Xam
   ↙             ↘
site web       application
```

Ainsi un cours sera saisi **une seule fois dans Sveltia** puis apparaîtra automatiquement sur le site et dans l'application.

## Roadmap

1. Flux JSON synchronisé avec le CMS.
2. Affichage natif des cours et exercices.
3. Diagnostic Xam Xam (5 questions).
4. Quiz avec correction immédiate.
5. Progression par niveau et chapitre.
6. Téléchargement PDF / lecture hors ligne.
7. Notifications.
8. Comptes élèves.
9. Build Android EAS et test interne Google Play.
10. iOS/TestFlight ensuite.
