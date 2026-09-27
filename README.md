# Xam Xam Academy — Site vitrine

> **Comprendre. Progresser. Réussir.**

Site vitrine de **Xam Xam Academy** : cours de Physique-Chimie à domicile (Dakar, Thiès), cours de renforcement et cours en ligne (Xam Xam Online), du collège jusqu'à l'enseignement supérieur.

Le site est conçu pour transformer les visiteurs en prospects via **WhatsApp** : tous les boutons d'action ouvrent une conversation avec un message déjà rédigé.

- HTML5, CSS et JavaScript léger : **aucune dépendance, aucune étape de compilation, aucun serveur**.
- Responsive (priorité mobile), accessible (navigation clavier, contrastes AA, lecteurs d'écran).
- Scores Lighthouse mesurés : **98–100** en performance, **100** en accessibilité, bonnes pratiques et SEO.

---

## Sommaire

1. [Structure des fichiers](#1-structure-des-fichiers)
2. [Lancer le site en local](#2-lancer-le-site-en-local)
3. [Modifier les textes](#3-modifier-les-textes)
4. [Modifier le numéro WhatsApp](#4-modifier-le-numéro-whatsapp)
5. [Remplacer les images (logo, photo, favicon…)](#5-remplacer-les-images)
6. [Activer le bouton « Découvrir nos contenus »](#6-activer-le-bouton--découvrir-nos-contenus-)
7. [Couleurs et polices](#7-couleurs-et-polices)
8. [Déployer le site](#8-déployer-le-site)
9. [Après la mise en ligne](#9-après-la-mise-en-ligne)

---

## 1. Structure des fichiers

```
Xam-Xam-Academy-website/
├── index.html              ← la page du site (tous les textes sont ici)
├── 404.html                ← page « introuvable »
├── robots.txt              ← consignes pour les moteurs de recherche
├── site.webmanifest        ← icônes et couleur pour mobile
├── _headers                ← en-têtes de sécurité (Netlify / Cloudflare Pages)
├── README.md
└── assets/
    ├── css/
    │   └── styles.css      ← toute la mise en forme (couleurs, tailles, mise en page)
    ├── js/
    │   └── main.js         ← configuration (WhatsApp…) et interactions
    ├── fonts/              ← polices auto-hébergées (Manrope, Inter)
    ├── icons/              ← favicon et icônes d'application
    │   ├── favicon.svg
    │   ├── favicon-32.png
    │   ├── apple-touch-icon.png
    │   ├── icon-192.png
    │   └── icon-512.png
    └── img/
        └── og-image.jpg    ← image affichée lors d'un partage (WhatsApp, Facebook…)
```

Sections de la page (dans l'ordre) et leur identifiant dans `index.html` :

| Section                     | Identifiant       |
| --------------------------- | ----------------- |
| Accueil (hero)              | `#accueil`        |
| Nos cours                   | `#cours`          |
| Niveaux                     | `#niveaux`        |
| Notre méthode               | `#methode`        |
| Xam Xam Online              | `#online`         |
| Comment ça marche ?         | `#fonctionnement` |
| Contenus pédagogiques       | `#contenus`       |
| À propos                    | `#a-propos`       |
| Parents                     | `#parents`        |
| FAQ                         | `#faq`            |
| Contact (+ formulaire)      | `#contact`        |

---

## 2. Lancer le site en local

**Option la plus simple :** double-cliquer sur `index.html`. Le site s'ouvre dans le navigateur et fonctionne entièrement.

**Option recommandée (serveur local, comportement identique à la mise en ligne)** — depuis le dossier du projet :

```bash
# Avec Python (déjà installé sur macOS et la plupart des Linux)
python3 -m http.server 8000
# puis ouvrir http://localhost:8000

# ou avec Node.js
npx serve .
# puis ouvrir l'adresse affichée (http://localhost:3000)
```

> La page `404.html` utilise des chemins absolus (`/assets/...`) : elle ne s'affiche correctement que via un serveur, pas en double-cliquant dessus.

---

## 3. Modifier les textes

Tous les textes se trouvent dans **`index.html`**. Chaque section est précédée d'un grand commentaire, par exemple :

```html
<!-- =================================================================
     NOS COURS
     ================================================================= -->
```

Il suffit de rechercher le texte à changer (Ctrl + F / Cmd + F) et de le remplacer entre les balises, sans toucher aux attributs `class="..."`.

Quelques repères :

- **Titre et description Google** : balises `<title>` et `<meta name="description">` en haut du fichier (ainsi que `og:title` et `og:description` pour les partages).
- **Messages WhatsApp préremplis** : chaque bouton possède un attribut `data-wa="..."` contenant le message. Exemple :
  ```html
  <a ... data-wa="Bonjour Xam Xam Academy, je souhaite réserver un accompagnement en Physique-Chimie.">
  ```
  Modifier simplement le texte entre guillemets. Pour un retour à la ligne dans le message, écrire `&#10;`.
- **Formulaire de contact** : les listes « Classe », « Ville » et « Type de cours » sont des balises `<option>` ; on peut en ajouter ou en retirer librement. Le texte du message WhatsApp généré est défini dans `assets/js/main.js` (fonction `initContactForm`).
- **FAQ** : chaque question est un bloc `<details class="faq__item">` ; copier-coller un bloc pour ajouter une question.
- **Espaces insécables** : `&nbsp;` avant `:`, `?`, `!` et à l'intérieur des guillemets « » évite qu'un signe se retrouve seul en début de ligne (typographie française).

---

## 4. Modifier le numéro WhatsApp

Le numéro actuel est **+221 71 171 53 59** (lien : `https://wa.me/221711715359`).

**Étape 1 — la configuration** (utilisée par tous les boutons) : ouvrir `assets/js/main.js` et modifier le bloc `CONFIG` en haut du fichier :

```js
var CONFIG = {
  whatsappNumber: '221711715359',       // indicatif + numéro, sans « + » ni espaces
  whatsappDisplay: '+221 71 171 53 59', // tel qu'affiché aux visiteurs
  contentsUrl: ''
};
```

**Étape 2 — les valeurs de secours** dans `index.html` (utilisées si le JavaScript est désactivé, et par Google via les données structurées) : faire un « Rechercher / Remplacer tout » :

- `221711715359` → nouveau numéro sans espaces (liens `wa.me` et données structurées) ;
- `+221 71 171 53 59` → nouveau numéro affiché.

Sous macOS / Linux, en une commande depuis le dossier du projet (adapter les deux numéros) :

```bash
sed -i.bak 's/221711715359/221XXXXXXXXX/g; s/+221 71 171 53 59/+221 XX XXX XX XX/g' index.html assets/js/main.js && rm -f *.bak assets/js/*.bak
```

---

## 5. Remplacer les images

Le projet ne contenait ni logo ni photo : **aucun faux logo n'a été créé**. En attendant le logo officiel, le nom « Xam Xam Academy » est simplement écrit en texte stylisé.

### Logo

1. Déposer le fichier dans `assets/img/` (idéalement `logo.svg`, sinon un PNG d'environ 340 × 80 px), ainsi qu'une version claire pour le pied de page (`logo-blanc.svg`).
2. Dans `index.html`, deux emplacements sont signalés par le commentaire `<!-- LOGO ... -->` (en-tête et pied de page). Remplacer les deux `<span>` qui suivent par la balise indiquée dans le commentaire, par exemple :
   ```html
   <img src="assets/img/logo.svg" alt="Xam Xam Academy" width="170" height="40">
   ```
   Adapter `width` / `height` aux proportions réelles du logo (la hauteur affichée est limitée à 40 px par le CSS).

### Photo du fondateur (section « À propos » uniquement)

1. Déposer la photo dans `assets/img/fondateur.jpg` (format portrait, environ 1120 × 1280 px, compressée — idéalement moins de 250 Ko ; un outil comme [Squoosh](https://squoosh.app) permet de l'optimiser).
2. Dans `index.html`, repérer le commentaire `<!-- PHOTO DU FONDATEUR ... -->` dans la section À propos et suivre l'instruction : remplacer le contenu du bloc `about__visual` par la balise `<img>` fournie (déjà prête, avec chargement différé `loading="lazy"`).

### Favicon (icône de l'onglet)

Le favicon actuel est un **monogramme provisoire « XX »** sur fond bleu marine. Pour utiliser le logo officiel, remplacer les fichiers de `assets/icons/` en conservant les mêmes noms et dimensions :

| Fichier                | Dimensions        |
| ---------------------- | ----------------- |
| `favicon.svg`          | vectoriel (carré) |
| `favicon-32.png`       | 32 × 32 px        |
| `apple-touch-icon.png` | 180 × 180 px      |
| `icon-192.png`         | 192 × 192 px      |
| `icon-512.png`         | 512 × 512 px      |

Le site [realfavicongenerator.net](https://realfavicongenerator.net) génère toutes ces tailles à partir d'une seule image.

### Image de partage (Open Graph)

`assets/img/og-image.jpg` (1200 × 630 px) s'affiche quand le lien du site est partagé sur WhatsApp, Facebook ou LinkedIn. On peut la remplacer par une autre image aux mêmes dimensions (par exemple avec le logo officiel).

---

## 6. Activer le bouton « Découvrir nos contenus »

Le bouton de la section « Apprendre aussi en dehors des cours » est **désactivé** avec la mention « Bientôt disponible », car aucune adresse YouTube n'a encore été fournie.

Pour l'activer, renseigner l'adresse dans `assets/js/main.js` :

```js
contentsUrl: 'https://www.youtube.com/@votre-chaine'
```

Le bouton devient alors cliquable (ouverture dans un nouvel onglet) et la mention « Bientôt disponible » disparaît automatiquement.

---

## 7. Couleurs et polices

Toutes les couleurs sont définies une seule fois en haut de `assets/css/styles.css` (section `2. VARIABLES`) :

| Variable      | Couleur   | Usage                                         |
| ------------- | --------- | --------------------------------------------- |
| `--navy-900`  | `#0b1f3a` | Bleu marine profond — couleur principale      |
| `--blue-600`  | `#2355d6` | Bleu secondaire — liens, icônes, accents      |
| `--gold-500`  | `#c8a04a` | Doré — détails décoratifs, avec parcimonie    |
| `--green-700` | `#15803d` | Boutons WhatsApp (contraste AA garanti)       |
| `--bg-soft`   | `#f6f8fc` | Fond des sections alternées                   |

Modifier une variable met à jour tout le site. Le doré n'est jamais utilisé pour du texte sur fond blanc (contraste insuffisant).

**Polices** (auto-hébergées dans `assets/fonts/`, aucune requête vers Google) :

- **Manrope** pour les titres,
- **Inter** pour les textes.

Toutes deux sont sous licence libre SIL Open Font License 1.1.

---

## 8. Déployer le site

Le site est entièrement statique : **aucune commande de build**, le dossier racine est publié tel quel.

### Netlify

- **Glisser-déposer (le plus rapide)** : aller sur [app.netlify.com/drop](https://app.netlify.com/drop) et déposer le dossier du projet. Le site est en ligne en quelques secondes.
- **Depuis GitHub (mises à jour automatiques)** : *Add new site → Import an existing project → GitHub*, choisir ce dépôt, puis :
  - Build command : *(laisser vide)*
  - Publish directory : `.`

Le fichier `_headers` est pris en compte automatiquement.

### Vercel

1. Sur [vercel.com/new](https://vercel.com/new), importer ce dépôt GitHub.
2. Framework Preset : **Other** ; Build Command : *(vide)* ; Output Directory : *(vide ou `.`)*.
3. Cliquer sur **Deploy**.

En ligne de commande : `npx vercel` depuis le dossier du projet.

### Cloudflare Pages

1. Dans le tableau de bord Cloudflare : *Workers & Pages → Create → Pages*.
2. Soit **Connect to Git** (choisir ce dépôt), avec Framework preset : **None**, Build command : *(vide)*, Build output directory : `/`.
3. Soit **Upload assets** pour déposer directement le dossier du projet.

En ligne de commande : `npx wrangler pages deploy .`

### Nom de domaine

Chaque hébergeur permet d'associer gratuitement un nom de domaine personnalisé (ex. `xamxamacademy.com`) depuis ses paramètres « Domains », avec certificat HTTPS automatique.

---

## 9. Après la mise en ligne

Une fois l'adresse définitive connue, dans `index.html` :

1. **Décommenter la balise `canonical`** et y mettre l'adresse du site.
2. **Rendre l'image de partage absolue** : remplacer `content="assets/img/og-image.jpg"` par `content="https://www.votre-domaine.com/assets/img/og-image.jpg"` (certains réseaux n'acceptent pas les chemins relatifs).
3. Optionnel : créer un `sitemap.xml` et l'indiquer dans `robots.txt`, puis déclarer le site dans [Google Search Console](https://search.google.com/search-console).

Tester ensuite l'aperçu de partage avec le [débogueur de partage Facebook](https://developers.facebook.com/tools/debug/) (également utilisé par WhatsApp).

---

## Éléments restant à personnaliser

- [ ] Logo officiel (en-tête, pied de page, favicon, image de partage)
- [ ] Photo du fondateur (section À propos) — facultatif
- [ ] Adresse de la chaîne YouTube (`CONFIG.contentsUrl`)
- [ ] Adresse définitive du site (`canonical`, `og:image`, sitemap)

**Principe éditorial :** le site ne mentionne volontairement ni témoignages, ni statistiques, ni taux de réussite, ni prix, ni diplômes. Toute information de ce type ajoutée plus tard doit être réelle et vérifiable.
