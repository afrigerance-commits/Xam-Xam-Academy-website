---
titre: "Travail et puissance mécaniques"
type: "Cours"
niveau: "3e"
matiere: "Physique"
chapitre: "Travail et puissance mécaniques"
description: "Leçon développée, exemples guidés et six exercices corrigés : travail puissance."
date: "2026-10-28"
brouillon: false
---
## Mon objectif de révision

Calculer le travail d’une force constante, déterminer son signe, calculer une puissance moyenne et relier ces grandeurs à une situation de levage. Prérequis : force, déplacement, poids, conversions de durée et proportionnalité.

## 1. Découvrir le travail mécanique

Deux personnes montent la même charge à la même hauteur, l’une lentement et l’autre rapidement. Le travail mécanique de levage peut être le même ; la puissance moyenne diffère. Ce chapitre permet de distinguer « quelle énergie est transférée ? » et « à quel rythme ? ».

Une force peut agir sans réaliser de travail sur le déplacement considéré. Pour calculer un travail, il faut connaître la force **et le déplacement de son point d’application**, ainsi que leurs directions relatives. Une personne fatiguée tenant immobile une charge ne produit pas de travail mécanique de levage sur cette charge immobile ; cela ne signifie pas que son organisme ne consomme pas d’énergie.

## 2. Force parallèle au déplacement

Pour une force constante de norme $F$ et un déplacement rectiligne de longueur $d$ dans la même direction :

| Situation | Travail | Nature |
|---|---|---|
| Même sens | $W=Fd$ | Moteur, positif |
| Sens opposés | $W=-Fd$ | Résistant, négatif |
| Force perpendiculaire au déplacement | $W=0$ | Nul |

Avec $F$ en N et $d$ en m, le travail s’exprime en **joules**, J. $1\,\mathrm J=1\,\mathrm{N\cdot m}$ pour cette grandeur.

**Exemple guidé :** un chariot est tiré par une force horizontale constante de 25 N sur 4 m dans son sens. $W=25\times4=100$ J. Si une force de frottement constante de 6 N agit en sens contraire, son travail vaut $-6\times4=-24$ J. Ces deux travaux ne doivent pas être confondus.

## 3. Une force inclinée

En complément, pour une force constante faisant un angle $\theta$ avec le déplacement :


$$
W=Fd\cos\theta.
$$


L’angle est celui entre les vecteurs force et déplacement, compris entre 0° et 180°. On retrouve les cas précédents : $\cos0°=1$, $\cos90°=0$, $\cos180°=-1$.

Pour $F=20$ N, $d=3$ m et $\theta=60°$, avec $\cos60°=0,5$ : $W=30$ J. Utiliser 60 J reviendrait à supposer à tort que toute la force est parallèle au déplacement.

## 4. Travail du poids

Dans un champ de pesanteur uniforme, avec l’altitude $z$ orientée vers le haut :


$$
W_{A\to B}(\vec P)=mg(z_A-z_B).
$$


Le poids travaille positivement lors d’une descente et négativement lors d’une montée. Son travail dépend de la différence d’altitude, pas de la longueur totale du trajet dans ce modèle.

**Exemple guidé :** une charge de 5 kg monte de 2 m, avec $g=10$ N/kg. Le travail du poids vaut $-5\times10\times2=-100$ J. Le travail de la force de levage vaut +100 J **si** la montée s’effectue à vitesse constante et si seules ces deux forces sont retenues. Il faut annoncer ces hypothèses avant de poser force de levage = poids.

Sur un déplacement horizontal, le poids est perpendiculaire au déplacement : son travail est nul, même si le déplacement est long.

## 5. Puissance moyenne

La puissance moyenne associée à un travail $W$ pendant une durée $\Delta t$ vaut :


$$
P_{\mathrm{moy}}=\frac W{\Delta t}.
$$


Son unité est le **watt**, W : $1\,\mathrm W=1\,\mathrm{J/s}$. La lettre $W$ désignant un travail et le symbole W du watt ne jouent pas le même rôle ; toujours lire le contexte et les unités.

**Exemple :** fournir 600 J en 15 s correspond à $600/15=40$ W. Fournir les mêmes 600 J en 30 s correspond à 20 W. Le travail n’a pas changé, le rythme a été divisé par deux.

On peut isoler le travail ou la durée : $W=P_{\mathrm{moy}}\Delta t$ et $\Delta t=W/P_{\mathrm{moy}}$, lorsque les grandeurs du problème sont cohérentes. Pour une force parallèle à un déplacement uniforme, on retrouve $P=Fv$ avec $v=d/\Delta t$.

## 6. Méthode et contrôles

Définir le système, identifier la force dont on demande le travail, représenter le déplacement, décider du signe, convertir puis calculer. Pour une puissance, utiliser la durée du même transfert énergétique.

- Convertir les centimètres en mètres et les minutes en secondes.
- Ne pas prendre la masse pour la force : calculer $mg$ si nécessaire.
- Ne pas utiliser la distance parcourue à la place du dénivelé dans le travail du poids.
- Distinguer travail d’une force particulière et somme des travaux de toutes les forces.

## 7. Exercices progressifs corrigés

### Exercice 1 — Travail moteur

Une force de 40 N agit dans le sens d’un déplacement rectiligne de 150 cm. Calculer son travail.
:::correction
$d=1,50$ m ; $W=Fd=40\times1,50=60$ J. Le signe est positif car force et déplacement ont le même sens.
:::

### Exercice 2 — Frottement

Un frottement constant de 8 N s’oppose à un déplacement de 5 m. Calculer son travail et expliquer son signe.
:::correction
$W=-Fd=-8\times5=-40$ J. Le travail est résistant : la force s’oppose au déplacement. La force garde une norme positive de 8 N ; c’est son travail qui est négatif.
:::

### Exercice 3 — Poids sur un trajet horizontal

Une caisse de 20 kg est déplacée horizontalement sur 6 m. Quel travail son poids effectue-t-il ?
:::correction
Le déplacement est horizontal et le poids vertical. Ils sont perpendiculaires : $W(\vec P)=0$ J. Il serait incorrect de calculer $mg\times6$ pour ce déplacement.
:::

### Exercice 4 — Puissance et conversions

Une machine fournit un travail utile de 18 000 J en 2 minutes. Calculer sa puissance moyenne utile.
:::correction
$\Delta t=120$ s ; $P=18000/120=150$ W. Le qualificatif « utile » se rapporte au travail utile fourni ; ce n’est pas nécessairement la puissance totale reçue par la machine.
:::

### Exercice 5 — Levage

Un moteur élève à vitesse constante 30 kg de 4 m en 8 s. Prendre $g=10$ N/kg, sans autres forces résistantes. Calculer le travail de levage, celui du poids et la puissance utile moyenne.
:::correction
$F=mg=300$ N. $W_{levage}=300\times4=1200$ J ; $W_{poids}=-1200$ J. La puissance utile moyenne vaut $1200/8=150$ W. Leurs travaux opposés sont compatibles avec une vitesse constante.
:::

### Exercice 6 — Comparer deux appareils

Deux appareils élèvent chacun une charge de poids 200 N sur 3 m à vitesse constante. Le premier met 5 s, le second 12 s. Comparer travail et puissance utile.
:::correction
Chaque appareil fournit $W=200\times3=600$ J. Le premier a $P_1=600/5=120$ W ; le second $P_2=600/12=50$ W. Le premier est plus puissant pour cette tâche, mais fournit le même travail utile.
:::

## Révision active — comprendre avant de calculer

Expliquez un exemple de force non nulle dont le travail est nul. Retrouvez les signes du travail du poids en montée et en descente. Donnez deux situations de même travail mais de puissances différentes, puis contrôlez les unités.

## Mon parcours de consolidation

Travaillez d’abord la leçon et les exemples, puis les exercices sans ouvrir les corrections. Repérez si votre difficulté concerne une définition, une conversion, le choix d’une relation ou l’interprétation. Reprenez cette étape lors d’une séance ultérieure, puis vérifiez votre compréhension dans le quiz.

[Passer au quiz corrigé du chapitre](/quiz/3e-travail-puissance/) · [Retrouver les chapitres de ma classe](/parcours/)

**Référence de préparation :** fascicule Sciences physiques 3e ADEM-Dakar, chapitre correspondant. Le cours, les données et les corrigés de cette page sont rédigés pour Xam Xam Academy. Les activités expérimentales se pratiquent sous l’encadrement du professeur.
