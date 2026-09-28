# Xam Xam Academy — application mobile MVP

Application Android/iOS construite avec Expo + React Native + Expo Router + TypeScript.

La branche `mobile/expo-mvp` reste séparée de `main` tant que la version mobile n'a pas été validée.

## Fonctionnalités actuelles

- accueil mobile aux couleurs Xam Xam ;
- vrai logo Xam Xam embarqué dans l'application ;
- zones sûres Android/iOS respectées (barre d'état) ;
- navigation Accueil / Réviser / Vidéos / Favoris / Profil ;
- recherche et filtre par niveau ;
- favoris persistants sur le téléphone ;
- synchronisation automatique des ressources publiées depuis Sveltia CMS ;
- cache local : les derniers cours restent visibles si le réseau est momentanément indisponible ;
- accès au cours complet, aux PDF, à WhatsApp et à YouTube.

## Synchronisation CMS → application

Le site génère à chaque déploiement :

```text
https://xamxamacademy.com/api/ressources.json
```

Le flux contient uniquement les ressources publiées (`brouillon: false`).

```text
Sveltia CMS
    ↓
Markdown Astro
    ↓
/api/ressources.json
   ↙             ↘
site web       application mobile
```

Tu saisis donc un cours une seule fois dans Sveltia. Après publication et déploiement du site, l'application récupère automatiquement la nouvelle liste.

## Lancer sur Android

```bash
cd mobile
npm install
npx expo install --fix
npx expo start
```

Pour forcer une nouvelle synchronisation, ouvre l'onglet **Réviser** et tire la page vers le bas.

## Prochaines étapes

1. Affichage natif complet du contenu Markdown dans l'application.
2. Synchronisation des vidéos.
3. Diagnostic Xam Xam.
4. Quiz avec correction immédiate.
5. Progression par niveau et chapitre.
6. Lecture hors ligne / téléchargements.
7. Notifications.
8. Comptes élèves.
9. Build Android EAS et test Google Play.
10. iOS/TestFlight.
