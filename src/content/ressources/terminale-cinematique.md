---
titre: "S — Cinématique du point"
type: "Cours"
niveau: "Terminale"
matiere: "Physique"
chapitre: "S — Cinématique du point"
description: "Notions, méthode, 3 applications corrigées et 6 questions de révision interactive : S — Cinématique du point."
date: "2026-10-28"
brouillon: false
---

**Cours de révision original — Terminale S1/S2.** Le repérage des chapitres suit le [document de programme publié par l’Office du Bac](https://officedubac.sn/wp-content/uploads/2026/01/Programme_Sciences-Physiques_Tle_LS.pdf), qui reprend le référentiel de 2008. Les approfondissements et exigences peuvent différer entre S1 et S2.


## 1. Décrire un mouvement

La cinématique décrit un mouvement sans en rechercher les causes. Un même passager est immobile dans le référentiel du véhicule et mobile par rapport à la route. Toute étude commence donc par le **référentiel**, le système étudié, les axes et l’origine des dates.

Le modèle du point matériel néglige la taille du mobile pour décrire sa position. Il ne convient pas à toutes les questions : étudier la rotation propre d’une roue demande un modèle plus riche.

**Prérequis :** coordonnées, vecteurs, dérivées, primitives et trigonométrie. Objectifs : passer d’une position à une vitesse, reconstruire un mouvement à partir de son accélération et interpréter graphiques et signes.

## 2. Repérer la position

Dans un repère cartésien fixe :


$$
\overrightarrow{OM}=x(t)\vec i+y(t)\vec j+z(t)\vec k.
$$


La trajectoire est l’ensemble des positions successives. Une équation horaire exprime une coordonnée en fonction du temps ; une équation de trajectoire relie les coordonnées après élimination du temps.

En coordonnées polaires dans un plan, on utilise la distance $r=OM$ et l’angle $\theta$. L’abscisse curviligne $s$ mesure une distance **orientée le long de la trajectoire**, depuis une origine choisie. Elle ne se confond pas avec la distance directe $OM$.

**Exemple.** $x=2t$ et $y=t^2$ donnent $t=x/2$, puis $y=x^2/4$. Le domaine des dates détermine la portion de parabole parcourue.

## 3. Vitesse moyenne et vitesse instantanée

Le vecteur vitesse moyenne vaut $\Delta\overrightarrow{OM}/\Delta t$. La vitesse moyenne calculée par distance parcourue/durée est une grandeur scalaire différente de la norme de ce vecteur dans un trajet avec changement de direction.

La vitesse instantanée est :


$$
\vec v=\frac{d\overrightarrow{OM}}{dt}
=\dot x\vec i+\dot y\vec j+\dot z\vec k.
$$


Elle est tangente à la trajectoire et orientée dans le sens du déplacement. Sa norme vaut $v=\sqrt{\dot x^2+\dot y^2+\dot z^2}$.

**Exemple guidé.** Pour $x=2t$, $y=t^2$ en unités SI : $\vec v=2\vec i+2t\vec j$. À $t=1$ s, $v=\sqrt8\approx2,83$ m/s. Il faut dériver chaque coordonnée avant de calculer la norme.

## 4. Accélération : variation de norme ou de direction


$$
\vec a=\frac{d\vec v}{dt}=\ddot x\vec i+\ddot y\vec j+\ddot z\vec k.
$$


L’unité est le mètre par seconde carrée. L’accélération peut être non nulle avec une vitesse de norme constante si la direction de cette vitesse change.

Dans le repère de Frenet, tangent et normal à une trajectoire régulière :


$$
\vec a=\frac{dv}{dt}\vec T+\frac{v^2}{\mathcal R}\vec N.
$$


$\vec N$ pointe vers le centre de courbure ; $\mathcal R$ est le rayon de courbure. La composante tangentielle traduit la variation de norme ; la composante normale traduit la courbure.

Sur un cercle de rayon $R$, $\mathcal R=R$. À $v=6$ m/s et $R=3$ m, l’accélération normale vaut $12$ m/s².

## 5. Mouvements rectilignes

Sur un axe fixe, les grandeurs algébriques $v_x$ et $a_x$ peuvent être négatives.

**Uniforme :** $a_x=0$, $v_x=v_0$, $x=x_0+v_0t$.

**Uniformément varié :** si $a_x=a$ est constante :


$$
v_x=v_0+at,\qquad x=x_0+v_0t+\frac12at^2.
$$


Ces relations viennent de deux intégrations successives ; les constantes sont fixées par les conditions initiales. On dispose aussi de $v_x^2-v_0^2=2a(x-x_0)$.

**Exemple guidé.** $x_0=2$ m, $v_0=3$ m/s, $a=-1$ m/s². Alors $v_x=3-t$ et $x=2+3t-t^2/2$. Le mobile s’arrête instantanément à $t=3$ s, en $x=6,5$ m. Si le modèle se poursuit, il repart dans le sens négatif. À l’arrêt, son accélération reste $-1$ m/s².

:::attention
Une accélération négative ne signifie pas toujours un ralentissement. En mouvement rectiligne, la norme de vitesse augmente lorsque vitesse et accélération ont le même signe.
:::

## 6. Mouvements circulaires

Sur un cercle fixe de rayon $R$, avec $\theta$ en radians :


$$
\omega=\dot\theta,\quad \alpha=\dot\omega,\quad v=R|\omega|.
$$


La composante tangentielle orientée vaut $R\alpha$ et la composante normale $R\omega^2$.

En mouvement circulaire uniforme, $\omega$ est constante ; $a_T=0$, mais $a_N=v^2/R$. La période $T$ et la fréquence $f$ vérifient :


$$
T=\frac{2\pi}{|\omega|},\qquad f=\frac1T.
$$


Si l’accélération angulaire est constante, $\omega=\omega_0+\alpha t$ et $\theta=\theta_0+\omega_0t+\alpha t^2/2$. Ne pas employer ces lois si $\alpha$ varie.

## 7. Mouvement rectiligne sinusoïdal

Une loi $x=x_e+A\cos(\omega t+\varphi)$ décrit une oscillation autour de $x_e$, avec amplitude $A$, pulsation $\omega$ et phase initiale $\varphi$.


$$
v_x=-A\omega\sin(\omega t+\varphi),\qquad
a_x=-A\omega^2\cos(\omega t+\varphi)=-\omega^2(x-x_e).
$$


La période vaut $2\pi/\omega$ pour $\omega>0$. Aux extrémités, la vitesse s’annule mais l’accélération est maximale en norme ; au centre, c’est l’inverse.

## 8. Lire un enregistrement et des graphiques

Sur un graphique $x(t)$, la pente de la tangente donne $v_x$. Une pente négative indique un déplacement dans le sens négatif de l’axe. Sur un graphique $v_x(t)$, la pente donne $a_x$.

L’aire algébrique sous $v_x(t)$ donne le **déplacement**. Pour une distance parcourue avec changements de sens, on additionne les aires en valeur absolue sur les intervalles concernés.

Des positions enregistrées à intervalles réguliers se rapprochent lors d’un ralentissement ; elles s’écartent si la vitesse augmente. Une estimation centrée est $v_x(t_i)\approx(x_{i+1}-x_{i-1})/(2\Delta t)$, pour des données assez régulières.

## 9. Exercices de consolidation supplémentaires

### A — Reconstruire à partir de l’accélération

$a_x=2$ m/s², $v_x(0)=-4$ m/s, $x(0)=1$ m. Déterminer les lois et l’instant de changement de sens.

:::correction
Intégrer donne $v_x=2t+C$ ; la condition initiale impose $C=-4$. Puis $x=t^2-4t+D$, avec $D=1$. La vitesse s’annule à $t=2$ s, en $x=-3$ m. Elle passe de négative à positive : le mobile change de sens.
:::

### B — Déplacement et distance

Un mobile roule à $v_x=3$ m/s pendant 2 s, puis à $v_x=-2$ m/s pendant 3 s. Comparer déplacement et distance parcourue.

:::correction
Le déplacement vaut $3\times2-2\times3=0$ m ; la distance vaut $6+6=12$ m. Il revient à sa position initiale sans être resté immobile.
:::

### C — Cercle accéléré

$R=2$ m, $\omega_0=1$ rad/s, $\alpha=2$ rad/s². Calculer à $t=1$ s la norme de vitesse et les composantes tangentielle et normale de l’accélération.

:::correction
$\omega=1+2\times1=3$ rad/s ; $v=2\times3=6$ m/s. $a_T=R\alpha=4$ m/s² ; $a_N=R\omega^2=18$ m/s². Les directions étant perpendiculaires, $a=\sqrt{4^2+18^2}\approx18,44$ m/s².
:::

### D — Oscillation

$x=0,10\cos(4t)$ en SI. Déterminer amplitude, période, vitesse maximale et accélération maximale en norme.

:::correction
$A=0,10$ m ; $\omega=4$ rad/s ; $T=\pi/2\approx1,57$ s. $v_{\max}=A\omega=0,40$ m/s et $a_{\max}=A\omega^2=1,60$ m/s².
:::

**Référence de cadrage :** programme de Terminale S publié par l’Office du Baccalauréat, chapitre P1. Les explications et les données des exercices sont originales.


## Synthèse des notions
Le mouvement dépend du référentiel. En mouvement rectiligne, $v=dx/dt$ et $a=dv/dt$. Pour une accélération constante : $v=v_0+at$ et $x=x_0+v_0t+at^2/2$. En mouvement circulaire uniforme, la vitesse conserve sa norme mais change de direction : l’accélération est centripète, de norme $v^2/r$. Ces lois supposent un axe et une origine des temps définis.

## Méthode de résolution
Choisir le référentiel et les axes, relever les conditions initiales, dériver la position ou intégrer l’accélération puis appliquer ces conditions.

:::attention
Une vitesse de norme constante n’implique pas une accélération nulle si sa direction change.
:::

## Exercice 1 — Application
x(t)=2t²+3t+1 en mètres. Calculer v et a à t=2 s.

:::correction
v(t)=4t+3 donc v(2)=11 m/s. a(t)=4 m/s².
:::

## Exercice 2 — Raisonnement
Un mobile décrit un cercle de rayon 2 m à 4 m/s. Trouver son accélération.

:::correction
a=v²/r=16/2=8 m/s², dirigée vers le centre du cercle.
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
Le mouvement dépend du référentiel. En mouvement rectiligne, $v=dx/dt$ et $a=dv/dt$. Pour une accélération constante : $v=v_0+at$ et $x=x_0+v_0t+at^2/2$. En mouvement circulaire uniforme, la vitesse conserve sa norme mais change de direction : l’accélération est centripète, de norme $v^2/r$. Ces lois supposent un axe et une origine des temps définis.
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
Choisir le référentiel et les axes, relever les conditions initiales, dériver la position ou intégrer l’accélération puis appliquer ces conditions.
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
Une vitesse de norme constante n’implique pas une accélération nulle si sa direction change.
:::

## Exercice 3 — Transfert et justification
Un mouvement rectiligne vérifie x(t)=−t²+6t+2 en unités SI. Calculer v(t), a(t) et l’instant où la vitesse s’annule.

:::correction
v(t)=dx/dt=−2t+6 m/s et a(t)=dv/dt=−2 m/s². La vitesse s’annule à t=3 s. Une vitesse nulle à cet instant n’implique pas une accélération nulle ; le mobile peut changer de sens.
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — 6 questions](/quiz/terminale-cinematique/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
<!-- xam-revision:end -->
