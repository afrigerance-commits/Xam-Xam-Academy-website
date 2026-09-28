# Xam Xam Academy — Site internet

> **Comprendre. Progresser. Réussir.**

Site de **Xam Xam Academy** : cours de Physique-Chimie à domicile (Dakar, Thiès), cours de renforcement et cours en ligne (Xam Xam Online), du collège jusqu'à l'enseignement supérieur.

Le site comprend :

- **la page d'accueil** (présentation, cours, méthode, formules en ligne, FAQ, contact WhatsApp) ;
- **Cours et exercices corrigés** (`/ressources/`) : cours, exercices corrigés, fiches de révision, méthodes et fascicules, avec filtres par niveau et par type, formules mathématiques, corrections dépliables et PDF à télécharger ;
- **Vidéos** (`/videos/`) : vidéos YouTube intégrées et liens de téléchargement ;
- **Blog** (`/blog/`) : articles ;
- **une interface d'administration** (`/admin/`) pour publier ces contenus sans toucher au code.

Technique : [Astro](https://astro.build) génère un site **100 % statique**, rapide et hébergeable gratuitement (Netlify, Vercel, Cloudflare Pages). Aucune base de données, aucun serveur à entretenir.

---

## Sommaire

1. [Lancer le site sur son ordinateur](#1-lancer-le-site-sur-son-ordinateur)
2. [Ajouter du contenu depuis l'interface d'administration](#2-ajouter-du-contenu-depuis-linterface-dadministration)
3. [Ajouter du contenu en écrivant des fichiers](#3-ajouter-du-contenu-en-écrivant-des-fichiers)
4. [Écrire les formules, corrections et encadrés](#4-écrire-les-formules-corrections-et-encadrés)
5. [Modifier les textes du site](#5-modifier-les-textes-du-site)
6. [Modifier le numéro WhatsApp ou le lien YouTube](#6-modifier-le-numéro-whatsapp-ou-le-lien-youtube)
7. [Logos, photo et images](#7-logos-photo-et-images)
8. [Couleurs et polices](#8-couleurs-et-polices)
9. [Mettre le site en ligne](#9-mettre-le-site-en-ligne)
10. [Après la mise en ligne](#10-après-la-mise-en-ligne)
11. [Structure des fichiers](#11-structure-des-fichiers)
12. [En cas de problème](#12-en-cas-de-problème)

---

## 1. Lancer le site sur son ordinateur

Prérequis : [Node.js](https://nodejs.org) **version 22.12 ou plus récente**.

```bash
npm install        # une seule fois : installe les outils
npm run dev        # aperçu en direct sur http://localhost:4321
```

Chaque modification enregistrée s'affiche immédiatement dans le navigateur. En mode aperçu (`npm run dev`), les contenus en **brouillon** sont visibles, avec la mention « Brouillon ».

Pour produire la version finale du site (dossier `dist/`) et la vérifier :

```bash
npm run build      # génère le site dans dist/
npm run preview    # affiche la version générée sur http://localhost:4321
```

---

## 2. Ajouter du contenu depuis l'interface d'administration

Une fois le site en ligne, l'administration est accessible à l'adresse **`https://votre-site/admin/`**. Elle permet de créer et de modifier les cours, exercices, vidéos et articles avec des formulaires, en français.

Les modifications sont enregistrées dans GitHub **sans republier automatiquement le site**. Cela permet de corriger un cours autant de fois que nécessaire sans déclencher un déploiement Netlify à chaque sauvegarde.

Dans l'éditeur :
- **Enregistrer** : sauvegarde les modifications avec `[skip ci]` et ne déclenche pas de déploiement ;
- **Enregistrer et publier** : sauvegarde puis déclenche un nouveau déploiement du site quand le contenu est prêt.

Ainsi, plusieurs petites corrections peuvent être regroupées avant une seule publication.

### Première connexion

L'administration se connecte au dépôt GitHub `afrigerance-commits/Xam-Xam-Academy-website`. La méthode la plus simple est un **jeton d'accès personnel** :

1. Sur GitHub : *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
2. *Repository access* : choisir **Only select repositories**, puis le dépôt du site.
3. *Permissions → Repository permissions → Contents* : **Read and write**.
4. Générer le jeton et le copier.
5. Sur `/admin/`, cliquer sur **« Se connecter avec un jeton d'accès »** et coller le jeton.

> Le jeton donne accès au dépôt : ne le partagez pas. Vous pouvez le supprimer à tout moment depuis GitHub.

Autre possibilité, sans jeton : sur ordinateur avec Chrome ou Edge, **« Travailler avec un dépôt local »** permet d'éditer une copie du dépôt présente sur votre ordinateur ; il faut ensuite envoyer les modifications sur GitHub.

### Ce que l'on peut publier

| Rubrique               | Champs principaux                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Cours et exercices** | titre, type (Cours, Exercices corrigés, Fiche de révision, Méthode, Fascicule), niveau, matière, chapitre, description, date, **PDF** (facultatif), contenu |
| **Vidéos**             | titre, niveau, chapitre, description, date, **lien YouTube**, **lien de téléchargement** (facultatif), durée |
| **Blog**               | titre, résumé, date, catégorie, image de couverture, auteur, article                                  |

Chaque contenu possède une case **« Brouillon »** : cochée, le contenu est enregistré mais **n'apparaît pas** sur le site public.

Le fichier de configuration de l'administration est `public/admin/config.yml`.

---

## 3. Ajouter du contenu en écrivant des fichiers

Chaque contenu est un simple fichier texte au format Markdown (`.md`) :

| Rubrique           | Dossier                   | Adresse de la page                |
| ------------------ | ------------------------- | --------------------------------- |
| Cours et exercices | `src/content/ressources/` | `/ressources/nom-du-fichier/`     |
| Vidéos             | `src/content/videos/`     | liste sur `/videos/`              |
| Blog               | `src/content/blog/`       | `/blog/nom-du-fichier/`           |

Le **nom du fichier** devient l'adresse de la page : utiliser des minuscules, des tirets et pas d'accents (ex. `exercices-loi-d-ohm-4e.md`).

**Des exemples complets sont fournis** dans chaque dossier (fichiers `exemple-…`). Ils sont en brouillon : visibles avec `npm run dev`, jamais publiés. Le plus simple est d'en copier un et de le modifier.

### Exemple : un exercice corrigé

```markdown
---
titre: "Exercices corrigés : la loi d'Ohm"
type: Exercices corrigés
niveau: 4e
matiere: Physique
chapitre: Électricité — loi d'Ohm
description: "Trois exercices progressifs pour maîtriser U = R × I."
date: 2026-10-01
fichier: /documents/exercices-loi-d-ohm.pdf
brouillon: false
---

## Exercice 1

Calculer la tension $U$ aux bornes d'un conducteur ohmique…

:::correction
$U = R \times I = 220 \times 0{,}050 = 11\ \text{V}$
:::
```

La partie entre les deux lignes `---` décrit le contenu ; le texte en dessous est le contenu lui-même.

### Valeurs autorisées

- **type** : `Cours`, `Exercices corrigés`, `Fiche de révision`, `Méthode`, `Fascicule`
- **niveau** : `4e`, `3e`, `Seconde`, `Première`, `Terminale`, `L1`, `L2`, `L3`, `Tous niveaux`
- **matiere** : `Physique-Chimie` (par défaut), `Physique`, `Chimie`
- **date** : au format `AAAA-MM-JJ` (les contenus sont classés du plus récent au plus ancien)

Une valeur non autorisée (ex. `niveau: 5e`) **bloque la publication** avec un message qui indique le fichier et le champ à corriger : le site en ligne n'est donc jamais cassé. Pour ajouter un niveau ou un type, modifier `src/lib/constantes.ts` **et** les listes correspondantes dans `public/admin/config.yml`.

### Fichiers PDF, images et vidéos

- **PDF** : les déposer dans `public/documents/` et indiquer `fichier: /documents/nom-du-fichier.pdf`. Un lien externe (Google Drive…) fonctionne aussi. Garder chaque fichier **sous 25 Mo** (limite de certains hébergeurs).
- **Images** d'un cours ou d'un article : dans `public/images/…`, puis `![Description de l'image](/images/nom.jpg)` dans le texte. Couverture d'un article : `image: /images/blog/nom.jpg`.
- **Vidéos** : ne pas les placer dans le site (fichiers trop lourds). Les publier sur **YouTube** (`youtube:` = lien de la vidéo) et, pour le téléchargement, les déposer sur Google Drive (partage « Tous les utilisateurs disposant du lien ») et coller ce lien dans `telechargement:`. Le lecteur YouTube n'est chargé qu'au clic, pour garder la page rapide.

---

## 4. Écrire les formules, corrections et encadrés

| Pour obtenir…                       | Écrire                                                    |
| ----------------------------------- | --------------------------------------------------------- |
| Une formule dans une phrase         | `$U = R \times I$`                                        |
| Une formule centrée sur sa ligne    | `$$E_c = \frac{1}{2} m v^2$$`                             |
| Une virgule décimale                | `$0{,}050$` (les accolades évitent un espace parasite)    |
| Une unité                           | `$11\ \text{V}$`                                          |
| Une équation chimique               | `$\ce{CH4 + 2O2 -> CO2 + 2H2O}$` (indices automatiques)   |
| Un intertitre                       | `## Exercice 1`                                           |
| Du texte en gras                    | `**important**`                                           |
| Une liste                           | lignes commençant par `- ` ou `1. `                       |

Les tableaux s'écrivent avec des barres verticales : voir l'exemple `src/content/ressources/exemple-fiche-combustions.md`.

**Correction dépliable** (masquée jusqu'au clic de l'élève) :

```markdown
:::correction
Le texte de la correction, avec des formules si besoin.
:::

:::correction[Voir la correction de l'exercice 2]
Titre personnalisé entre crochets.
:::
```

**Encadrés** : `:::definition`, `:::retenir`, `:::attention`, `:::methode`, `:::exemple`, toujours fermés par `:::`.

La syntaxe des formules est celle de LaTeX (bibliothèque [KaTeX](https://katex.org/docs/supported.html)).

---

## 5. Modifier les textes du site

| Élément                                            | Fichier                                   |
| -------------------------------------------------- | ----------------------------------------- |
| Textes de la page d'accueil                        | `src/pages/index.astro`                   |
| Menu (en-tête)                                     | `src/components/Header.astro`             |
| Pied de page                                       | `src/components/Footer.astro`             |
| Introductions des pages Ressources, Vidéos et Blog | `src/pages/ressources/index.astro`, `src/pages/videos/index.astro`, `src/pages/blog/index.astro` |
| Bandeau « Besoin d'un accompagnement ? »           | `src/components/BandeauContact.astro`     |
| Titre et description Google de l'accueil           | `src/layouts/BaseLayout.astro` et `src/pages/index.astro` |

Il suffit de modifier le texte entre les balises, sans toucher aux attributs `class="…"`.

**Messages WhatsApp préremplis** : chaque bouton a un attribut `data-wa="…"` contenant le message. Pour un retour à la ligne dans un message, écrire `&#10;`.

---

## 6. Modifier le numéro WhatsApp ou le lien YouTube

Le numéro actuel est **+221 71 171 53 59** (`https://wa.me/221711715359`) ; la chaîne YouTube est **https://www.youtube.com/@XamXamAcademia**.

1. **`src/lib/constantes.ts`** : `WHATSAPP_NUMERO`, `WHATSAPP_AFFICHAGE` et `YOUTUBE_URL` (utilisés par l'en-tête, le pied de page et les nouvelles pages).
2. **`public/assets/js/main.js`** : bloc `CONFIG` en haut du fichier.
3. **`src/pages/index.astro`** : faire un « Rechercher / Remplacer » de `221711715359` et de `71 171 53 59` (liens de secours et données Google).

Dans un éditeur comme VS Code, *Rechercher dans les fichiers* (Ctrl + Maj + F) sur `221711715359` permet de vérifier qu'il ne reste aucune ancienne valeur.

---

## 7. Logos, photo et images

Toutes les images proviennent des fichiers officiels fournis, détourés et compressés pour le web. Elles se trouvent dans `public/assets/img/` et `public/assets/icons/`.

| Fichier                         | Où il apparaît                                          |
| ------------------------------- | ------------------------------------------------------- |
| `img/logo-horizontal.png`       | En-tête (symbole « X » + nom, sans le slogan)            |
| `img/logo-badge.png`            | Pied de page, étiquette sur la photo, image de partage  |
| `img/fondateur-*.webp` / `.jpg` | Section « À propos » uniquement                         |
| `icons/*`                       | Onglet du navigateur, écran d'accueil mobile            |
| `img/og-image.jpg`              | Aperçu lors d'un partage du lien (1200 × 630 px)        |

Pour remplacer une image, déposer le nouveau fichier **sous le même nom** avec des proportions proches. Une version **SVG** du logo, si elle existe, donnerait un rendu encore plus net.

---

## 8. Couleurs et polices

Les couleurs sont définies une seule fois en haut de `public/assets/css/styles.css` (section `2. VARIABLES`) et reprennent celles du logo :

| Variable      | Couleur   | Usage                                         |
| ------------- | --------- | --------------------------------------------- |
| `--navy-900`  | `#021f4d` | Bleu marine du logo — couleur principale      |
| `--blue-600`  | `#2355d6` | Bleu secondaire — liens, icônes, accents      |
| `--gold-500`  | `#f9b603` | Doré du logo — détails, avec parcimonie       |
| `--green-700` | `#15803d` | Boutons WhatsApp                              |

Polices auto-hébergées (`public/assets/fonts/`, licence SIL Open Font License 1.1) : **Manrope** pour les titres, **Inter** pour les textes.

---

## 9. Mettre le site en ligne

Le site doit être **relié au dépôt GitHub** : l'hébergeur le reconstruit alors automatiquement à chaque modification, y compris celles faites depuis `/admin/`.

Réglages communs : commande de construction **`npm run build`**, dossier publié **`dist`**, Node.js **22**.

### Netlify

*Add new site → Import an existing project → GitHub*, choisir le dépôt. Les réglages sont lus automatiquement dans `netlify.toml`.

### Vercel

Sur [vercel.com/new](https://vercel.com/new), importer le dépôt : Astro est détecté automatiquement (Framework Preset : **Astro**).

### Cloudflare Pages

*Workers & Pages → Create → Pages → Connect to Git*, choisir le dépôt, puis :

- Framework preset : **Astro**
- Build command : `npm run build`
- Build output directory : `dist`
- Variable d'environnement : `NODE_VERSION` = `22`

Le fichier `public/_headers` (en-têtes de sécurité et mise en cache) est pris en compte par Netlify et Cloudflare Pages.

### Adresse du site

L'adresse publique du site sert à l'aperçu de partage (WhatsApp, Facebook…), aux adresses canoniques et au plan du site pour Google :

- **sur Netlify et Vercel**, elle est **détectée automatiquement** : rien à faire ;
- **sur Cloudflare Pages, ou avec votre propre nom de domaine**, ajoutez dans les réglages de l'hébergeur la variable d'environnement `SITE_URL` avec l'adresse complète (ex. `https://www.xamxamacademy.com`), puis relancez un déploiement.

> **Branche publiée.** L'hébergeur et l'administration utilisent la branche principale du dépôt (`main`). Les modifications préparées sur une autre branche doivent y être fusionnées pour apparaître en ligne.

---

## 10. Après la mise en ligne

1. Vérifier que l'adresse du site est connue (voir « Adresse du site » ci-dessus) : la page `https://votre-site/robots.txt` doit afficher une ligne `Sitemap:`.
2. Déclarer le site dans [Google Search Console](https://search.google.com/search-console) et y soumettre le plan du site : `https://votre-site/sitemap-index.xml`.
3. Tester l'aperçu de partage avec le [débogueur de partage Facebook](https://developers.facebook.com/tools/debug/) (également utilisé par WhatsApp).

---

## 11. Structure des fichiers

```
├── astro.config.mjs          ← configuration (formules, encadrés, adresse du site, plan du site)
├── package.json              ← outils et commandes (npm run dev / build)
├── netlify.toml              ← réglages Netlify
├── public/                   ← fichiers copiés tels quels
│   ├── admin/                ← interface d'administration (config.yml)
│   ├── assets/               ← CSS, JavaScript, polices, logos, photo, icônes
│   ├── documents/            ← PDF téléchargeables
│   ├── images/               ← images des cours et du blog
│   └── site.webmanifest, _headers
├── src/
│   ├── content/              ← LES CONTENUS (un fichier .md par cours, vidéo, article)
│   │   ├── ressources/
│   │   ├── videos/
│   │   └── blog/
│   ├── content.config.ts     ← champs autorisés pour chaque type de contenu
│   ├── pages/                ← pages du site (accueil, ressources, vidéos, blog, 404, robots.txt)
│   ├── components/           ← éléments réutilisables (en-tête, pied de page, cartes…)
│   ├── layouts/              ← gabarit commun à toutes les pages
│   ├── lib/                  ← constantes, outils, traitement des encadrés et formules
│   └── scripts/              ← filtres et lecteur vidéo
└── dist/                     ← site généré (ne pas modifier, recréé à chaque build)
```

---

## 12. En cas de problème

- **La publication échoue** : le journal de l'hébergeur (ou de `npm run build`) indique le fichier et le champ en cause, par exemple `niveau: Invalid option`. Corriger la valeur et enregistrer à nouveau. Pendant ce temps, la version précédente du site reste en ligne.
- **Une formule s'affiche en rouge** : sa syntaxe LaTeX est incorrecte (accolade manquante, commande inconnue…).
- **Une modification de configuration ne semble pas prise en compte en local** : supprimer les dossiers `.astro` et `node_modules/.astro`, puis relancer `npm run dev`.

---

**Principe éditorial :** le site ne mentionne ni témoignages, ni statistiques, ni taux de réussite, ni prix, ni diplômes. Toute information de ce type ajoutée plus tard doit être réelle et vérifiable.
