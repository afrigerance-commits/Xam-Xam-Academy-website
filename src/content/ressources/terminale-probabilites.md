---
titre: "S — Probabilités conditionnelles et loi binomiale"
type: "Cours"
niveau: "Terminale"
matiere: "Mathématiques"
chapitre: "S — Probabilités conditionnelles et loi binomiale"
description: "Notions, méthode, 3 applications corrigées et 6 questions de révision interactive : S — Probabilités conditionnelles et loi binomiale."
date: "2026-10-06"
brouillon: false
---

**Cours de révision original Xam Xam Academy.** Thème à rapprocher du [programme Maths publié par l’Office du Bac](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Maths-LS.pdf). Les pages portant la mention S visent les séries scientifiques. Cette fiche traite les bases du chapitre ; la profondeur attendue dépend de la série.

## Comprendre le chapitre
Pour P(B)>0, P(A|B)=P(A∩B)/P(B). L’indépendance vérifie P(A∩B)=P(A)P(B). Une loi binomiale modélise le nombre de succès dans n essais indépendants de même probabilité p : P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ. Son espérance vaut np. Un arbre pondéré multiplie les probabilités le long d’un chemin et additionne celles de chemins disjoints.

## Méthode de résolution
Décrire l’expérience, vérifier indépendance et stabilité de p, puis identifier l’événement exact ou son complément.

:::attention
La formule binomiale nécessite des essais indépendants ; un tirage sans remise ne satisfait pas automatiquement cette hypothèse.
:::

## Exercice 1 — Application
Une pièce équilibrée est lancée 3 fois. Probabilité d’exactement 2 faces ?

:::correction
C(3,2)(1/2)²(1/2)=3/8.
:::

## Exercice 2 — Raisonnement
Un succès a une probabilité 0,2 sur chacun de 3 essais indépendants. Probabilité d’au moins un succès ?

:::correction
Complément de zéro succès : 1−0,8³=1−0,512=0,488.
:::

## Vérifier ses acquis
Refaites les deux exercices sans lire les solutions. Pour chaque réponse, expliquez la règle utilisée et contrôlez les unités ou les conditions d’application.

[Retrouver les chapitres de ma classe](/parcours/) · [Cours en ligne avec accompagnement](/cours-en-ligne/)

<!-- xam-revision:start -->
## Mon objectif de révision
À la fin de ce chapitre, vous devez pouvoir **expliquer les notions**, **choisir une démarche justifiée** et **résoudre les applications sans consulter les corrigés**. Un résultat seul ne suffit pas : indiquez la propriété utilisée et ses conditions d’application.

## Révision active — comprendre avant de calculer
Fermez vos notes pendant quelques minutes. Répondez aux trois questions suivantes sur une feuille, puis ouvrez les corrections. Une explication reproduite sans être comprise est un point à retravailler.

### 1. Quelles sont les notions essentielles ?
Expliquez les idées du chapitre avec vos mots et distinguez les grandeurs ou les objets étudiés.

:::correction
Pour P(B)>0, P(A|B)=P(A∩B)/P(B). L’indépendance vérifie P(A∩B)=P(A)P(B). Une loi binomiale modélise le nombre de succès dans n essais indépendants de même probabilité p : P(X=k)=C(n,k)pᵏ(1−p)ⁿ⁻ᵏ. Son espérance vaut np. Un arbre pondéré multiplie les probabilités le long d’un chemin et additionne celles de chemins disjoints.
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
Décrire l’expérience, vérifier indépendance et stabilité de p, puis identifier l’événement exact ou son complément.
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
La formule binomiale nécessite des essais indépendants ; un tirage sans remise ne satisfait pas automatiquement cette hypothèse.
:::

## Exercice 3 — Transfert et justification
Deux événements indépendants ont P(A)=0,4 et P(B)=0,5. Calculer P(A∩B).

:::correction
L’indépendance donne P(A∩B)=P(A)P(B)=0,20. Elle doit être donnée ou démontrée ; elle ne résulte pas du simple fait que deux événements sont distincts. Des événements incompatibles de probabilités non nulles ne sont pas indépendants.
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — 6 questions](/quiz/terminale-probabilites/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
<!-- xam-revision:end -->
