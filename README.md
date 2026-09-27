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
5. [Logos, photo et images](#5-logos-photo-et-images)
6. [Modifier le lien YouTube](#6-modifier-le-lien-youtube)
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
    ├── icons/              ← favicon et icônes d'application (symbole « X » du logo)
    │   ├── favicon.ico
    │   ├── favicon-32.png
    │   ├── apple-touch-icon.png
    │   ├── icon-192.png
    │   └── icon-512.png
    └── img/
        ├── logo-horizontal.png   ← logo de l'en-tête et de la page 404
        ├── logo-badge.png        ← logo rond : pied de page et étiquette de la photo
        ├── fondateur-480.webp    ← photo du fondateur (section À propos)
        ├── fondateur-800.webp
        ├── fondateur-800.jpg     ← version de secours pour les anciens navigateurs
        └── og-image.jpg          ← image affichée lors d'un partage (WhatsApp, Facebook…)
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
  whatsappDisplay: '+221 71 171 53 59'  // tel qu'affiché aux visiteurs
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

## 5. Logos, photo et images

Toutes les images du site proviennent des fichiers officiels fournis (photo, logo rond, logo complet). Elles ont été détourées (fond transparent), recadrées et compressées pour le web.

| Fichier                         | Provenance                                             | Où il apparaît                              |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------- |
| `img/logo-horizontal.png`       | Symbole « X » + nom « XamXam Academy » du logo complet, placés côte à côte (sans le slogan) | En-tête, page 404 |
| `img/logo-badge.png`            | Logo rond, coins rendus transparents                   | Pied de page, étiquette sur la photo, image de partage |
| `img/fondateur-*.webp` / `.jpg` | Photo du fondateur, recadrée au format 4:5             | Section « À propos » uniquement             |
| `icons/*`                       | Symbole « X » du logo sur fond blanc                   | Onglet du navigateur, écran d'accueil mobile |
| `img/og-image.jpg`              | Composition avec le logo rond (1200 × 630 px)          | Aperçu lors d'un partage du lien            |

**Pour remplacer une image**, déposer le nouveau fichier en conservant **le même nom** et des proportions proches :

- **Logo de l'en-tête** : image horizontale à fond transparent, environ 540 × 120 px. Si les proportions changent, adapter `width` / `height` de la balise `<img class="brand__logo">` dans `index.html` (et dans `404.html`). La hauteur affichée est fixée par le CSS (40 px sur mobile, 46 px sur ordinateur). Une version **SVG** du logo, si elle existe, donnerait un rendu encore plus net : il suffit alors de remplacer `logo-horizontal.png` par `logo-horizontal.svg` dans les deux fichiers HTML.
- **Logo rond** : image carrée à fond transparent, environ 256 × 256 px.
- **Photo du fondateur** : format portrait 4:5 (par exemple 800 × 1000 px). Remplacer les trois fichiers `fondateur-480.webp`, `fondateur-800.webp` et `fondateur-800.jpg` ; un outil comme [Squoosh](https://squoosh.app) permet de redimensionner et de convertir en WebP.
- **Favicons** : le site [realfavicongenerator.net](https://realfavicongenerator.net) génère toutes les tailles (`favicon.ico`, 32, 180, 192 et 512 px) à partir d'une seule image.

---

## 6. Modifier le lien YouTube

La chaîne **https://www.youtube.com/@XamXamAcademia** est reliée à trois endroits de `index.html` :

- le bouton « Découvrir nos contenus » (section Contenus pédagogiques) ;
- le lien YouTube du pied de page ;
- les données structurées (`"sameAs"`) lues par Google.

Pour changer d'adresse, faire un « Rechercher / Remplacer tout » de `https://www.youtube.com/@XamXamAcademia` dans `index.html` (penser aussi au texte `@XamXamAcademia` affiché dans le pied de page).

---

## 7. Couleurs et polices

Toutes les couleurs sont définies une seule fois en haut de `assets/css/styles.css` (section `2. VARIABLES`) :

| Variable      | Couleur   | Usage                                         |
| ------------- | --------- | --------------------------------------------- |
| `--navy-900`  | `#021f4d` | Bleu marine du logo — couleur principale      |
| `--blue-600`  | `#2355d6` | Bleu secondaire — liens, icônes, accents      |
| `--gold-500`  | `#f9b603` | Doré du logo — détails, avec parcimonie       |
| `--green-700` | `#15803d` | Boutons WhatsApp (contraste AA garanti)       |
| `--bg-soft`   | `#f6f8fc` | Fond des sections alternées                   |

Le bleu marine et le doré reprennent exactement les couleurs du logo. Modifier une variable met à jour tout le site. Le doré n'est jamais utilisé pour du texte sur fond blanc (contraste insuffisant).

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
3. **Compléter les données structurées** (bloc `application/ld+json` en haut de la page) avec `"url": "https://www.votre-domaine.com/"` et `"logo": "https://www.votre-domaine.com/assets/img/logo-badge.png"`.
4. Optionnel : créer un `sitemap.xml` et l'indiquer dans `robots.txt`, puis déclarer le site dans [Google Search Console](https://search.google.com/search-console).

Tester ensuite l'aperçu de partage avec le [débogueur de partage Facebook](https://developers.facebook.com/tools/debug/) (également utilisé par WhatsApp).

---

## Éléments restant à personnaliser

- [x] Logo officiel (en-tête, pied de page, favicon, image de partage)
- [x] Photo du fondateur (section À propos)
- [x] Chaîne YouTube
- [ ] Adresse définitive du site (`canonical`, `og:image`, données structurées, sitemap)
- [ ] Optionnel : version SVG du logo pour un rendu parfaitement net sur tous les écrans

**Principe éditorial :** le site ne mentionne volontairement ni témoignages, ni statistiques, ni taux de réussite, ni prix, ni diplômes. Toute information de ce type ajoutée plus tard doit être réelle et vérifiable.
