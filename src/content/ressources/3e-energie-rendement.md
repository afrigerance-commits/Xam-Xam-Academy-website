---
titre: "Énergie et rendement"
type: "Cours"
niveau: "3e"
matiere: "Physique"
chapitre: "Énergie et rendement"
description: "Leçon développée, exemples guidés et six exercices corrigés : energie rendement."
date: "2026-10-28"
brouillon: false
---
## Mon objectif de révision

Reconnaître des formes d’énergie, construire un bilan, calculer une énergie mécanique ou électrique et interpréter un rendement. Prérequis : poids, travail, puissance et conversions. On précise toujours le système étudié, la durée et ce que l’on appelle « utile ».

## 1. Décrire une transformation d’énergie

Une lampe reçoit de l’énergie électrique et en transfère sous forme lumineuse et thermique. Un moteur reçoit de l’énergie et fournit un travail mécanique, tout en s’échauffant. Une transformation ne fait pas disparaître l’énergie ; elle en modifie les formes ou les lieux de stockage.

Pour une lampe d’éclairage, la lumière est l’effet recherché. Pour un radiateur, c’est le transfert thermique. Une même forme d’énergie peut être utile dans un appareil et non recherchée dans un autre.

| Système | Énergie reçue | Effet utile choisi | Autres transferts usuels |
|---|---|---|---|
| Moteur électrique | Électrique | Mécanique | Thermiques, sonores |
| Lampe | Électrique | Lumineux | Thermiques |
| Panneau photovoltaïque | Rayonnement solaire | Électrique | Thermiques, rayonnement non converti |

Ce tableau décrit des bilans simplifiés ; l’énergie réellement stockée dans l’appareil doit être prise en compte si son état varie pendant l’étude.

## 2. Énergie cinétique

Un corps en mouvement possède une énergie cinétique. Dans le modèle d’un corps en translation à vitesse de norme $v$ :


$$
E_c=\frac12mv^2.
$$


$m$ est en kg, $v$ en m/s et $E_c$ en J. L’énergie cinétique dépend du référentiel, puisque la vitesse en dépend.

**Exemple guidé :** pour 2 kg à 3 m/s, $E_c=\frac12\times2\times3^2=9$ J. Si la vitesse double, l’énergie est multipliée par quatre. Si la masse double à vitesse inchangée, elle est multipliée par deux.

## 3. Énergie potentielle de pesanteur

Près de la surface terrestre, avec $g$ uniforme et un niveau de référence choisi :


$$
E_p=mgz.
$$


L’altitude $z$ est mesurée par rapport à ce niveau. Pour 2 kg à 3 m au-dessus de la référence et $g=10$ N/kg, $E_p=60$ J. Si l’on change la référence, la valeur de $E_p$ change ; la différence entre deux positions reste la même.

Lors d’une descente, l’énergie potentielle peut se convertir en énergie cinétique. Avec des frottements, une partie du bilan mécanique est transférée sous forme thermique.

## 4. Énergie mécanique et conservation

Dans le modèle où seule la pesanteur fournit une énergie potentielle :


$$
E_m=E_c+E_p.
$$


Sans frottements ni autre transfert modifiant ce bilan, $E_m$ reste constante. Cela ne signifie pas que $E_c$ et $E_p$ restent séparément constantes.

**Exemple guidé :** une masse tombe du repos depuis 5 m, $g=10$ m/s², frottements négligés, origine de l’énergie potentielle au sol. Au départ, $E_m=mg\times5$. Juste avant le sol, $E_m=mv^2/2$. D’où $v^2=2g\times5=100$ et $v=10$ m/s. La masse se simplifie dans ce modèle.

Si une partie de l’énergie mécanique devient thermique, la vitesse réelle peut être plus faible. L’énergie totale se conserve, mais l’énergie mécanique du mobile seul ne se conserve plus.

## 5. Énergie électrique et puissance

Pour une puissance constante : $E=P\Delta t$. Avec $P$ en W et $\Delta t$ en s, $E$ est en J. En courant continu, pour un dipôle récepteur, $P=UI$ dans les conventions adaptées.

**Exemple :** un appareil de 100 W fonctionne pendant 3 min : $E=100\times180=18000$ J. Pour un conducteur ohmique, la puissance thermique peut s’écrire $P=RI^2=U^2/R$.

Le kilowattheure est une unité d’énergie : $1$ kWh $=1000\times3600=3,6\times10^6$ J. Une puissance de 2 kW pendant 30 min correspond à 1 kWh ; on ne multiplie pas directement 2 par 30 si l’on veut des kWh.

## 6. Rendement d’un convertisseur

![Bilan énergétique d’un moteur recevant 800 J et fournissant 600 J utiles, sans variation de stockage.](/assets/img/cours/chaine-energie-3e.svg)

Sur une même durée, si l’on néglige la variation d’énergie stockée dans le convertisseur :


$$
E_{reçue}=E_{utile}+E_{autres},\qquad
\eta=\frac{E_{utile}}{E_{reçue}}.
$$


Le rendement est un rapport sans unité. Pour l’exprimer en pourcentage, multiplier par 100. Le rendement ainsi défini est compris entre 0 et 1 pour le bilan considéré. Les « pertes » ne disparaissent pas : elles désignent les transferts non utiles pour la fonction choisie.

**Exemple guidé :** un moteur reçoit 800 J et fournit 600 J utiles. Les autres transferts valent 200 J. $\eta=600/800=0,75=75\,\%$. Le rapport inverse donnerait 1,33 et ne serait pas le rendement recherché.

Si deux convertisseurs se succèdent et si toute la sortie utile du premier alimente le second, le rendement global est le produit : $\eta_g=\eta_1\eta_2$. Ce n’est pas la somme des pourcentages.

## 7. Exercices progressifs corrigés

### Exercice 1 — Énergie cinétique

Une balle de 200 g se déplace à 10 m/s. Calculer son énergie cinétique.
:::correction
$m=0,200$ kg. $E_c=0,5\times0,200\times10^2=10$ J. Il faut convertir la masse avant d’utiliser la formule SI.
:::

### Exercice 2 — Référence de hauteur

Une masse de 4 kg est à 2 m au-dessus d’une table, elle-même à 1 m du sol. Avec $g=10$ N/kg, calculer $E_p$ en prenant la table puis le sol comme référence.
:::correction
Référence table : $E_p=4\times10\times2=80$ J. Référence sol : l’altitude vaut 3 m et $E_p=120$ J. Pour une chute jusqu’à la table, la diminution vaut 80 J dans les deux choix de référence.
:::

### Exercice 3 — Conversion électrique

Une lampe de 12 W fonctionne 5 minutes. Calculer l’énergie reçue.
:::correction
$\Delta t=300$ s ; $E=P\Delta t=12\times300=3600$ J. La puissance ne suffit pas à déterminer l’énergie sans la durée.
:::

### Exercice 4 — Rendement et pertes

Une installation reçoit 2500 J et fournit 1750 J utiles, sans variation du stockage interne. Calculer rendement et autres transferts.
:::correction
$\eta=1750/2500=0,70=70\,\%$. Les autres transferts valent $2500-1750=750$ J. Contrôle : $1750+750=2500$ J.
:::

### Exercice 5 — Retrouver l’énergie reçue

Un moteur de rendement 80 % fournit un travail utile de 1200 J. Calculer l’énergie reçue.
:::correction
$E_{reçue}=E_{utile}/\eta=1200/0,80=1500$ J. Les autres transferts représentent 300 J. Multiplier 1200 par 0,80 chercherait une sortie utile à partir d’une entrée, ce qui n’est pas la question.
:::

### Exercice 6 — Chaîne de conversion

Une source fournit 6000 J à un convertisseur de rendement 75 %, puis toute sa sortie utile alimente un second convertisseur de rendement 80 %. Déterminer la sortie utile finale et le rendement global.
:::correction
Première sortie : $6000\times0,75=4500$ J. Sortie finale : $4500\times0,80=3600$ J. $\eta_g=0,75\times0,80=0,60=60\,\%$. Le bilan global des autres transferts est de 2400 J.
:::

## Révision active — comprendre avant de calculer

Expliquez pourquoi une vitesse doublée ne donne pas une énergie cinétique doublée. Distinguez énergie mécanique et énergie totale, watts et kilowattheures, rendement et énergie perdue pour l’usage choisi. Reconstituez le bilan du dernier exercice sans sa correction.

## Mon parcours de consolidation

Travaillez d’abord la leçon et les exemples, puis les exercices sans ouvrir les corrections. Repérez si votre difficulté concerne une définition, une conversion, le choix d’une relation ou l’interprétation. Reprenez cette étape lors d’une séance ultérieure, puis vérifiez votre compréhension dans le quiz.

[Passer au quiz corrigé du chapitre](/quiz/3e-energie-rendement/) · [Retrouver les chapitres de ma classe](/parcours/)

**Référence de préparation :** fascicule Sciences physiques 3e ADEM-Dakar, chapitre correspondant. Le cours, les données et les corrigés de cette page sont rédigés pour Xam Xam Academy. Les activités expérimentales se pratiquent sous l’encadrement du professeur.
