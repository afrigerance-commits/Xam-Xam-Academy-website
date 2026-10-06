---
titre: "Dérivation : construire un tableau de variations"
type: "Cours"
niveau: "Terminale"
matiere: "Mathématiques"
chapitre: "Analyse — dérivation"
description: "Règles essentielles, signe de la dérivée et trois corrections détaillées."
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
