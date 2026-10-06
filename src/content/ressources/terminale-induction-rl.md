---
titre: "S — Induction et dipôle RL"
type: "Cours"
niveau: "Terminale"
matiere: "Physique"
chapitre: "S — Induction et dipôle RL"
description: "Notions, méthode, 3 applications corrigées et 6 questions de révision interactive : S — Induction et dipôle RL."
date: "2026-10-06"
brouillon: false
---

**Cours de révision original — Terminale S1/S2.** Le repérage des chapitres suit le [document de programme publié par l’Office du Bac](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Sciences-Physiques_Tle_LS.pdf), qui reprend le référentiel de 2008. Les approfondissements et exigences peuvent différer entre S1 et S2.

## Comprendre le chapitre
Une variation de flux magnétique crée une force électromotrice induite : $e=-d\Phi/dt$. Le signe traduit la loi de Lenz. Une bobine s’oppose aux variations du courant. Dans un circuit série RL idéal soumis à un échelon E, $i(t)=(E/R)(1-e^{-t/\tau})$, avec $\tau=L/R$. R doit inclure toutes les résistances du circuit, y compris celle de la bobine si elle est prise en compte.

## Méthode de résolution
Écrire la loi des mailles, identifier R et L, déterminer le régime initial et le régime final puis contrôler la constante de temps.

:::attention
Le courant d’une bobine idéale ne saute pas instantanément lors d’un changement fini de tension.
:::

## Exercice 1 — Application
L=0,20 H et R=100 Ω. Trouver τ et le courant final sous E=10 V.

:::correction
τ=L/R=0,002 s=2 ms. i final=E/R=0,10 A.
:::

## Exercice 2 — Raisonnement
Le flux orienté augmente de 0,01 Wb en 0,02 s. Trouver la f.é.m. moyenne avec l’orientation choisie.

:::correction
e moyenne=−ΔΦ/Δt=−0,01/0,02=−0,50 V. Le signe dépend de l’orientation de référence et traduit l’opposition à la variation de flux.
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
Une variation de flux magnétique crée une force électromotrice induite : $e=-d\Phi/dt$. Le signe traduit la loi de Lenz. Une bobine s’oppose aux variations du courant. Dans un circuit série RL idéal soumis à un échelon E, $i(t)=(E/R)(1-e^{-t/\tau})$, avec $\tau=L/R$. R doit inclure toutes les résistances du circuit, y compris celle de la bobine si elle est prise en compte.
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
Écrire la loi des mailles, identifier R et L, déterminer le régime initial et le régime final puis contrôler la constante de temps.
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
Le courant d’une bobine idéale ne saute pas instantanément lors d’un changement fini de tension.
:::

## Exercice 3 — Transfert et justification
Une bobine idéale de 0,20 H voit son courant augmenter à 3 A/s. Donner la f.é.m. induite orientée selon la loi de Faraday.

:::correction
e=−L di/dt=−0,20×3=−0,60 V dans la convention indiquée. Le signe traduit l’opposition à la variation du courant, conformément à la loi de Lenz. Il faut distinguer cette f.é.m. de la tension aux bornes écrite en convention récepteur.
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — 6 questions](/quiz/terminale-induction-rl/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
<!-- xam-revision:end -->
