---
titre: "Résistances électriques : comprendre, mesurer et résoudre"
type: "Cours"
niveau: "3e"
matiere: "Physique"
chapitre: "Résistances électriques et loi d’Ohm"
description: "Cours développé : activité expérimentale, mesures, caractéristique, loi d’Ohm, résistance d’un fil, associations et huit exercices corrigés."
date: "2026-10-28"
brouillon: false
---

## Mon objectif de révision

À la fin du chapitre, vous devez pouvoir mesurer une résistance, reconnaître un conducteur ohmique à partir de mesures, exploiter un graphique, calculer une résistance équivalente et justifier chaque étape d’un problème.

**Prérequis :** circuit fermé, branche, nœud, intensité, tension et proportionnalité. Une branche est une portion de circuit entre deux nœuds. Un nœud est un point où se rejoignent au moins trois branches.

**Matériel de travail :** règle, papier quadrillé et calculatrice. Les expériences décrites utilisent uniquement une alimentation de laboratoire de très basse tension, avec montage vérifié par le professeur. Aucun essai sur une prise domestique.

## 1. Pourquoi une résistance ?

Deux lampes branchées successivement sur une même alimentation ne laissent pas nécessairement passer le même courant. La tension disponible ne suffit donc pas à déterminer l’intensité : les propriétés du dipôle interviennent.

Une résistance électrique caractérise l’opposition d’un dipôle au passage du courant. Sa valeur se note $R$ et s’exprime en **ohms**, symbole $\Omega$. Un composant conçu pour présenter une résistance déterminée est appelé **résistor**.

L’énergie électrique reçue par un résistor est principalement transférée sous forme thermique : il peut chauffer. Cela ne signifie pas que le courant est « consommé ». Dans une branche en série, l’intensité reste la même avant et après le composant.

| Grandeur | Symbole | Unité |
|---|---|---|
| Tension | $U$ | volt, V |
| Intensité | $I$ | ampère, A |
| Résistance | $R$ | ohm, $\Omega$ |

**Conversions indispensables :** $1\,\mathrm A=1000\,\mathrm{mA}$ ; $1\,\mathrm{k\Omega}=1000\,\Omega$. Ainsi, $75\,\mathrm{mA}=0{,}075\,\mathrm A$.

## 2. Découvrir la relation entre tension et intensité

### Montage et protocole

On place un résistor et un ampèremètre **en série** avec l’alimentation. Le voltmètre est branché **en dérivation aux bornes du résistor**.

Avant de fermer le circuit, le professeur vérifie le montage, les bornes et les calibres. On commence avec un calibre adapté suffisamment grand, puis on affine la lecture. On augmente progressivement la tension sans dépasser les limites du composant, et on relève plusieurs couples $(I;U)$.

L’ampèremètre mesure le courant qui traverse le résistor. Le voltmètre compare les potentiels à ses deux bornes. Échanger ces branchements peut fausser la mesure ou endommager le matériel.

### Une série de données pour s’entraîner

Les valeurs suivantes sont **idéalisées pour l’exercice** ; elles ne sont pas présentées comme des mesures réellement effectuées.

| $U$ en V | 0 | 1,5 | 3,0 | 4,5 | 6,0 |
|---|---|---|---|---|---|
| $I$ en mA | 0 | 15 | 30 | 45 | 60 |
| $I$ en A | 0 | 0,015 | 0,030 | 0,045 | 0,060 |

Pour chaque couple non nul, calculons $U/I$ :


$$
\frac{1{,}5}{0{,}015}=100\,\Omega,\qquad
\frac{3}{0{,}030}=100\,\Omega,\qquad
\frac{6}{0{,}060}=100\,\Omega.
$$


Le rapport reste constant : la tension est proportionnelle à l’intensité. Au point $(0;0)$, on ne calcule pas $0/0$, qui n’est pas défini.

**Interprétation :** doubler la tension double ici l’intensité. Ce comportement définit le modèle du conducteur ohmique, dans les conditions où sa résistance reste constante.

## 3. Énoncer et utiliser la loi d’Ohm

Pour un conducteur ohmique, notamment à température maintenue constante :


$$
\boxed{U=RI}.
$$


La tension $U$ et l’intensité $I$ sont ici prises avec des orientations cohérentes en convention récepteur ; dans les calculs simples de ce chapitre, on utilise leurs valeurs positives.

On peut isoler la grandeur cherchée :


$$
I=\frac UR\qquad\text{et}\qquad R=\frac UI\quad(I\ne0).
$$


**Exemple guidé.** Un résistor de $150\,\Omega$ est soumis à $6\,\mathrm V$. On cherche l’intensité.

1. Les données sont déjà en volts et en ohms.
2. La relation adaptée est $I=U/R$.
3. $I=6/150=0{,}040\,\mathrm A=40\,\mathrm{mA}$.
4. Vérification : $150\times0{,}040=6\,\mathrm V$.

:::attention
La loi $U=RI$ avec un $R$ constant ne décrit pas tous les dipôles. Une lampe à filament qui chauffe, par exemple, peut avoir une résistance qui évolue. Il faut vérifier le modèle avant de calculer.
:::

## 4. Construire et exploiter la caractéristique

La **caractéristique** $U=f(I)$ représente la tension en fonction de l’intensité.

- Sur l’axe horizontal, placer $I$ et son unité.
- Sur l’axe vertical, placer $U$ et son unité.
- Choisir des échelles lisibles ; pour les données précédentes : 1 cm pour 10 mA horizontalement, 1 cm pour 1 V verticalement.
- Placer les points. Avec des mesures réelles, rechercher une droite représentative, sans relier mécaniquement chaque point au suivant.
- Vérifier si cette droite passe approximativement par l’origine.

Un conducteur ohmique donne une droite passant par l’origine, aux incertitudes de mesure près.

**Lire la résistance.** Si un point de cette droite correspond à $I=50\,\mathrm{mA}$ et $U=5\,\mathrm V$, alors :


$$
R=\frac5{0{,}050}=100\,\Omega.
$$


La pente vaut $R$ lorsque $I$ est exprimée en ampères. Avec un axe gradué en milliampères, une pente numérique de $0{,}10\,\mathrm{V/mA}$ correspond à $100\,\mathrm{V/A}$, donc $100\,\Omega$.

**Ne pas confondre les graphiques :** si l’on trace $I=f(U)$, la pente représente $1/R$, pas $R$.

## 5. Mesurer directement avec un ohmmètre

L’ohmmètre mesure une résistance à l’aide de sa propre source interne.

1. Couper et déconnecter l’alimentation du circuit.
2. Isoler le composant du reste du montage, au moins par une borne si nécessaire, pour éviter les chemins parallèles.
3. Choisir la fonction ohmmètre et des bornes adaptées.
4. Brancher les deux pointes aux bornes du composant et lire l’unité affichée.
5. Adapter le calibre selon la notice de l’appareil.

**Exemple :** un affichage de $2{,}20\,\mathrm{k\Omega}$ correspond à $2200\,\Omega$.

Un affichage « OL » ou de dépassement de calibre ne signifie pas automatiquement « résistance nulle ». Il faut vérifier le calibre, les contacts et la notice. Un circuit ouvert présente une résistance très élevée dans le modèle usuel.

## 6. De quoi dépend la résistance d’un fil ?

Pour un fil homogène de longueur $\ell$, de section constante $S$, à température fixée :


$$
R=\rho\frac{\ell}{S}.
$$


La résistivité $\rho$ dépend du matériau. Cette relation permet surtout de raisonner sur des comparaisons :

- même matériau et même section : doubler la longueur double $R$ ;
- même matériau et même longueur : doubler la section divise $R$ par deux ;
- doubler à la fois longueur et section laisse $R$ inchangée.

**Section et diamètre sont différents.** Pour un fil cylindrique de diamètre $d$, $S=\pi d^2/4$. Doubler le diamètre multiplie donc la section par quatre et divise la résistance par quatre, si les autres conditions restent identiques.

## 7. Associer des résistances en série

Deux résistors sont en série lorsqu’ils appartiennent à la même branche sans dérivation entre eux. La même intensité les traverse :


$$
I_1=I_2=I.
$$


Les tensions s’ajoutent : $U=U_1+U_2$. Avec la loi d’Ohm :


$$
U=R_1I+R_2I=(R_1+R_2)I.
$$


Le résistor équivalent doit produire la même relation entre tension totale et courant :


$$
\boxed{R_{\mathrm{eq}}=R_1+R_2}.
$$


**Exemple guidé.** $R_1=10\,\Omega$ et $R_2=20\,\Omega$ sont en série sous $6\,\mathrm V$.

$R_{\mathrm{eq}}=30\,\Omega$, puis $I=6/30=0{,}20\,\mathrm A$.

$U_1=10\times0{,}20=2\,\mathrm V$ et $U_2=20\times0{,}20=4\,\mathrm V$.

**Contrôle :** $U_1+U_2=6\,\mathrm V$. Les intensités sont identiques, mais les tensions ne sont égales que si les résistances sont égales.

## 8. Associer des résistances en dérivation

Deux résistors sont en dérivation s’ils sont reliés aux **mêmes deux nœuds**. Ils ont la même tension :


$$
U_1=U_2=U.
$$


La loi des nœuds donne $I=I_1+I_2$. Ainsi :


$$
\frac U{R_{\mathrm{eq}}}=\frac U{R_1}+\frac U{R_2}.
$$


Pour des résistances positives :


$$
\boxed{\frac1{R_{\mathrm{eq}}}=\frac1{R_1}+\frac1{R_2}},
\qquad
\boxed{R_{\mathrm{eq}}=\frac{R_1R_2}{R_1+R_2}}.
$$


La seconde formule s’applique directement à **deux** résistances.

**Exemple guidé.** $6\,\Omega$ et $3\,\Omega$ sont en dérivation sous $6\,\mathrm V$.

$I_1=6/6=1\,\mathrm A$, $I_2=6/3=2\,\mathrm A$ et $I=3\,\mathrm A$.

$R_{\mathrm{eq}}=U/I=2\,\Omega$, résultat confirmé par $6\times3/(6+3)=2\,\Omega$.

**Contrôle :** en dérivation, la résistance équivalente est inférieure à la plus petite des résistances positives. Ajouter une branche fournit un chemin supplémentaire au courant.

## 9. Résoudre un montage mixte

On ne choisit pas une formule d’après la position des éléments sur la feuille : on repère les nœuds et les branches.

Un montage comprend $R_1=4\,\Omega$ en série avec un groupe où $R_2=6\,\Omega$ et $R_3=3\,\Omega$ sont en dérivation. L’ensemble est soumis à $12\,\mathrm V$.

1. **Réduire la dérivation :** $R_{23}=6\times3/(6+3)=2\,\Omega$.
2. **Réduire la série :** $R_{\mathrm{eq}}=4+2=6\,\Omega$.
3. **Calculer le courant principal :** $I=12/6=2\,\mathrm A$.
4. **Trouver les tensions :** $U_1=4\times2=8\,\mathrm V$ ; $U_{23}=12-8=4\,\mathrm V$.
5. **Revenir aux branches :** $I_2=4/6=2/3\,\mathrm A$ ; $I_3=4/3\,\mathrm A$.
6. **Contrôler :** $I_2+I_3=2\,\mathrm A$, égal au courant principal.

Ce calcul est théorique : les valeurs admissibles d’intensité et de puissance des composants doivent être respectées dans un montage réel.

## 10. Exercices progressifs

Essayez sur papier avant d’ouvrir chaque correction. Écrivez les données, la relation littérale, les conversions, le calcul et une phrase de conclusion.

### Exercice 1 — Convertir

Exprimer 80 mA en A, puis 1,8 kΩ en Ω.

:::correction
$80\,\mathrm{mA}=0{,}080\,\mathrm A$ ; $1{,}8\,\mathrm{k\Omega}=1800\,\Omega$. On divise par 1000 dans la première conversion et on multiplie par 1000 dans la seconde.
:::

### Exercice 2 — Choisir la bonne relation

Un résistor est parcouru par 25 mA sous 5 V. Calculer sa résistance.

:::correction
La grandeur cherchée est $R$. Convertir : $I=0{,}025\,\mathrm A$. Puis $R=U/I=5/0{,}025=200\,\Omega$. Vérification : $200\times0{,}025=5\,\mathrm V$.
:::

### Exercice 3 — Exploiter une caractéristique

Un dipôle donne les couples $(I;U)$ suivants : (10 mA ; 2 V), (20 mA ; 4 V), (30 mA ; 6 V). Construire $U=f(I)$, identifier le modèle et déterminer $R$.

:::correction
Les points sont alignés avec l’origine dans cette série idéalisée. Les rapports valent $2/0{,}010=4/0{,}020=6/0{,}030=200\,\Omega$. Le modèle ohmique convient aux données et $R=200\,\Omega$. Dans une expérience réelle, on discuterait les écarts et les incertitudes.
:::

### Exercice 4 — Comparer deux fils

Un fil homogène a une résistance de 24 Ω. Même matériau et même température : quelle résistance pour un fil deux fois plus long et trois fois plus épais en **section** ?

:::correction
$R'/R=(\ell'/\ell)(S/S')=2/3$. Donc $R'=24\times2/3=16\,\Omega$. La diminution due à la section l’emporte sur l’augmentation due à la longueur.
:::

### Exercice 5 — Série

Deux résistors de 30 Ω et 20 Ω sont en série sous 10 V. Calculer le courant et chaque tension.

:::correction
$R_{\mathrm{eq}}=50\,\Omega$ ; $I=10/50=0{,}20\,\mathrm A$. $U_1=30\times0{,}20=6\,\mathrm V$ et $U_2=20\times0{,}20=4\,\mathrm V$. La somme des tensions vaut bien 10 V.
:::

### Exercice 6 — Dérivation

Deux résistors de 12 Ω et 6 Ω sont en dérivation sous 6 V. Déterminer les courants et la résistance équivalente.

:::correction
$I_1=6/12=0{,}50\,\mathrm A$ ; $I_2=6/6=1\,\mathrm A$. $I=1{,}50\,\mathrm A$ et $R_{\mathrm{eq}}=6/1{,}50=4\,\Omega$. Vérifier : $12\times6/(12+6)=4\,\Omega<6\,\Omega$.
:::

### Exercice 7 — Problème de synthèse

Une résistance de 5 Ω est en série avec deux résistances de 12 Ω et 6 Ω en dérivation. Le générateur idéal fournit 18 V. Calculer la résistance équivalente, le courant principal, puis les courants de dérivation.

:::correction
La dérivation équivaut à $12\times6/(12+6)=4\,\Omega$. Le total vaut $5+4=9\,\Omega$. Le courant principal vaut $18/9=2\,\mathrm A$. La tension sur la résistance de 5 Ω vaut 10 V ; la dérivation reçoit donc 8 V. Ses courants sont $8/12=2/3\,\mathrm A$ et $8/6=4/3\,\mathrm A$. Leur somme vaut 2 A. La somme des tensions des deux groupes vaut $10+8=18\,\mathrm V$.
:::

### Exercice 8 — Corriger un raisonnement

Un élève écrit : « Deux résistances de 10 Ω en dérivation font 20 Ω. Sous 6 V, chacune porte la moitié du courant principal parce que toutes les dérivations partagent également le courant. » Corriger.

:::correction
La résistance équivalente vaut $10\times10/(10+10)=5\,\Omega$. Le courant principal vaut $6/5=1{,}2\,\mathrm A$ ; chaque branche porte $6/10=0{,}6\,\mathrm A$. Le partage est égal **ici parce que les résistances sont égales**. En général, les branches ont la même tension mais des courants différents.
:::

## Révision active — comprendre avant de calculer

Sans regarder le cours, expliquez pourquoi :

- la valeur de $R$ ne peut pas se calculer avec $U/I$ au point $(0;0)$ ;
- un ampèremètre se place en série et un voltmètre en dérivation ;
- la résistance équivalente augmente en ajoutant un résistor en série ;
- la résistance équivalente diminue en ajoutant une branche résistive en dérivation ;
- un courant identique ne garantit pas des tensions identiques.

Les sections 2, 4, 7 et 8 donnent les justifications. Si une explication reste difficile, refaites l’exemple associé avant le quiz.

## Mon parcours de consolidation

**À retenir :** $U=RI$ dans son domaine de validité ; en série, même courant et somme des résistances ; en dérivation, même tension et somme des courants. Toujours convertir les milliampères.

Pour consolider, refaites d’abord les exercices 2 et 3, puis les associations, puis le problème mixte sans correction. Lors d’une séance ultérieure, expliquez votre démarche à voix haute et reprenez une question échouée.

[Passer au quiz corrigé du chapitre](/quiz/3e-resistances/) · [Retrouver les chapitres de ma classe](/parcours/)

### Références de préparation

Cours, données et corrigés rédigés pour Xam Xam Academy. Le choix des activités et compétences a été confronté au fascicule Sciences physiques 3e ADEM-Dakar, chapitre « Résistance électrique », pages imprimées 23 à 26, et au [manuel de physique-chimie 3e de l’IREMPT-UCAD](https://irempt.ucad.sn/index.php/fr/manuel-de-physique-chimie-3eme-0). Les énoncés ci-dessus sont originaux.
