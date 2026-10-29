# Xam Xam Academy — application mobile

Branche `mobile/expo-mvp`. Aucun déploiement Netlify n'est nécessaire pour tester l'app.

## Tester dans Expo Go

Dans le terminal VS Code, à la racine du dépôt, une commande à la fois :

```bash
git switch mobile/expo-mvp
git pull --ff-only
cd mobile
npm ci
npx expo start --clear
```

Le PC et le téléphone doivent être sur le même Wi-Fi. Scanner le QR code dans Expo Go.
Ouvrir **Réviser → Loi d’Ohm** : le cours s'affiche directement dans l'application.
Les corrections s'ouvrent en appuyant sur **Voir la correction**.

## Vérifier la lecture hors connexion

1. Charger l'application dans Expo Go et ouvrir un cours.
2. Activer le mode avion sur le téléphone, sans fermer Expo Go.
3. Revenir à Réviser, rouvrir le cours et déplier les corrections.
4. Vérifier que les formules restent affichées ; remettre ensuite le réseau.

Expo Go a besoin de Metro pour charger le code lors d'un démarrage à froid. Pour vérifier
un redémarrage entièrement hors ligne, il faudra tester l'APK installé.

## Ce qui est enregistré

- Les deux cours publiés présents dans cette branche sont embarqués avec l'app.
- Texte, tableaux, encadrés, corrections et formules SVG se lisent sans réseau.
- L'API v2 transmet les cours complets ; les mises à jour sont enregistrées via AsyncStorage.
- Si le site sert encore l'ancienne API, l'app conserve la version complète embarquée.
- Les illustrations distantes sont mises en cache sur disque après chargement, avec un message si elles sont indisponibles.
- Les PDF et liens externes nécessitent Internet ; ils ne sont pas téléchargés par cette version.
- Les brouillons sont exclus de l'API mobile, même en développement.

## Tester la synchronisation avec le site local

À la racine du dépôt, dans un premier terminal :

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

Relever l'IPv4 du PC avec `ipconfig` sous Windows, par exemple `192.168.1.10`.
Créer `mobile/.env.local` avec cette ligne (remplacer l'IP par celle du PC) :

```dotenv
EXPO_PUBLIC_SITE_URL=http://192.168.1.10:4321
```

Ce fichier ne contient aucun secret. Relancer Expo avec `npx expo start --clear`.
Dans Réviser, tirer la liste vers le bas. L'app récupère l'API locale v2.
Ne pas mettre `localhost` : sur le téléphone, il désigne le téléphone lui-même.
Avant un build APK public, retirer cette variable pour revenir au domaine public.

## Actualiser les cours embarqués sans déployer

À la racine du dépôt :

```bash
npm run build
npm run mobile:snapshot
npm run test:mobile-content
```

Le dernier test utilise Node 24 ou plus récent. Relancer ensuite Expo.
Le snapshot provient du même flux que l'API ; il ne contient que les cours publiés.
Les nouvelles publications Sveltia atteindront automatiquement les apps via l'API v2
une fois cette version du site déployée, plus tard.

## Vérifications techniques

Dans `mobile` :

```bash
npm run typecheck
npx expo export --platform android
```

L'export valide le bundle Android mais ne produit pas d'APK.
Les profils EAS `apk` et `production` restent configurés pour APK et AAB.

## Suite du projet

Diagnostic, quiz, progression, Xam Xam+, synchronisation des vidéos et test APK.
L'IA est préparée dans l'app ; l'activation serveur attend la configuration prévue.
