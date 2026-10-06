---
titre: "Première S2 — Amplificateur opérationnel : dérivateur et intégrateur"
type: "Cours"
niveau: "Première"
serie: "S2"
matiere: "Physique"
chapitre: "P9 — Amplificateur opérationnel : dérivateur et intégrateur"
ordre: 9
description: "Notions, méthode, 3 applications corrigées et 6 questions de révision interactive : Première S2 — Amplificateur opérationnel : dérivateur et intégrateur."
date: "2026-10-06"
brouillon: false
---

**Cours de révision original Xam Xam Academy — Première S2.** Le thème est repéré dans le [sommaire du fascicule de la cellule de sciences physiques de Kaolack](https://fr.scribd.com/document/790936299/Fascicule-Pc-1s2-Kaolack-Commune), consulté sur une copie hébergée par un tiers. Ce document de 2018–2019 sert au repérage des chapitres ; il ne certifie pas à lui seul les aménagements de l’année en cours. Les textes et exercices ci-dessous sont des créations pédagogiques.

## Les notions essentielles
Les montages à amplificateur opérationnel peuvent réaliser approximativement des opérations temporelles. Pour un dérivateur inverseur idéal, u_s=−RC du_e/dt. Pour un intégrateur inverseur idéal, du_s/dt=−u_e/(RC), et la sortie dépend aussi de sa valeur initiale. Le modèle suppose un régime linéaire et un domaine de fréquences adapté ; les circuits réels utilisent souvent des composants de stabilisation.

## Méthode
Identifier le montage, vérifier les unités RC en secondes puis dériver ou intégrer le signal avec sa condition initiale.

:::attention
Le modèle idéal ne garantit pas une sortie infinie : l’alimentation limite la tension de sortie.
:::

## Exercice 1 — Application
Un dérivateur a RC=0,010 s ; u_e(t)=2t V avec t en secondes. Sortie idéale ?

:::correction
du_e/dt=2 V/s. u_s=−0,010 × 2=−0,020 V.
:::

## Exercice 2 — Aller plus loin
Un intégrateur a RC=0,20 s, entrée constante 1 V et u_s(0)=0. Sortie à 0,10 s ?

:::correction
du_s/dt=−1/0,20=−5 V/s. u_s(0,10)=−0,50 V, si le régime linéaire est respecté.
:::

## Pour progresser
Refaites les exercices sans consulter les solutions. Justifiez les conditions du modèle, les signes et les unités. Cette fiche traite les bases du chapitre ; complétez-la avec le cours et les travaux pratiques encadrés de votre professeur.

[Retrouver mon parcours](/parcours/) · [Rejoindre les cours en ligne](/cours-en-ligne/)

<!-- xam-revision:start -->
## Mon objectif de révision
À la fin de ce chapitre, vous devez pouvoir **expliquer les notions**, **choisir une démarche justifiée** et **résoudre les applications sans consulter les corrigés**. Un résultat seul ne suffit pas : indiquez la propriété utilisée et ses conditions d’application.

## Révision active — comprendre avant de calculer
Fermez vos notes pendant quelques minutes. Répondez aux trois questions suivantes sur une feuille, puis ouvrez les corrections. Une explication reproduite sans être comprise est un point à retravailler.

### 1. Quelles sont les notions essentielles ?
Expliquez les idées du chapitre avec vos mots et distinguez les grandeurs ou les objets étudiés.

:::correction
Les montages à amplificateur opérationnel peuvent réaliser approximativement des opérations temporelles. Pour un dérivateur inverseur idéal, u_s=−RC du_e/dt. Pour un intégrateur inverseur idéal, du_s/dt=−u_e/(RC), et la sortie dépend aussi de sa valeur initiale. Le modèle suppose un régime linéaire et un domaine de fréquences adapté ; les circuits réels utilisent souvent des composants de stabilisation.
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
Identifier le montage, vérifier les unités RC en secondes puis dériver ou intégrer le signal avec sa condition initiale.
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
Le modèle idéal ne garantit pas une sortie infinie : l’alimentation limite la tension de sortie.
:::

## Exercice 3 — Transfert et justification
Pour un montage inverseur idéal, R_f=20 kΩ et R_e=10 kΩ. Quel gain et quelle sortie pour U_e=0,5 V ?

:::correction
En régime linéaire avec rétroaction négative, G=−R_f/R_e=−2. Donc U_s=−1 V. Le signe traduit l’inversion. Cette formule ne convient pas à un montage saturé ; il faut vérifier les limites de l’alimentation.
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — 6 questions](/quiz/premiere-s2-aop-derivee-integrale/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
<!-- xam-revision:end -->
