---
titre: "Dérivation : construire un tableau de variations"
type: "Cours"
niveau: "Terminale"
matiere: "Mathématiques"
chapitre: "Analyse — dérivation"
description: "Notions, méthode, 4 applications corrigées et 7 questions de révision interactive : Dérivation : construire un tableau de variations."
date: "2026-10-06"
brouillon: false
---

**Cours original de consolidation, destiné aux Terminales scientifiques.** Le choix exact des notions dépend de la série.

## Dérivée et variations
Sur un intervalle, le signe de $f'$ permet d’étudier les variations de $f$. Si $f'>0$, $f$ est strictement croissante ; si $f'<0$, elle est strictement décroissante. Une dérivée nulle en un point ne suffit pas, seule, à prouver un extremum.

## Règles à maîtriser
$(x^n)'=nx^{n-1}$ ; $(u+v)'=u'+v'$ ; $(uv)'=u'v+uv'$.
Pour $v\ne0$, $(u/v)'=(u'v-uv')/v^2$.
$(e^x)'=e^x$ et $(\ln x)'=1/x$ pour $x>0$.

## Méthode
Déterminer le domaine ; calculer et simplifier $f'$ ; étudier son signe ; préciser les valeurs aux points critiques et les limites aux bornes si nécessaires ; dresser le tableau.

## Exercice 1
Étudier les variations de $f(x)=x^2-4x+3$ sur $\mathbb R$.
:::correction
$f'(x)=2x-4$, négative pour $x<2$ et positive pour $x>2$. $f$ décroît jusqu’à 2 puis croît. Son minimum vaut $f(2)=-1$. Les limites en $\pm\infty$ valent $+\infty$.
:::

## Exercice 2
Étudier $g(x)=\ln x-x$ sur son domaine.
:::correction
Domaine : $]0,+\infty[$. $g'(x)=1/x-1=(1-x)/x$. Le dénominateur est positif. $g$ croît jusqu’à 1 puis décroît ; maximum $g(1)=-1$. Les limites en $0^+$ et en $+\infty$ sont $-\infty$.
:::

## Exercice 3
Donner l’équation de la tangente à $f(x)=x^2$ au point d’abscisse 3.
:::correction
$y=f'(3)(x-3)+f(3)=6(x-3)+9=6x-9$.
:::

:::attention
Toujours annoncer le domaine avant de diviser par une expression ou d’utiliser un logarithme. Ne pas confondre les valeurs de $f$ et celles de $f'$.
:::

<!-- xam-revision:start -->
## Mon objectif de révision
À la fin de ce chapitre, vous devez pouvoir **expliquer les notions**, **choisir une démarche justifiée** et **résoudre les applications sans consulter les corrigés**. Un résultat seul ne suffit pas : indiquez la propriété utilisée et ses conditions d’application.

## Révision active — comprendre avant de calculer
Fermez vos notes pendant quelques minutes. Répondez aux trois questions suivantes sur une feuille, puis ouvrez les corrections. Une explication reproduite sans être comprise est un point à retravailler.

### 1. Quelles sont les notions essentielles ?
Expliquez les idées du chapitre avec vos mots et distinguez les grandeurs ou les objets étudiés.

:::correction
Sur un intervalle, le signe de $f'$ permet d’étudier les variations de $f$. Si $f'>0$, $f$ est strictement croissante ; si $f'<0$, elle est strictement décroissante. Une dérivée nulle en un point ne suffit pas, seule, à prouver un extremum.

$(x^n)'=nx^{n-1}$ ; $(u+v)'=u'+v'$ ; $(uv)'=u'v+uv'$.
Pour $v\ne0$, $(u/v)'=(u'v-uv')/v^2$.
$(e^x)'=e^x$ et $(\ln x)'=1/x$ pour $x>0$.
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
Déterminer le domaine ; calculer et simplifier $f'$ ; étudier son signe ; préciser les valeurs aux points critiques et les limites aux bornes si nécessaires ; dresser le tableau.
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
Toujours annoncer le domaine avant de diviser par une expression ou d’utiliser un logarithme. Ne pas confondre les valeurs de $f$ et celles de $f'$.
:::

## Exercice 4 — Transfert et justification
Pour f(x)=x³−3x, donner les points critiques et préciser si chacun est un extremum.

:::correction
f′(x)=3x²−3=3(x−1)(x+1). Le signe passe de positif à négatif en −1 : maximum local f(−1)=2. Il passe de négatif à positif en 1 : minimum local f(1)=−2. Le changement de signe, et pas seulement f′=0, justifie les extrema.
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — 7 questions](/quiz/terminale-derivation/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
<!-- xam-revision:end -->
