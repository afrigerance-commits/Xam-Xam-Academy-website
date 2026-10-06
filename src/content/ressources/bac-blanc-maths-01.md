---
titre: "Bac blanc Maths — entraînement scientifique corrigé"
type: "Exercices corrigés"
niveau: "Terminale"
matiere: "Mathématiques"
chapitre: "Préparation Bac — analyse et probabilités"
description: "Un entraînement original sur 20 avec fonctions, probabilités et nombres complexes."
date: "2026-10-06"
brouillon: false
---

:::attention
**Sujet original Xam Xam Academy, non officiel.** Entraînement ciblé pour Terminales scientifiques, pas une reproduction exhaustive du format du Bac. Durée conseillée : 2 heures. Barème pédagogique : 20 points.
:::

## Exercice 1 — Analyse (8 points)
Soit $f(x)=x^3-3x$.
1. Calculer $f'$ et étudier son signe. (3 points)
2. Donner les variations, les extrema locaux et les limites en l’infini. (3 points)
3. Déterminer la tangente au point d’abscisse 0. (2 points)

:::correction
$f'(x)=3(x-1)(x+1)$. Le signe est positif sur $]-\infty,-1[$ et $]1,+\infty[$, négatif sur $]-1,1[$. $f$ croît, décroît puis croît. Maximum local : $f(-1)=2$ ; minimum local : $f(1)=-2$. Les limites en $-\infty$ et $+\infty$ valent respectivement $-\infty$ et $+\infty$. Tangente : $y=f'(0)x+f(0)=-3x$.
:::

## Exercice 2 — Probabilités (6 points)
Un contrôle indépendant de chaque pièce donne une probabilité de défaut de 0,1. On contrôle trois pièces. Soit $X$ le nombre de pièces défectueuses.
1. Justifier la loi de $X$. (2 points)
2. Calculer $P(X=1)$. (2 points)
3. Calculer la probabilité d’au moins un défaut et $E(X)$. (2 points)

:::correction
$X$ suit une loi binomiale de paramètres $n=3$ et $p=0{,}1$, par indépendance et probabilité constante. $P(X=1)=\binom31(0{,}1)(0{,}9)^2=0{,}243$. $P(X\ge1)=1-(0{,}9)^3=0{,}271$. $E(X)=np=0{,}3$.
:::

## Exercice 3 — Complexes (6 points)
Résoudre $z^2-2z+2=0$ dans $\mathbb C$. Donner le module et un argument de chaque solution, puis leur produit.

:::correction
$\Delta=4-8=-4$. Les solutions sont $1+i$ et $1-i$. Les modules valent $\sqrt2$, les arguments peuvent être $\pi/4$ et $-\pi/4$. Le produit vaut $(1+i)(1-i)=2$. Cela concorde avec le terme constant du polynôme.
:::

## Après la correction
Refaire le tableau de signes, la méthode de l’événement contraire et la résolution complexe. Comparer ensuite les exigences de votre série aux [annales officielles](/ressources/bac-2025-annales-officielles/).
