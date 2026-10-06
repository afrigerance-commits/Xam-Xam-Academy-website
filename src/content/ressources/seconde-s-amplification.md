---
titre: "Seconde S — Amplificateur opérationnel : amplification d’une tension"
type: "Cours"
niveau: "Seconde"
serie: "S"
matiere: "Physique"
chapitre: "P7 — Amplificateur opérationnel : amplification d’une tension"
ordre: 7
description: "Notions, méthode, 3 applications corrigées et 6 questions de révision interactive : Seconde S — Amplificateur opérationnel : amplification d’une tension."
date: "2026-10-06"
brouillon: false
---

**Cours de révision original Xam Xam Academy — Seconde S.** Le thème est repéré dans le [sommaire du fascicule de la cellule de sciences physiques de Kaolack](https://fr.scribd.com/document/729724766/Fascicule-2s-Kaolack-Commune), consulté sur une copie hébergée par un tiers. Ce document de 2017–2018 sert au repérage des chapitres ; il ne certifie pas à lui seul les aménagements de l’année en cours. Les textes et exercices ci-dessous sont des créations pédagogiques.

## Les notions essentielles
Un amplificateur opérationnel possède deux entrées et une sortie, et nécessite une alimentation. Dans le modèle idéal en régime linéaire avec contre-réaction négative, les courants d’entrée sont nuls et les tensions d’entrée égales. Le montage inverseur donne u_s=−(R₂/R₁)u_e ; le non-inverseur donne u_s=(1+R₂/R₁)u_e. La sortie réelle reste limitée par l’alimentation et le composant.

## Méthode
Identifier le montage et la contre-réaction, calculer le gain puis vérifier que la sortie prévue reste dans le régime linéaire.

:::attention
Les tensions d’entrée ne sont égales que dans les conditions du modèle linéaire, pas dans tous les régimes.
:::

## Exercice 1 — Application
Inverseur avec R₁=10 kΩ, R₂=30 kΩ et u_e=0,20 V. Sortie ?

:::correction
Gain=−30/10=−3. u_s=−0,60 V, si l’alimentation permet cette tension.
:::

## Exercice 2 — Aller plus loin
Non-inverseur avec gain 5, entrée 3 V et sortie limitée à ±10 V. Peut-on obtenir 15 V ?

:::correction
Le calcul linéaire prédit 15 V, au-delà de la limite donnée. Le montage sature ; la relation linéaire n’est alors plus applicable.
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
Un amplificateur opérationnel possède deux entrées et une sortie, et nécessite une alimentation. Dans le modèle idéal en régime linéaire avec contre-réaction négative, les courants d’entrée sont nuls et les tensions d’entrée égales. Le montage inverseur donne u_s=−(R₂/R₁)u_e ; le non-inverseur donne u_s=(1+R₂/R₁)u_e. La sortie réelle reste limitée par l’alimentation et le composant.
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
Identifier le montage et la contre-réaction, calculer le gain puis vérifier que la sortie prévue reste dans le régime linéaire.
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
Les tensions d’entrée ne sont égales que dans les conditions du modèle linéaire, pas dans tous les régimes.
:::

## Exercice 3 — Transfert et justification
Un amplificateur idéal fonctionne avec un gain en tension de 5. Pour une entrée de 0,2 V, quelle sortie prévoit le modèle ?

:::correction
U_s=G U_e=5×0,2=1,0 V. Cette prédiction est valable dans le domaine linéaire du montage. La sortie ne peut pas dépasser les limites imposées par l’alimentation ; une amplification ne crée pas de l’énergie sans source.
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — 6 questions](/quiz/seconde-s-amplification/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
<!-- xam-revision:end -->
