import { deepeningBanks } from './deepening.mjs';
// Stable original IDs retain the initial checks; new exercises deepen the same chapter.
const choice = (skill, prompt, correct, wrong1, wrong2, explanation, hint = 'Identifiez la propriété utile avant de choisir.') => ({ kind: 'choice', skill, prompt, options: [correct, wrong1, wrong2], correct: 0, explanation, hint });
const concept = (...args) => choice('comprehension', ...args);
const trap = (...args) => choice('vigilance', ...args);
const calculation = (prompt, correct, unit, explanation, hint, tolerance = Math.max(Math.abs(correct) * .001, 1e-30)) => ({ kind: 'number', skill: 'application', prompt, correct, unit, explanation, hint, tolerance });
const banks = {};
const add = (id, ...questions) => { banks[id] = questions.map((q, i) => {
  const result = { ...q, id: `auto-${i + 1}` };
  if (q.kind === 'choice') {
    // Rotate explicit choices to avoid teaching pupils to always select A.
    const shift = [...id].reduce((n, c) => n + c.charCodeAt(0), i) % q.options.length;
    result.options = [...q.options.slice(shift), ...q.options.slice(0, shift)];
    result.correct = (q.options.length - shift) % q.options.length;
  }
  return result;
}); };

add('3e-acides-bases',
  concept('À 25 °C, une solution aqueuse de pH 3 est…', 'acide', 'neutre', 'basique', 'À 25 °C, pH < 7 caractérise une solution acide.'),
  calculation('Le pH passe de 2 à 4 après dilution. De combien de points de pH a-t-il augmenté ?', 2, '', '4 − 2 = 2 points. Cela ne signifie pas que l’acidité a été divisée par deux.', 'Calculez la différence entre les deux valeurs.'),
  trap('Une solution de pH 4 à 25 °C est-elle devenue basique ?', 'Non, elle reste acide', 'Oui, car son pH a augmenté', 'Oui, toute dilution rend basique', 'Le classement dépend de la comparaison à 7, pas seulement de l’évolution du pH.'));
add('3e-courant-electrisation',
  concept('Un objet gagne des électrons. Sa charge nette devient…', 'négative', 'positive', 'toujours nulle', 'Chaque électron porte une charge négative.'),
  calculation('12 C traversent une section de fil en 30 s. Quelle est l’intensité moyenne ?', .4, 'A', 'I = Q/Δt = 12/30 = 0,40 A.', 'Utilisez I = Q/Δt.'),
  trap('Dans un fil métallique, le sens conventionnel du courant est…', 'opposé au déplacement des électrons', 'celui du déplacement des électrons', 'celui du déplacement des protons', 'Les électrons sont négatifs : leur déplacement est opposé au sens conventionnel.'));
add('3e-dispersion',
  concept('Un prisme décompose la lumière blanche car…', 'son indice dépend de la couleur', 'il crée les couleurs à partir de rien', 'la lumière blanche est monochromatique', 'Les radiations sont déviées différemment parce que l’indice dépend de leur longueur d’onde.'),
  calculation('Une radiation a une longueur d’onde de 500 nm. Exprimez-la en micromètres.', .5, 'µm', '1 µm = 1 000 nm, donc 500 nm = 0,5 µm.', 'Divisez le nombre de nanomètres par 1 000.'),
  trap('Une lumière monochromatique idéale traversant un prisme donne…', 'une radiation déviée, sans spectre multicolore', 'toutes les couleurs du visible', 'de la lumière blanche', 'Une seule radiation ne contient pas toutes les couleurs de la lumière blanche.'));
add('3e-energie-rendement',
  concept('Le rendement énergétique est le rapport…', 'énergie utile / énergie reçue', 'énergie reçue / énergie utile', 'énergie perdue / durée', 'η = E utile/E reçue, pour le système et la durée étudiés.'),
  calculation('Un appareil reçoit 500 J et fournit 350 J utiles. Quel est son rendement en pourcentage ?', 70, '%', 'η = 350/500 = 0,70 = 70 %.', 'Multipliez E utile/E reçue par 100.'),
  trap('Les 150 J qui ne sont pas utiles dans cet exemple…', 'sont transférés sous d’autres formes, notamment thermiques', 'ont disparu de l’univers', 'rendent le rendement supérieur à 100 %', 'L’énergie se conserve ; toute énergie reçue n’est pas convertie dans la forme souhaitée.'));
add('3e-equations-problemes',
  concept('Pour traduire « trois fois un nombre, plus deux, donne quatorze », on écrit…', '3x + 2 = 14', '3(x + 2) = 14', 'x + 3 + 2 = 14', '« Trois fois un nombre » est 3x ; on ajoute ensuite 2.'),
  calculation('Résolvez 3x + 2 = 14. Quelle est la valeur de x ?', 4, '', '3x = 12, donc x = 4. Vérification : 3 × 4 + 2 = 14.', 'Soustrayez 2 aux deux membres, puis divisez par 3.'),
  trap('Pour conserver une équation équivalente, il faut…', 'effectuer la même opération permise aux deux membres', 'modifier seulement le membre de gauche', 'diviser par zéro si cela simplifie', 'Une division n’est permise que par une quantité non nulle.'));
add('3e-fonctions-affines',
  concept('La fonction f(x) = 2x + 3 est…', 'affine, mais pas linéaire', 'linéaire', 'constante', 'Une fonction linéaire est ax ; ici le terme constant 3 est non nul.'),
  calculation('Pour f(x) = 2x + 3, calculez f(4).', 11, '', 'f(4) = 2 × 4 + 3 = 11.', 'Remplacez x par 4.'),
  trap('Pour f(x) = −2x + 3, quand x augmente, f(x)…', 'diminue', 'augmente', 'reste constante', 'Le coefficient directeur −2 est négatif.'));
add('3e-forces',
  concept('Une force se décrit notamment par…', 'sa direction, son sens et son intensité', 'sa couleur et sa température', 'la seule masse de l’objet', 'Dans le modèle vectoriel, on précise aussi le point d’application.'),
  calculation('Deux forces colinéaires et opposées de 8 N et 3 N agissent. Quelle est la norme de leur résultante ?', 5, 'N', 'Les forces sont opposées : la norme de la résultante vaut 8 − 3 = 5 N.', 'Tenez compte des sens opposés.'),
  trap('Un solide soumis à deux forces est en équilibre si elles sont…', 'colinéaires, opposées et de même intensité', 'simplement de même intensité', 'de même sens', 'L’égalité des intensités ne suffit pas : leurs droites d’action et leurs sens comptent.'));
add('3e-hydrocarbures',
  concept('Un hydrocarbure contient uniquement…', 'du carbone et de l’hydrogène', 'du carbone et de l’oxygène', 'de l’hydrogène et du sodium', 'Le nom désigne un composé formé uniquement de C et H.'),
  calculation('Dans la combustion complète CH₄ + 2 O₂ → CO₂ + 2 H₂O, combien de moles de O₂ faut-il pour 3 mol de CH₄ ?', 6, 'mol', 'Le rapport est 2 mol de O₂ pour 1 mol de CH₄ : 2 × 3 = 6 mol.', 'Utilisez les coefficients de l’équation.'),
  trap('Une combustion incomplète peut produire…', 'du monoxyde de carbone toxique', 'uniquement CO₂ et eau dans tous les cas', 'uniquement du dioxygène', 'Le manque de dioxygène peut conduire à CO et à du carbone ; ne pas expérimenter hors encadrement.'));
add('3e-metaux',
  concept('Le fer réagissant avec un acide chlorhydrique dilué peut libérer…', 'du dihydrogène', 'du dioxygène', 'du diazote', 'Fe + 2 H⁺ → Fe²⁺ + H₂, dans les conditions étudiées.'),
  calculation('Fe + 2 H⁺ → Fe²⁺ + H₂. Avec 0,20 mol de Fe et H⁺ en excès, combien de moles de H₂ sont produites ?', .2, 'mol', 'Le rapport Fe/H₂ est 1:1 : 0,20 mol de Fe produit 0,20 mol de H₂.', 'Lisez les coefficients stœchiométriques.'),
  trap('Tous les métaux réagissent-ils de la même façon avec HCl dilué ?', 'Non, leur réactivité diffère', 'Oui, ils ont tous la même réactivité', 'Oui, ils produisent tous O₂', 'Le cuivre, notamment, ne réagit pas comme le fer avec HCl dilué dans les conditions usuelles.'));
add('3e-racines',
  concept('Pour a ≥ 0, √a désigne…', 'la racine carrée non négative de a', 'toujours deux nombres', 'toujours un entier', 'Le symbole √a désigne un seul nombre, non négatif.'),
  calculation('Calculez √49.', 7, '', '7² = 49 et 7 ≥ 0 : √49 = 7.', 'Cherchez le nombre non négatif dont le carré vaut 49.'),
  trap('Pour un réel x, √(x²) est égal à…', '|x|', 'x dans tous les cas', '−x dans tous les cas', 'Avec x = −3, √9 = 3 : il faut la valeur absolue.'));
add('3e-resistances',
  concept('Pour un conducteur ohmique, la loi d’Ohm s’écrit…', 'U = RI', 'U = R/I', 'R = UI', 'U est en volts, R en ohms et I en ampères.'),
  calculation('Une résistance de 20 Ω est soumise à 6 V. Calculez l’intensité.', .3, 'A', 'I = U/R = 6/20 = 0,30 A.', 'I = U/R.'),
  trap('Deux résistances de 10 Ω en série ont une résistance équivalente de…', '20 Ω', '5 Ω', '10 Ω', 'En série, les résistances s’ajoutent : 10 + 10 = 20 Ω.'));
add('3e-solutions-aqueuses',
  concept('La concentration massique s’exprime par…', 'masse de soluté / volume de solution', 'volume de solution / masse de soluté', 'masse de solvant × volume', 'Cₘ = m/V, avec des unités cohérentes.'),
  calculation('On dissout 10 g de soluté pour obtenir 0,50 L de solution. Calculez la concentration massique.', 20, 'g/L', 'Cₘ = 10/0,50 = 20 g/L.', 'Divisez la masse de soluté par le volume final de solution.'),
  trap('Lors d’une dilution sans perte ni réaction, la quantité de soluté…', 'reste constante', 'augmente avec le volume', 'devient nulle', 'On ajoute du solvant ; la quantité prélevée de soluté est conservée.'));
add('3e-statistiques',
  concept('La moyenne d’une série se calcule en…', 'divisant la somme des valeurs par l’effectif total', 'prenant toujours la valeur centrale', 'soustrayant le minimum du maximum', 'La valeur centrale est liée à la médiane ; maximum − minimum est l’étendue.'),
  calculation('Calculez la moyenne des valeurs 2, 4 et 9.', 5, '', '(2 + 4 + 9)/3 = 15/3 = 5.', 'Additionnez les trois valeurs puis divisez par 3.'),
  trap('Pour la série ordonnée 2, 4, 9, la médiane est…', '4', '5', '9', 'La médiane partage la série ordonnée : ici c’est la deuxième valeur.'));
add('3e-systemes',
  concept('Un couple solution d’un système de deux équations doit vérifier…', 'les deux équations simultanément', 'une seule équation au choix', 'aucune équation si les nombres sont positifs', 'Les deux conditions doivent être satisfaites ensemble.'),
  calculation('Dans le système x + y = 7 et x − y = 1, calculez x.', 4, '', 'En ajoutant : 2x = 8, donc x = 4 et y = 3.', 'Additionnez les deux équations pour éliminer y.'),
  trap('Le couple (4 ; 3) vérifie x + y = 7 et x − y = 1 car…', '4 + 3 = 7 et 4 − 3 = 1', 'seule la somme suffit', '4 × 3 = 12', 'La vérification doit porter sur chaque équation.'));
add('3e-thales',
  concept('Dans un triangle ABC, M ∈ [AB], N ∈ [AC] et MN ∥ BC. On a…', 'AM/AB = AN/AC = MN/BC', 'AM/AB = AC/AN', 'AM = AB dans tous les cas', 'Il faut garder le même ordre dans les rapports de côtés correspondants.'),
  calculation('MN ∥ BC, AM = 3 cm, AB = 6 cm, AC = 10 cm. Calculez AN.', 5, 'cm', 'AN/10 = 3/6 : AN = 5 cm.', 'Utilisez AM/AB = AN/AC.'),
  trap('Pour utiliser la réciproque de Thalès, il faut notamment contrôler…', 'les alignements et l’ordre des points', 'uniquement un angle droit', 'la couleur du schéma', 'L’égalité de rapports sans configuration et ordre adaptés ne suffit pas.'));
add('3e-travail-puissance',
  concept('La puissance moyenne est…', 'le travail divisé par la durée', 'le travail multiplié par la durée', 'la force divisée par la masse', 'P = W/Δt, avec P en watts et W en joules.'),
  calculation('Un travail de 600 J est effectué en 20 s. Calculez la puissance moyenne.', 30, 'W', 'P = 600/20 = 30 W.', 'Utilisez P = W/Δt.'),
  trap('Une force perpendiculaire au déplacement a un travail…', 'nul', 'toujours positif', 'toujours égal à sa norme', 'W = Fd cos 90° = 0 dans ce déplacement.'));
add('3e-trigonometrie',
  concept('Dans un triangle rectangle, le sinus d’un angle aigu vaut…', 'côté opposé / hypoténuse', 'côté adjacent / hypoténuse', 'hypoténuse / côté opposé', 'Identifiez d’abord les côtés par rapport à l’angle étudié.'),
  calculation('Le côté opposé à un angle aigu mesure 3 cm et l’hypoténuse 5 cm. Calculez son sinus.', .6, '', 'sin θ = 3/5 = 0,6.', 'Divisez le côté opposé par l’hypoténuse.'),
  trap('Un sinus de 1,4 pour un angle aigu d’un triangle rectangle…', 'signale une erreur', 'est possible', 'est toujours la bonne réponse', 'Le sinus d’un angle aigu est strictement compris entre 0 et 1.'));

add('4e-calcul-litteral',
  concept('Développer 3(x + 2) donne…', '3x + 6', '3x + 2', 'x + 6', 'La distributivité s’applique à chaque terme : 3x + 3 × 2.'),
  calculation('Évaluez 3(x + 2) pour x = 4.', 18, '', '3(4 + 2) = 3 × 6 = 18.', 'Calculez d’abord la parenthèse.'),
  trap('L’identité (a + b)² est…', 'a² + 2ab + b²', 'a² + b²', 'a² − b²', 'Le double produit 2ab ne doit pas être oublié.'));
add('4e-circuit-electrique',
  concept('Une lampe ne peut être parcourue par un courant permanent que si le circuit est…', 'fermé et alimenté', 'ouvert', 'sans source d’énergie', 'Une boucle conductrice fermée et un générateur adapté sont nécessaires.'),
  calculation('Trois dipôles en série sont parcourus par 0,20 A. Quelle intensité traverse le deuxième ?', .2, 'A', 'Dans une même branche en série, l’intensité est identique en tout point.', 'La loi d’unicité de l’intensité s’applique en série.'),
  trap('Court-circuiter directement une pile est…', 'dangereux et à éviter', 'un branchement normal', 'nécessaire pour allumer une lampe', 'Un courant trop important peut provoquer un échauffement ; utiliser uniquement des montages encadrés.'));
add('4e-fractions',
  concept('Pour additionner deux fractions de dénominateurs différents, on commence par…', 'les écrire avec un même dénominateur', 'additionner les dénominateurs', 'multiplier seulement les numérateurs', 'Le dénominateur commun permet d’additionner des parts de même taille.'),
  calculation('Calculez 1/2 + 1/4. Donnez une valeur décimale.', .75, '', '1/2 = 2/4, donc 2/4 + 1/4 = 3/4 = 0,75.', 'Utilisez le dénominateur commun 4.'),
  trap('Le produit de deux nombres négatifs est…', 'positif', 'négatif', 'toujours nul', 'La règle des signes donne (−) × (−) = (+).'));
add('4e-grandeurs-mesures',
  concept('Une mesure de longueur comprend…', 'une valeur et une unité', 'uniquement un nombre', 'uniquement une couleur', 'Sans unité, une valeur de longueur n’est pas interprétable.'),
  calculation('Convertissez 2,5 m en centimètres.', 250, 'cm', '1 m = 100 cm : 2,5 × 100 = 250 cm.', 'Multipliez par 100.'),
  trap('1 cm² vaut…', '0,0001 m²', '0,01 m²', '100 m²', 'Il faut élever le facteur au carré : (0,01 m)² = 0,0001 m².'));
add('4e-masse-volumique',
  concept('La masse volumique d’un corps est…', 'sa masse divisée par son volume', 'son volume divisé par sa masse', 'son poids multiplié par sa masse', 'ρ = m/V ; les unités peuvent être kg/m³ ou g/cm³.'),
  calculation('Un solide de 200 g occupe 50 cm³. Calculez sa masse volumique.', 4, 'g/cm³', 'ρ = 200/50 = 4 g/cm³.', 'Divisez la masse par le volume.'),
  trap('La densité par rapport à l’eau est…', 'un rapport sans unité', 'toujours en kilogrammes', 'toujours en newtons', 'Deux masses volumiques exprimées dans la même unité donnent un rapport sans unité.'));
add('4e-melanges-corps-purs',
  concept('Un mélange homogène présente, à l’échelle d’observation…', 'une seule phase visible', 'toujours plusieurs phases visibles', 'une seule espèce chimique nécessairement', 'Une seule phase visible peut contenir plusieurs espèces chimiques.'),
  calculation('Un mélange contient 10 g de sel et 90 g d’eau. Quel est le pourcentage massique de sel ?', 10, '%', 'La masse totale est 100 g : 10/100 × 100 = 10 %.', 'Divisez la masse de sel par la masse totale.'),
  trap('Filtrer une solution de sel dissous permet-il de récupérer le sel sur le filtre ?', 'Non, le sel dissous traverse le filtre usuel', 'Oui, tous les solutés sont retenus', 'Oui, le filtre transforme le sel en solide', 'La filtration usuelle sépare des particules insolubles, pas les ions dissous.'));
add('4e-mole',
  concept('La quantité de matière n se mesure en…', 'moles', 'grammes uniquement', 'litres uniquement', 'La mole est l’unité de quantité de matière.'),
  calculation('Un échantillon de 18 g a une masse molaire de 18 g/mol. Calculez n.', 1, 'mol', 'n = m/M = 18/18 = 1 mol.', 'Utilisez n = m/M.'),
  trap('Dans n = m/M, il faut…', 'exprimer m dans l’unité de masse utilisée pour M', 'toujours diviser des kg par des g/mol sans conversion', 'ajouter m et M', 'Avec M en g/mol, la masse m doit être exprimée en grammes.'));
add('4e-poids-masse',
  concept('Le poids est…', 'une force gravitationnelle', 'la quantité de matière en kg', 'un volume', 'La masse est en kg ; le poids, force, est en newtons.'),
  calculation('Un objet de masse 2 kg est placé où g = 10 N/kg. Calculez son poids.', 20, 'N', 'P = mg = 2 × 10 = 20 N.', 'Utilisez P = mg.'),
  trap('Transporté sur la Lune sans perte de matière, un objet conserve…', 'sa masse, mais son poids change', 'son poids, mais sa masse change', 'toujours sa masse et son poids terrestres', 'Le poids dépend de g, contrairement à la masse dans ce modèle.'));
add('4e-propagation-lumiere',
  concept('Dans un milieu transparent homogène, la lumière se propage…', 'en ligne droite', 'toujours en cercle', 'uniquement vers le haut', 'La propagation rectiligne s’applique dans les conditions du modèle étudié.'),
  calculation('À 300 000 km/s, quelle distance la lumière parcourt-elle en 2 s ?', 600000, 'km', 'd = vt = 300 000 × 2 = 600 000 km.', 'Multipliez la vitesse par la durée.'),
  trap('Pour voir un objet, il faut notamment que…', 'de la lumière venant de lui atteigne l’œil', 'l’œil éclaire l’objet', 'l’objet ait une masse nulle', 'L’objet émet ou diffuse de la lumière vers l’œil.'));
add('4e-proportionnalite',
  concept('Un tableau de proportionnalité possède…', 'un coefficient multiplicatif constant', 'toujours une différence constante', 'des valeurs toujours égales', 'On passe d’une ligne à l’autre avec le même facteur.'),
  calculation('Une réduction de 20 % s’applique à 5 000 FCFA. Quel est le prix après réduction ?', 4000, 'FCFA', 'Réduction : 5 000 × 0,20 = 1 000 ; prix : 5 000 − 1 000 = 4 000 FCFA.', 'Multipliez le prix initial par 0,80.'),
  trap('Augmenter un prix de 20 %, puis le diminuer de 20 %…', 'donne 96 % du prix initial', 'redonne toujours le prix initial', 'donne 120 % du prix initial', 'Les bases diffèrent : 1,20 × 0,80 = 0,96.'));
add('4e-puissances',
  concept('Pour un nombre a non nul, a⁰ vaut…', '1', '0', 'a', 'La règle a⁰ = 1 s’applique pour a ≠ 0.'),
  calculation('Calculez 2³ × 2².', 32, '', '2³ × 2² = 2⁵ = 32.', 'Pour une même base, additionnez les exposants.'),
  trap('L’écriture scientifique normalisée de 35 000 est…', '3,5 × 10⁴', '35 × 10³', '0,35 × 10⁵', 'Le coefficient doit être au moins 1 et strictement inférieur à 10.'));
add('4e-reaction-chimique',
  concept('Lors d’une réaction chimique dans un système fermé, on conserve…', 'les atomes de chaque élément', 'nécessairement les molécules initiales', 'nécessairement le volume', 'Les atomes sont réorganisés ; la masse totale se conserve dans le modèle chimique usuel.'),
  calculation('Dans 2 H₂ + O₂ → 2 H₂O, quel coefficient est placé devant H₂O ?', 2, '', '2 H₂O contient 4 atomes H et 2 atomes O, comme les réactifs.', 'Comptez H et O dans les deux membres.'),
  trap('Pour équilibrer une équation, on modifie…', 'les coefficients devant les formules', 'les indices à l’intérieur des formules', 'l’identité des éléments', 'Modifier un indice change l’espèce chimique.'));
add('4e-reflexion-refraction',
  concept('Les angles d’incidence et de réflexion se mesurent par rapport…', 'à la normale à la surface', 'à la surface elle-même', 'au bord de la feuille', 'La normale est perpendiculaire à la surface au point d’incidence.'),
  calculation('Un rayon arrive sur un miroir avec un angle d’incidence de 35°. Quel est l’angle de réflexion ?', 35, '°', 'La loi de la réflexion donne i = r = 35°.', 'L’angle réfléchi est égal à l’angle incident.'),
  trap('La réfraction correspond…', 'au passage entre deux milieux, avec changement possible de direction', 'à un retour dans le milieu initial comme la réflexion', 'toujours à une absorption totale', 'À incidence normale, la direction peut rester inchangée, même si la vitesse change.'));
add('4e-sciences-physiques',
  concept('Une expérience scientifique cherche notamment à…', 'tester une hypothèse à l’aide d’observations', 'confirmer toute idée sans mesure', 'éviter de décrire le protocole', 'Un protocole décrit permet de discuter et reproduire les observations.'),
  calculation('Trois mesures de longueur donnent 9 cm, 10 cm et 11 cm. Calculez leur moyenne.', 10, 'cm', '(9 + 10 + 11)/3 = 10 cm.', 'Additionnez puis divisez par le nombre de mesures.'),
  trap('Un résultat expérimental doit être présenté…', 'avec son unité et une précision adaptée', 'avec le plus de chiffres possible sans justification', 'sans unité', 'Le nombre de chiffres doit être cohérent avec la mesure.'));
add('4e-sources-lumiere',
  concept('Une source primaire de lumière…', 'produit la lumière qu’elle émet', 'diffuse seulement une lumière reçue', 'ne peut jamais être vue', 'Une lampe allumée est une source primaire ; un objet éclairé diffuse une lumière reçue.'),
  calculation('La lumière parcourt 900 000 km à 300 000 km/s. Calculez la durée.', 3, 's', 't = d/v = 900 000/300 000 = 3 s.', 'Divisez la distance par la vitesse.'),
  trap('La Lune visible est principalement…', 'un objet qui diffuse la lumière solaire', 'une étoile qui produit sa propre lumière visible', 'un objet éclairé par nos yeux', 'La Lune renvoie une partie de la lumière du Soleil.'));
add('4e-structure-matiere',
  concept('Un atome électriquement neutre contient…', 'autant d’électrons que de protons', 'toujours plus d’électrons que de protons', 'aucun proton', 'Les charges positives et négatives se compensent.'),
  calculation('Un atome neutre possède 6 protons. Combien possède-t-il d’électrons ?', 6, '', 'La neutralité impose 6 électrons pour 6 protons.', 'Comparez le nombre de charges positives et négatives.'),
  trap('Quand un atome perd un électron, il devient…', 'un ion positif', 'un ion négatif', 'un nouvel élément obligatoirement', 'Le noyau ne change pas ; la perte d’une charge négative donne un cation.'));
add('4e-triangle-rectangle',
  concept('Dans un triangle rectangle, l’hypoténuse est…', 'le côté opposé à l’angle droit', 'toujours le côté vertical', 'le côté le plus court', 'Elle est aussi le côté le plus long du triangle rectangle.'),
  calculation('Les côtés de l’angle droit mesurent 3 cm et 4 cm. Calculez l’hypoténuse.', 5, 'cm', 'c² = 3² + 4² = 25, donc c = 5 cm.', 'Appliquez le théorème de Pythagore.'),
  trap('Des longueurs 3, 4 et 6 peuvent-elles former un triangle rectangle ?', 'Non, car 3² + 4² ≠ 6²', 'Oui, car 3 + 4 > 6', 'Oui, car les trois côtés diffèrent', 'L’inégalité triangulaire permet un triangle, mais ne garantit pas un angle droit.'));

add('premiere-denombrement',
  concept('Choisir successivement deux objets distincts parmi 5, en tenant compte de l’ordre, correspond à…', 'un arrangement', 'une combinaison sans ordre', 'un tirage avec remise', 'L’ordre compte et le deuxième choix exclut le premier.'),
  calculation('Combien de couples ordonnés d’objets distincts peut-on former parmi 5 objets ?', 20, '', '5 choix puis 4 : 5 × 4 = 20.', 'Utilisez le principe multiplicatif.'),
  trap('Choisir 2 objets parmi 5 sans tenir compte de l’ordre donne…', '10 possibilités', '20 possibilités', '25 possibilités', 'Chaque paire a été comptée deux fois dans 5 × 4 : on divise par 2.'));
add('premiere-produit-scalaire',
  concept('Deux vecteurs non nuls sont orthogonaux si leur produit scalaire est…', 'nul', 'égal à 1', 'toujours positif', 'u·v = ||u|| ||v|| cos θ : pour θ = 90°, cos θ = 0.'),
  calculation('Dans un repère orthonormé, u = (2 ; 3), v = (4 ; −1). Calculez u·v.', 5, '', 'u·v = 2 × 4 + 3 × (−1) = 5.', 'Multipliez les coordonnées correspondantes puis additionnez.'),
  trap('La formule xx′ + yy′ pour un produit scalaire suppose…', 'un repère orthonormé', 'n’importe quel repère sans condition', 'des coordonnées toutes positives', 'Dans un repère quelconque, la géométrie des vecteurs de base doit être prise en compte.'));
add('premiere-s2-alcanes',
  concept('Un alcane acyclique saturé possède la formule générale…', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'Un alcane acyclique ne possède que des liaisons simples entre carbones.'),
  calculation('Combien d’atomes d’hydrogène contient une molécule de propane C₃H₈ ?', 8, '', 'Pour n = 3 : 2n + 2 = 8.', 'Utilisez 2n + 2.'),
  trap('Deux isomères de constitution ont…', 'la même formule brute, des enchaînements différents', 'toujours la même formule développée', 'des éléments chimiques obligatoirement différents', 'Le butane et le 2-méthylpropane ont la même formule C₄H₁₀.'));
add('premiere-s2-alcenes-alcynes',
  concept('Un alcène possède au moins…', 'une double liaison C=C', 'une triple liaison obligatoire', 'uniquement des liaisons simples', 'Les monoalcènes acycliques ont la formule CₙH₂ₙ.'),
  calculation('Un monoalcyne acyclique contient 4 carbones. Combien d’hydrogènes donne CₙH₂ₙ₋₂ ?', 6, '', '2 × 4 − 2 = 6 : C₄H₆.', 'Appliquez la formule des monoalcynes acycliques.'),
  trap('L’addition de H₂ sur une double liaison, en présence d’un catalyseur adapté…', 'réduit l’insaturation', 'ajoute une triple liaison', 'retire tous les carbones', 'L’hydrogénation transforme une liaison double en liaison simple dans ce modèle.'));
add('premiere-s2-aop-derivee-integrale',
  concept('Pour un dérivateur inverseur idéal, uₛ est proportionnelle…', 'à −duₑ/dt', 'uniquement à uₑ²', 'à la résistance seule', 'Dans son domaine de fonctionnement, uₛ = −RC duₑ/dt.'),
  calculation('Un dérivateur a RC = 0,01 s et duₑ/dt = 100 V/s. Calculez uₛ.', -1, 'V', 'uₛ = −0,01 × 100 = −1 V.', 'Utilisez uₛ = −RC duₑ/dt.'),
  trap('Pour un intégrateur inverseur idéal, une tension d’entrée constante positive produit…', 'une sortie qui décroît linéairement avant saturation', 'une sortie constante dans tous les cas', 'une sortie qui croît exponentiellement', 'duₛ/dt = −uₑ/(RC), tant que l’AOP reste dans son domaine linéaire.'));
add('premiere-s2-benzene',
  concept('La formule brute du benzène est…', 'C₆H₆', 'C₆H₁₄', 'C₆H₁₂', 'Le benzène est un composé aromatique cyclique à six carbones.'),
  calculation('Avec M(C) = 12 et M(H) = 1 g/mol, calculez la masse molaire de C₆H₆.', 78, 'g/mol', 'M = 6 × 12 + 6 × 1 = 78 g/mol.', 'Additionnez les contributions de C et H.'),
  trap('Le benzène doit être traité comme…', 'un produit dangereux à manipuler uniquement sous encadrement adapté', 'un produit sans risque à respirer', 'un produit à goûter pour l’identifier', 'Le benzène présente des risques graves ; les manipulations doivent suivre un protocole de laboratoire.'));
add('premiere-s2-calorimetrie',
  concept('Sans changement d’état, la chaleur reçue par un corps est modélisée par…', 'Q = mcΔT', 'Q = m/c', 'Q = c/ΔT', 'La capacité thermique massique c dépend du matériau et du domaine de température.'),
  calculation('0,50 kg d’eau, c = 4 200 J/(kg·°C), gagne 10 °C. Calculez Q.', 21000, 'J', 'Q = 0,50 × 4 200 × 10 = 21 000 J.', 'Multipliez m, c et la variation de température.'),
  trap('Dans un système thermiquement isolé comprenant plusieurs corps, on écrit…', 'la somme des chaleurs échangées égale à zéro', 'toutes les chaleurs positives', 'une disparition de l’énergie perdue', 'Les corps chauds cèdent de l’énergie, les corps froids en reçoivent.'));
add('premiere-s2-champ-electrostatique',
  concept('La force sur une charge q dans un champ E est…', 'F = qE', 'F = E/q dans tous les cas', 'F = q/E', 'La relation est vectorielle ; une charge négative subit une force opposée à E.'),
  calculation('Une charge +2 µC est dans un champ de 3 000 N/C. Calculez la norme de la force.', .006, 'N', 'F = |q|E = 2 × 10⁻⁶ × 3 000 = 0,006 N.', 'Convertissez les microcoulombs en coulombs.'),
  trap('Deux charges de même signe s’exercent des forces…', 'répulsives', 'attractives', 'nulles quelle que soit leur distance', 'La loi de Coulomb distingue attraction pour signes opposés et répulsion pour signes identiques.'));
add('premiere-s2-chimie-organique',
  concept('La valence usuelle du carbone dans les molécules organiques étudiées est…', '4', '1', '2', 'Le carbone forme usuellement quatre liaisons covalentes en comptant les multiplicités.'),
  calculation('Dans CH₃–CH₂–OH, combien d’atomes de carbone y a-t-il ?', 2, '', 'CH₃ et CH₂ apportent chacun un carbone : il y en a 2.', 'Comptez les groupes contenant C.'),
  trap('Une formule brute permet-elle toujours de déterminer l’enchaînement des atomes ?', 'Non, plusieurs isomères peuvent exister', 'Oui, sans aucune autre information', 'Oui, les liaisons sont toujours simples', 'La formule brute indique les nombres d’atomes, pas nécessairement la structure.'));
add('premiere-s2-classement-qualitatif',
  concept('Dans le couple Cu²⁺/Cu, l’oxydant est…', 'Cu²⁺', 'Cu', 'l’électron', 'Cu²⁺ peut capter deux électrons pour former Cu.'),
  calculation('Dans Zn + Cu²⁺ → Zn²⁺ + Cu, combien d’électrons sont transférés par atome de Zn ?', 2, '', 'Zn → Zn²⁺ + 2 e⁻ : deux électrons sont cédés.', 'Écrivez la demi-équation d’oxydation du zinc.'),
  trap('Observer une réaction métal/ion permet de comparer…', 'les pouvoirs réducteurs et oxydants dans les conditions testées', 'uniquement les masses des béchers', 'tous les métaux sans tenir compte du milieu', 'Le classement qualitatif s’appuie sur les réactions observées dans un milieu défini.'));
add('premiere-s2-classement-quantitatif',
  concept('À conditions standard, le couple de potentiel E° le plus élevé contient généralement…', 'l’oxydant le plus fort des couples comparés', 'le réducteur le plus fort', 'toujours le métal le plus lourd', 'Un potentiel standard plus élevé correspond à une tendance plus grande à la réduction.'),
  calculation('Une pile a E° cathode = 0,34 V et E° anode = −0,76 V. Calculez sa f.é.m. standard.', 1.1, 'V', 'E° pile = 0,34 − (−0,76) = 1,10 V.', 'Soustrayez le potentiel de l’anode de celui de la cathode.'),
  trap('Pour une pile débitant spontanément, l’oxydation a lieu…', 'à l’anode', 'à la cathode', 'dans aucun compartiment', 'Anode : oxydation ; cathode : réduction.'));
add('premiere-s2-composes-oxygenes',
  concept('Le groupe caractéristique d’un alcool usuel est…', 'un groupe −OH porté par un carbone saturé', 'le groupe −COOH', 'une triple liaison C≡C', 'Le groupe −COOH caractérise un acide carboxylique.'),
  calculation('Avec M(C)=12, M(H)=1 et M(O)=16 g/mol, calculez M de l’éthanol C₂H₆O.', 46, 'g/mol', 'M = 2 × 12 + 6 × 1 + 16 = 46 g/mol.', 'Additionnez les masses molaires atomiques.'),
  trap('Un aldéhyde et une cétone ont en commun…', 'un groupe carbonyle C=O', 'toujours un groupe −COOH', 'aucun atome d’oxygène', 'Ils diffèrent par les groupes liés au carbone du carbonyle.'));
add('premiere-s2-condensateurs',
  concept('La capacité d’un condensateur se définit par…', 'C = Q/U', 'C = QU', 'C = U/Q', 'La capacité s’exprime en farads.'),
  calculation('C = 100 µF et U = 10 V. Calculez la charge en microcoulombs.', 1000, 'µC', 'Q = CU = 100 × 10 = 1 000 µC.', 'Utilisez Q = CU en gardant le préfixe micro.'),
  trap('L’énergie stockée dans un condensateur idéal vaut…', 'CU²/2', 'CU/2', 'C/U²', 'E = ½CU² ; elle dépend du carré de la tension.'));
add('premiere-s2-couple-redox',
  concept('Une oxydation est…', 'une perte d’électrons', 'un gain d’électrons', 'toujours un gain de protons', 'La réduction est, inversement, un gain d’électrons.'),
  calculation('Dans Fe³⁺ + e⁻ → Fe²⁺, combien d’électrons capte chaque ion Fe³⁺ ?', 1, '', 'La charge passe de +3 à +2 après capture d’un électron.', 'Vérifiez la conservation de la charge.'),
  trap('Un oxydant…', 'capte des électrons et se réduit', 'cède des électrons et se réduit', 'capte des électrons et s’oxyde', 'Le rôle de l’oxydant est de provoquer l’oxydation d’un réducteur en captant ses électrons.'));
add('premiere-s2-electrolyse',
  concept('Une électrolyse est une transformation…', 'imposée par un apport d’énergie électrique', 'toujours spontanée sans générateur', 'sans transfert d’électrons', 'Le générateur impose le courant qui permet la transformation.'),
  calculation('Un courant de 2 A circule pendant 300 s. Calculez la charge transférée.', 600, 'C', 'Q = IΔt = 2 × 300 = 600 C.', 'Multipliez l’intensité par la durée en secondes.'),
  trap('Pendant une électrolyse, une réduction se produit…', 'à la cathode', 'à l’anode', 'sans apport d’électrons', 'La définition cathode = réduction reste valable pour piles et électrolyseurs.'));
add('premiere-s2-energie-cinetique',
  concept('L’énergie cinétique de translation s’écrit…', 'E꜀ = mv²/2', 'E꜀ = mv/2', 'E꜀ = m/v²', 'La vitesse doit être exprimée en m/s et la masse en kg pour obtenir des joules.'),
  calculation('Un objet de 2 kg se déplace à 3 m/s. Calculez son énergie cinétique.', 9, 'J', 'E꜀ = ½ × 2 × 3² = 9 J.', 'Élevez la vitesse au carré.'),
  trap('Si la vitesse double à masse constante, l’énergie cinétique…', 'est multipliée par 4', 'est multipliée par 2', 'est divisée par 4', 'L’énergie cinétique dépend de v².'));
add('premiere-s2-energie-electrique',
  concept('Pour une résistance ohmique, la puissance dissipée peut s’écrire…', 'P = RI²', 'P = R/I', 'P = I/R²', 'P = UI et U = RI donnent P = RI².'),
  calculation('Un appareil de puissance constante 100 W fonctionne 60 s. Calculez l’énergie reçue.', 6000, 'J', 'E = PΔt = 100 × 60 = 6 000 J.', 'Multipliez puissance et durée.'),
  trap('1 kWh est une unité…', 'd’énergie', 'de puissance', 'd’intensité', 'Le produit puissance × durée donne une énergie ; 1 kWh = 3,6 × 10⁶ J.'));
add('premiere-s2-energie-mecanique',
  concept('L’énergie mécanique est la somme…', 'des énergies cinétique et potentielle', 'de la masse et du poids', 'de la vitesse et du temps', 'Eₘ = E꜀ + Eₚ dans le modèle retenu.'),
  calculation('m = 2 kg, g = 10 N/kg, h = 3 m par rapport à la référence. Calculez Eₚ = mgh.', 60, 'J', 'Eₚ = 2 × 10 × 3 = 60 J.', 'Multipliez m, g et h.'),
  trap('Sans forces dissipatives, avec seulement des forces conservatives, l’énergie mécanique…', 'se conserve', 'augmente forcément', 'devient toujours nulle', 'Les échanges entre énergie potentielle et cinétique ne changent pas leur somme.'));
add('premiere-s2-lentilles',
  concept('Pour une lentille mince convergente, un rayon passant par le centre optique…', 'n’est pas dévié dans le modèle', 'passe toujours par le foyer image', 'est toujours réfléchi', 'Le rayon passant par O est l’un des rayons particuliers de construction.'),
  calculation('Une lentille convergente a f′ = 25 cm. Calculez sa vergence.', 4, 'dioptries', 'f′ = 0,25 m ; C = 1/f′ = 4 dioptries.', 'Convertissez la distance focale en mètres.'),
  trap('Une image virtuelle peut-elle être recueillie directement sur un écran ?', 'Non', 'Oui, toujours', 'Oui, si l’écran est opaque', 'Les rayons réels ne convergent pas au point de l’image virtuelle.'));
add('premiere-s2-ondes',
  concept('Une onde mécanique progressive transporte…', 'de l’énergie sans transport global de matière', 'toujours la matière sur toute sa distance', 'uniquement des électrons', 'Les éléments du milieu oscillent autour de leur position ; la perturbation se propage.'),
  calculation('Une onde de fréquence 5 Hz se propage à 10 m/s. Calculez sa longueur d’onde.', 2, 'm', 'λ = v/f = 10/5 = 2 m.', 'Utilisez v = λf.'),
  trap('Une onde mécanique peut-elle se propager dans le vide ?', 'Non, elle nécessite un milieu matériel', 'Oui, comme toute onde', 'Oui, seulement si sa fréquence est élevée', 'Les ondes électromagnétiques peuvent se propager dans le vide, contrairement aux ondes mécaniques.'));
add('premiere-s2-phosphates-engrais-plastiques',
  concept('Dans la désignation d’un engrais NPK, P se rapporte…', 'au phosphore', 'au potassium', 'au plomb', 'N, P et K désignent azote, phosphore et potassium ; les teneurs suivent des conventions d’étiquetage.'),
  calculation('Lors d’une polymérisation par addition, 100 molécules d’éthène forment une chaîne idéale sans perte d’atomes. Combien d’atomes de carbone contient-elle ?', 200, '', 'Chaque éthène C₂H₄ apporte deux carbones : 100 × 2 = 200.', 'Comptez deux carbones par monomère.'),
  trap('Un apport excessif de phosphates dans un cours d’eau peut favoriser…', 'l’eutrophisation', 'la disparition de toute croissance végétale', 'une réduction systématique de toutes les algues', 'L’excès de nutriments peut provoquer une prolifération d’algues et dégrader l’oxygénation.'));
add('premiere-s2-potentiel-electrostatique',
  concept('Le travail de la force électrostatique de A vers B s’écrit…', 'W = q(VA − VB)', 'W = q(VB − VA) dans tous les cas', 'W = VA + VB', 'L’énergie potentielle électrostatique varie de q(VB − VA) ; W = −ΔEₚ.'),
  calculation('q = +2 µC et VA − VB = 100 V. Calculez le travail de la force électrostatique.', .0002, 'J', 'W = 2 × 10⁻⁶ × 100 = 2 × 10⁻⁴ J.', 'Utilisez W = q(VA − VB).'),
  trap('Pour une charge négative, la force électrostatique est…', 'opposée au champ électrique', 'toujours dirigée comme le champ', 'nulle dans tout champ', 'F = qE : un q négatif inverse le sens du vecteur.'));
add('premiere-s2-redox-seche',
  concept('Dans 2 Mg + O₂ → 2 MgO, le magnésium…', 's’oxyde', 'se réduit', 'ne change pas de nombre d’oxydation', 'Mg passe de 0 à +II : il perd des électrons.'),
  calculation('Combien de moles de Mg réagissent avec 0,50 mol de O₂ selon 2 Mg + O₂ → 2 MgO ?', 1, 'mol', 'Le rapport Mg/O₂ est 2:1, donc 2 × 0,50 = 1 mol.', 'Lisez les coefficients de l’équation.'),
  trap('L’oxydant de cette réaction est…', 'O₂', 'Mg', 'MgO en tant que réactif', 'L’oxygène se réduit de 0 à −II dans MgO.'));
add('premiere-s2-redox-solution',
  concept('Pour équilibrer une réaction d’oxydoréduction, les électrons cédés doivent…', 'être aussi nombreux que les électrons captés', 'rester dans l’équation globale', 'être ignorés', 'La conservation de la charge impose l’égalité du nombre d’électrons échangés.'),
  calculation('Dans Fe²⁺ → Fe³⁺ + e⁻, combien de moles d’électrons libèrent 0,30 mol de Fe²⁺ ?', .3, 'mol', 'Chaque ion libère un électron : le rapport molaire est 1:1.', 'Utilisez la demi-équation.'),
  trap('Dans MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O, MnO₄⁻ est…', 'l’oxydant', 'le réducteur', 'un électron', 'L’ion permanganate capte cinq électrons et se réduit en milieu acide.'));
add('premiere-s2-travail-puissance',
  concept('Le travail d’une force constante sur un déplacement rectiligne vaut…', 'W = Fd cos θ', 'W = F/d', 'W = Fd sans condition sur la direction', 'θ est l’angle entre la force et le déplacement.'),
  calculation('Une force de 10 N agit dans le sens d’un déplacement de 3 m. Calculez son travail.', 30, 'J', 'θ = 0°, donc W = 10 × 3 = 30 J.', 'Le cosinus de 0° vaut 1.'),
  trap('Une force de frottement opposée au déplacement effectue un travail…', 'négatif', 'toujours positif', 'toujours nul', 'L’angle est 180° et cos 180° = −1.'));
add('premiere-second-degre',
  concept('Pour ax² + bx + c = 0, a ≠ 0, le discriminant vaut…', 'b² − 4ac', 'b² + 4ac', 'a² − 4bc', 'Le signe de Δ détermine le nombre de racines réelles.'),
  calculation('Calculez le discriminant de x² − 5x + 6.', 1, '', 'Δ = (−5)² − 4 × 1 × 6 = 25 − 24 = 1.', 'Identifiez a = 1, b = −5 et c = 6.'),
  trap('Si Δ < 0, un trinôme réel de degré deux possède…', 'aucune racine réelle', 'deux racines réelles distinctes', 'une racine réelle double', 'Les racines réelles nécessitent Δ ≥ 0.'));
add('premiere-suites',
  concept('Une suite arithmétique vérifie…', 'uₙ₊₁ = uₙ + r', 'uₙ₊₁ = q uₙ uniquement', 'uₙ₊₁ = uₙ² toujours', 'La différence de deux termes consécutifs est constante.'),
  calculation('Une suite arithmétique a u₀ = 3 et r = 2. Calculez u₄.', 11, '', 'u₄ = u₀ + 4r = 3 + 8 = 11.', 'L’indice initial est 0.'),
  trap('Pour une suite géométrique de premier terme u₀ et raison q, on écrit…', 'uₙ = u₀qⁿ', 'uₙ = u₀ + nq', 'uₙ = nq uniquement', 'La raison géométrique multiplie chaque terme, contrairement à la raison arithmétique.'));

add('seconde-ensembles',
  concept('L’intervalle [−2 ; 3[ contient…', '−2 mais pas 3', '3 mais pas −2', 'ni −2 ni 3', 'Un crochet fermé inclut la borne ; un crochet ouvert l’exclut.'),
  calculation('Calculez |−7|.', 7, '', 'La valeur absolue est la distance à zéro : |−7| = 7.', 'Une distance est non négative.'),
  trap('L’équation |x| = 3 admet…', 'x = −3 ou x = 3', 'uniquement x = 3', 'uniquement x = −3', 'Deux nombres sont à la distance 3 de zéro.'));
add('seconde-fonctions',
  concept('Pour f(x) = 1/(x − 2), la valeur interdite est…', '2', '0', '−2', 'Le dénominateur ne doit pas être nul.'),
  calculation('Pour f(x) = x² − 1, calculez f(3).', 8, '', 'f(3) = 9 − 1 = 8.', 'Remplacez x par 3.'),
  trap('Un antécédent de 8 par f(x) = x² − 1 est…', '−3', '8', '−8', 'f(−3) = 9 − 1 = 8 ; une image peut avoir plusieurs antécédents.'));
add('seconde-polynomes',
  concept('L’expression (x² − 1)/(x − 1) est définie seulement si…', 'x ≠ 1', 'x ≠ −1', 'x ≠ 0', 'Le dénominateur x − 1 doit être non nul.'),
  calculation('Pour x = 3, calculez (x² − 1)/(x − 1).', 4, '', '(9 − 1)/(3 − 1) = 8/2 = 4.', 'Vous pouvez factoriser x² − 1.'),
  trap('Simplifier (x² − 1)/(x − 1) en x + 1…', 'conserve l’exclusion x = 1', 'autorise x = 1 dans l’expression initiale', 'donne x − 1', 'La simplification ne rétablit pas une valeur initialement interdite.'));
add('seconde-s-amplification',
  concept('Pour un AOP inverseur idéal en régime linéaire, le gain vaut…', '−R₂/R₁', 'R₁ + R₂', 'toujours +1', 'uₛ/uₑ = −R₂/R₁ pour le montage inverseur étudié.'),
  calculation('Le gain vaut −5 et uₑ = 0,20 V. Calculez uₛ en régime linéaire.', -1, 'V', 'uₛ = −5 × 0,20 = −1 V.', 'Multipliez le gain par la tension d’entrée.'),
  trap('Si la sortie théorique dépasse les tensions permises par l’alimentation, l’AOP…', 'peut saturer', 'fournit une tension infinie', 'reste nécessairement linéaire', 'La formule du gain linéaire ne suffit plus après saturation.'));
add('seconde-s-atomes',
  concept('Le numéro atomique Z indique…', 'le nombre de protons', 'le nombre de neutrons', 'la masse en grammes', 'Z identifie l’élément chimique.'),
  calculation('Un noyau a A = 23 et Z = 11. Combien contient-il de neutrons ?', 12, '', 'N = A − Z = 23 − 11 = 12.', 'Soustrayez le nombre de protons du nombre de nucléons.'),
  trap('Deux isotopes d’un même élément ont…', 'le même Z et des nombres de neutrons différents', 'des Z différents', 'toujours la même masse', 'L’identité de l’élément dépend du nombre de protons.'));
add('seconde-s-courant',
  concept('Dans un métal, le courant électrique est dû…', 'au mouvement organisé des électrons libres', 'au mouvement des noyaux le long du fil', 'à l’absence totale de charges', 'Les électrons mobiles sont les porteurs de charge dans le métal.'),
  calculation('Une charge de 18 C traverse un fil pendant 60 s. Calculez l’intensité moyenne.', .3, 'A', 'I = Q/Δt = 18/60 = 0,30 A.', 'Utilisez I = Q/Δt.'),
  trap('Un ampèremètre se branche…', 'en série dans la branche étudiée', 'directement en dérivation sur une pile', 'sans tenir compte du calibre', 'Son faible fonctionnement résistif rend un branchement direct aux bornes d’une source dangereux.'));
add('seconde-s-dipoles-actifs',
  concept('Pour un générateur réel débitant un courant I, on utilise…', 'U = E − rI', 'U = E + rI dans cette convention', 'U = r/I', 'La chute de tension interne rI réduit la tension disponible aux bornes.'),
  calculation('E = 12 V, r = 2 Ω et I = 1 A. Calculez U pour le générateur débitant.', 10, 'V', 'U = 12 − 2 × 1 = 10 V.', 'Utilisez U = E − rI.'),
  trap('Pour un générateur idéal, la résistance interne r est…', 'nulle', 'infinie', 'égale à E', 'Dans le modèle idéal, U = E indépendamment du courant dans le domaine retenu.'));
add('seconde-s-dipoles-passifs',
  concept('La caractéristique d’un conducteur ohmique idéal est…', 'une droite passant par l’origine dans le plan (I ; U)', 'toujours un cercle', 'une droite U constante non nulle', 'U = RI est une relation de proportionnalité.'),
  calculation('Une résistance de 50 Ω est traversée par 0,10 A. Calculez U.', 5, 'V', 'U = RI = 50 × 0,10 = 5 V.', 'Multipliez R par I.'),
  trap('Pour deux résistances de 20 Ω en parallèle, la résistance équivalente vaut…', '10 Ω', '40 Ω', '20 Ω', '1/Rₑ = 1/20 + 1/20, donc Rₑ = 10 Ω.'));
add('seconde-s-electrisation',
  concept('L’électrisation par frottement correspond usuellement à…', 'un transfert d’électrons entre matériaux', 'un transfert de protons libres', 'une création de charge totale', 'Le transfert modifie la répartition des charges tout en conservant leur somme.'),
  calculation('Un objet gagne 10¹² électrons. Avec e = 1,6 × 10⁻¹⁹ C, calculez sa charge nette ajoutée.', -1.6e-7, 'C', 'Δq = −Ne = −10¹² × 1,6 × 10⁻¹⁹ = −1,6 × 10⁻⁷ C.', 'La charge d’un électron est négative.'),
  trap('Deux objets chargés de signes opposés…', 's’attirent', 'se repoussent toujours', 'n’exercent aucune force', 'Les interactions électrostatiques dépendent du signe des charges.'));
add('seconde-s-equation-bilan',
  concept('Une équation-bilan équilibrée conserve…', 'les atomes de chaque élément et la charge totale', 'le nombre total de molécules nécessairement', 'le volume total nécessairement', 'Les espèces se transforment ; atomes et charges se conservent.'),
  calculation('Dans CH₄ + a O₂ → CO₂ + 2 H₂O, calculez a.', 2, '', 'Les produits contiennent 4 atomes O : il faut 2 molécules O₂.', 'Comptez les atomes d’oxygène.'),
  trap('Le réactif limitant est celui…', 'qui est épuisé le premier selon les proportions stœchiométriques', 'dont la masse est toujours la plus faible', 'dont le volume est toujours le plus grand', 'On compare les quantités initiales rapportées aux coefficients, pas seulement les masses.'));
add('seconde-s-equilibre-forces',
  concept('Un solide au repos soumis à trois forces coplanaires non parallèles a notamment…', 'des droites d’action concourantes', 'trois forces de même sens', 'des forces sans point d’application', 'L’équilibre impose aussi la fermeture du triangle des forces.'),
  calculation('Deux composantes perpendiculaires de 3 N et 4 N ont une résultante de quelle norme ?', 5, 'N', 'R = √(3² + 4²) = 5 N.', 'Appliquez Pythagore aux composantes.'),
  trap('Pour équilibrer cette résultante de 5 N, la troisième force doit être…', 'de même norme et de sens opposé à la résultante', 'de même sens que la résultante', 'nulle', 'L’équilibre exige que la somme vectorielle des forces soit nulle, avec les conditions sur les moments.'));
add('seconde-s-forces',
  concept('L’unité SI de la norme d’une force est…', 'le newton', 'le kilogramme', 'le joule', 'Une force se mesure en N, pas en kg.'),
  calculation('Un ressort de raideur 100 N/m est allongé de 0,03 m dans son domaine élastique. Calculez la norme de sa force de rappel.', 3, 'N', 'F = kΔℓ = 100 × 0,03 = 3 N.', 'Utilisez la loi de Hooke.'),
  trap('Les forces d’action et de réaction agissent…', 'sur deux corps différents', 'sur le même corps et s’annulent dans son bilan', 'toujours dans le même sens', 'Elles sont opposées mais appartiennent à des bilans de forces de corps différents.'));
add('seconde-s-intensite',
  concept('À un nœud de circuit, la somme des intensités entrantes est…', 'égale à la somme des intensités sortantes', 'toujours égale à zéro indépendamment des signes', 'toujours supérieure aux sortantes', 'La loi des nœuds traduit la conservation de la charge.'),
  calculation('0,80 A entrent dans un nœud. Une branche sortante porte 0,30 A. Quelle intensité porte la seule autre branche sortante ?', .5, 'A', '0,80 = 0,30 + I, donc I = 0,50 A.', 'Appliquez la loi des nœuds.'),
  trap('Une intensité de 250 mA correspond à…', '0,250 A', '250 A', '25 A', 'Le préfixe milli vaut 10⁻³.'));
add('seconde-s-ions',
  concept('Avec NaOH, un précipité bleu est un indice de présence de…', 'Cu²⁺ dans les conditions du test', 'Na⁺ uniquement', 'Cl⁻ uniquement', 'Cu²⁺ + 2 OH⁻ forme un précipité bleu de Cu(OH)₂.'),
  calculation('Cu²⁺ + 2 OH⁻ → Cu(OH)₂. Combien de moles de OH⁻ faut-il pour 0,10 mol de Cu²⁺ ?', .2, 'mol', 'Il faut deux fois autant de OH⁻ : 2 × 0,10 = 0,20 mol.', 'Utilisez le rapport 2:1.'),
  trap('L’identification d’un ion par précipitation doit tenir compte…', 'des réactifs et des conditions du test', 'uniquement de la couleur de la bouteille', 'du goût de la solution', 'Les tests se réalisent sous encadrement et leurs observations doivent être interprétées dans le protocole.'));
add('seconde-s-liaisons',
  concept('Une liaison covalente simple met en commun…', 'un doublet d’électrons', 'un seul proton', 'deux noyaux fusionnés', 'Deux électrons constituent le doublet liant.'),
  calculation('Dans une représentation de Lewis de H₂O, combien de liaisons simples O–H y a-t-il ?', 2, '', 'L’oxygène est lié à chacun des deux hydrogènes.', 'Comptez les deux atomes H.'),
  trap('Dans les molécules usuelles étudiées, l’hydrogène respecte…', 'la règle du duet', 'toujours la règle de l’octet', 'la règle des douze électrons', 'La première couche est complète avec deux électrons.'));
add('seconde-s-melanges',
  concept('Pour séparer un solide insoluble d’un liquide, on peut utiliser…', 'une filtration', 'une simple dilution', 'une électrisation obligatoire', 'Le filtre retient les particules insolubles adaptées à sa porosité.'),
  calculation('On mélange 30 g de sel avec 120 g d’eau, sans perte. Calculez la masse totale.', 150, 'g', 'La masse totale est 30 + 120 = 150 g.', 'Additionnez les masses.'),
  trap('L’eau salée limpide est…', 'un mélange homogène', 'un corps pur parce qu’elle est transparente', 'toujours un mélange hétérogène', 'La transparence ne prouve pas qu’une seule espèce chimique est présente.'));
add('seconde-s-mole',
  concept('Le nombre d’entités N et la quantité de matière n sont liés par…', 'N = nNₐ', 'N = n/Nₐ', 'N = n + Nₐ', 'Nₐ est la constante d’Avogadro.'),
  calculation('M(CO₂) = 44 g/mol. Combien de moles représentent 11 g de CO₂ ?', .25, 'mol', 'n = m/M = 11/44 = 0,25 mol.', 'Utilisez n = m/M.'),
  trap('Le volume molaire d’un gaz dépend notamment…', 'de la température et de la pression', 'uniquement de sa couleur', 'jamais des conditions', 'Une valeur de volume molaire doit être associée à des conditions définies.'));
add('seconde-s-moments',
  concept('Le moment d’une force par rapport à un axe dépend…', 'de la force et de son bras de levier', 'uniquement de la masse du levier', 'uniquement de la durée', 'Pour une force perpendiculaire au bras, |M| = Fd.'),
  calculation('Une force de 20 N agit avec un bras de levier de 0,30 m. Calculez la norme du moment.', 6, 'N·m', '|M| = 20 × 0,30 = 6 N·m.', 'Multipliez F par la distance à la droite d’action.'),
  trap('Si la droite d’action passe par l’axe, le moment de la force vaut…', 'zéro', 'sa norme F', 'l’infini', 'Le bras de levier est nul.'));
add('seconde-s-mouvement',
  concept('Décrire un mouvement nécessite d’abord de choisir…', 'un référentiel', 'une couleur', 'une masse nulle', 'Trajectoire et vitesse sont définies relativement au référentiel choisi.'),
  calculation('Un mobile parcourt 150 m en 30 s. Calculez sa vitesse moyenne.', 5, 'm/s', 'v moyenne = distance/durée = 150/30 = 5 m/s.', 'Divisez la distance par la durée.'),
  trap('Un passager assis dans un bus en mouvement est…', 'immobile dans le bus, en mouvement par rapport à la route', 'immobile dans tous les référentiels', 'en mouvement par rapport à son siège', 'Le caractère de repos ou de mouvement dépend du référentiel.'));
add('seconde-s-ph-indicateurs',
  concept('Un indicateur coloré permet…', 'de situer le pH dans une zone à partir de sa couleur', 'de donner toujours un pH exact', 'd’identifier tous les solutés', 'La couleur doit être comparée à la table de l’indicateur utilisé.'),
  calculation('À 25 °C, de combien de points le pH 9 dépasse-t-il le pH neutre 7 ?', 2, '', '9 − 7 = 2 points de pH.', 'Soustrayez 7 de 9.'),
  trap('Le pH d’un mélange est-il toujours la moyenne des pH initiaux ?', 'Non', 'Oui', 'Oui, quelle que soit la réaction', 'Le pH n’est pas une grandeur additive ; les quantités, réactions et équilibres comptent.'));
add('seconde-s-poids-masse',
  concept('Dans P = mg, g se mesure notamment en…', 'N/kg', 'kg/N', 'kg uniquement', 'g est l’intensité du champ de pesanteur ; N/kg est équivalent à m/s².'),
  calculation('m = 0,50 kg et g = 10 N/kg. Calculez le poids.', 5, 'N', 'P = 0,50 × 10 = 5 N.', 'Multipliez la masse par g.'),
  trap('Le poids d’un objet dépend…', 'du champ de pesanteur local', 'uniquement de sa couleur', 'uniquement de son volume', 'À masse constante, une variation de g modifie P.'));
add('seconde-s-propagation',
  concept('La vitesse de la lumière dans le vide est environ…', '3 × 10⁸ m/s', '3 × 10³ m/s', '300 m/s', 'Cette valeur est souvent notée c.'),
  calculation('Avec c = 3 × 10⁸ m/s, quelle distance est parcourue en 10⁻⁶ s ?', 300, 'm', 'd = ct = 3 × 10⁸ × 10⁻⁶ = 300 m.', 'Additionnez les exposants des puissances de 10.'),
  trap('La propagation rectiligne suppose…', 'un milieu homogène dans le modèle géométrique', 'tout milieu sans exception', 'uniquement un milieu opaque', 'Un changement de milieu ou un indice variable peut changer la direction.'));
add('seconde-s-reflexion',
  concept('La loi de la réflexion donne…', 'i = r, angles mesurés à la normale', 'i + r = 90° toujours', 'r = 2i', 'Le rayon incident, le rayon réfléchi et la normale sont dans le même plan.'),
  calculation('L’incidence vaut 40°. Quel est l’angle du rayon réfléchi avec la surface du miroir ?', 50, '°', 'r = 40° par rapport à la normale ; avec la surface : 90 − 40 = 50°.', 'Distinguez angle à la normale et angle à la surface.'),
  trap('L’image d’un objet dans un miroir plan est…', 'virtuelle et symétrique par rapport au miroir', 'réelle sur la surface du miroir', 'toujours agrandie', 'Elle se situe géométriquement derrière le miroir, à la même distance que l’objet devant.'));
add('seconde-s-refraction-dispersion',
  concept('La loi de Snell-Descartes s’écrit…', 'n₁ sin i = n₂ sin r', 'n₁ cos i = n₂ cos r', 'n₁i = n₂r dans tous les cas', 'Les angles se mesurent par rapport à la normale.'),
  calculation('Avec n₁ = 1, n₂ = 1,5 et sin i = 0,60, calculez sin r.', .4, '', 'sin r = n₁ sin i/n₂ = 0,60/1,5 = 0,40.', 'Isolez sin r dans la loi de réfraction.'),
  trap('En passant de l’air au verre à incidence oblique usuelle, un rayon…', 'se rapproche de la normale', 's’éloigne toujours de la normale', 'ne change jamais de vitesse', 'L’indice augmente : sin r diminue et r < i.'));
add('seconde-s-solution-acide',
  concept('À 25 °C, une solution aqueuse acide a…', 'un pH inférieur à 7', 'un pH supérieur à 7', 'toujours un pH égal à 7', 'L’acidité est liée à la concentration des ions oxonium.'),
  calculation('Un acide monoprotique fort de concentration 0,01 mol/L est totalement dissocié. En négligeant l’eau, calculez le pH.', 2, '', 'pH = −log₁₀(10⁻²) = 2.', 'Utilisez [H₃O⁺] ≈ 10⁻² mol/L.'),
  trap('Diluer un acide avec de l’eau neutre, sans réaction autre, tend à…', 'augmenter son pH vers celui de l’eau', 'le rendre automatiquement basique', 'augmenter sa concentration', 'La concentration acide diminue, sans franchir automatiquement le pH neutre.'));
add('seconde-s-solution-basique',
  concept('À 25 °C, une solution aqueuse basique a…', 'un pH supérieur à 7', 'un pH inférieur à 7', 'toujours un pH égal à zéro', 'Les ions hydroxyde sont plus concentrés que les ions oxonium.'),
  calculation('À 25 °C, [OH⁻] = 10⁻³ mol/L. Avec pH + pOH = 14, calculez le pH.', 11, '', 'pOH = 3 ; pH = 14 − 3 = 11.', 'Calculez d’abord pOH = −log₁₀[OH⁻].'),
  trap('Une solution basique peut être…', 'corrosive et nécessiter des protections', 'toujours sans danger', 'identifiée en la goûtant', 'Un pH élevé n’implique pas l’innocuité ; suivre le protocole encadré.'));
add('seconde-s-solutions',
  concept('La concentration molaire est…', 'C = n/V', 'C = V/n', 'C = nV', 'Avec n en mol et V en L, C s’exprime en mol/L.'),
  calculation('0,20 mol sont dissoutes pour obtenir 0,50 L de solution. Calculez C.', .4, 'mol/L', 'C = 0,20/0,50 = 0,40 mol/L.', 'Utilisez le volume final de solution.'),
  trap('Lors d’une dilution idéale, la relation correcte est…', 'C₁V₁ = C₂V₂', 'C₁ + V₁ = C₂ + V₂', 'C₁/C₂ = V₁/V₂', 'La quantité de soluté se conserve entre prélèvement et solution diluée.'));
add('seconde-s-tension',
  concept('Un voltmètre se branche…', 'en dérivation aux bornes du dipôle', 'en série dans toute la branche', 'directement à la place de la pile', 'Il mesure une différence de potentiel entre deux points.'),
  calculation('VA = 8 V et VB = 3 V. Calculez UAB = VA − VB.', 5, 'V', 'UAB = 8 − 3 = 5 V.', 'Respectez l’ordre A puis B.'),
  trap('Si UAB = 5 V, UBA vaut…', '−5 V', '+5 V', '0 V', 'Inverser les points change le signe de la tension.'));
add('seconde-vecteurs',
  concept('Pour A(xA ; yA) et B(xB ; yB), le vecteur AB a pour coordonnées…', '(xB − xA ; yB − yA)', '(xA + xB ; yA + yB)', '(xA − xB ; yA − yB)', 'On soustrait les coordonnées du point de départ à celles du point d’arrivée.'),
  calculation('A(1 ; 2) et B(4 ; 6). Calculez la norme de AB dans un repère orthonormé.', 5, '', 'AB = (3 ; 4) et ||AB|| = √(9 + 16) = 5.', 'Calculez les coordonnées puis appliquez Pythagore.'),
  trap('Les vecteurs AB et BA sont…', 'opposés', 'toujours égaux', 'toujours perpendiculaires', 'BA = −AB ; leur norme est la même.'));

add('terminale-acide-base-forts',
  concept('À l’équivalence d’un dosage acide-base, les réactifs sont…', 'dans les proportions stœchiométriques', 'toujours de même concentration', 'toujours de même volume', 'On compare les quantités de matière avec les coefficients de l’équation.'),
  calculation('On dose 20 mL d’un monoacide fort par une base forte à 0,10 mol/L. L’équivalence est à 10 mL, rapport 1:1. Calculez la concentration de l’acide.', .05, 'mol/L', 'CA VA = CB VE : CA = 0,10 × 10/20 = 0,050 mol/L.', 'Les volumes peuvent rester tous deux en mL dans ce rapport.'),
  trap('Le pH d’équivalence vaut 7 à 25 °C dans le cas idéal…', 'd’un acide fort dosé par une base forte', 'de tous les dosages acide-base', 'd’un acide faible dosé par une base forte', 'La valeur 7 n’est pas universelle ; elle dépend de la nature des espèces et de la température.'));
add('terminale-acides-amines',
  concept('Un acide α-aminé usuel possède…', 'une fonction amine et une fonction carboxyle sur le même carbone α', 'uniquement une fonction alcool', 'uniquement des liaisons C=C', 'Sa forme non ionisée peut s’écrire H₂N–CH(R)–COOH.'),
  calculation('H₂N–CH₂–COOH a la formule C₂H₅NO₂. Avec C=12, H=1, N=14 et O=16 g/mol, calculez M.', 75, 'g/mol', 'M = 24 + 5 + 14 + 32 = 75 g/mol.', 'Additionnez les contributions de chaque élément.'),
  trap('La glycine est-elle chirale ?', 'Non, son carbone α porte deux hydrogènes', 'Oui, tout acide aminé est chiral', 'Oui, parce qu’elle contient de l’azote', 'Un carbone asymétrique doit porter quatre substituants différents.'));
add('terminale-acides-bases-faibles',
  concept('Un acide faible en solution aqueuse…', 'réagit partiellement avec l’eau à l’équilibre', 'est obligatoirement peu concentré', 'ne réagit jamais avec l’eau', 'La force décrit l’équilibre chimique, la concentration décrit la quantité par volume.'),
  calculation('Un couple a Kₐ = 10⁻⁵. Calculez pKₐ.', 5, '', 'pKₐ = −log₁₀ Kₐ = 5.', 'Utilisez la définition de pKₐ.'),
  trap('À température et conditions comparables, un pKₐ plus faible correspond à…', 'un acide plus fort', 'un acide plus faible', 'une base toujours inexistante', 'pKₐ plus faible signifie Kₐ plus grand.'));
add('terminale-acides-carboxyliques',
  concept('Le groupe caractéristique d’un acide carboxylique est…', '−COOH', '−CHO', '−OH uniquement', 'Il réunit un carbonyle et un hydroxyle sur le même carbone.'),
  calculation('CH₃COOH a pour formule C₂H₄O₂. Avec C=12, H=1 et O=16 g/mol, calculez M.', 60, 'g/mol', 'M = 2 × 12 + 4 × 1 + 2 × 16 = 60 g/mol.', 'Comptez tous les atomes, y compris le H du groupe COOH.'),
  trap('L’estérification usuelle acide + alcool est…', 'limitée par un équilibre', 'toujours totale sans condition', 'toujours sans formation d’eau', 'Elle produit un ester et de l’eau et est réversible dans le modèle étudié.'));
add('terminale-alcools',
  concept('Le carbone portant −OH dans un alcool secondaire est lié à…', 'deux autres carbones', 'trois autres carbones', 'aucun autre carbone nécessairement', 'La classe dépend du nombre de carbones voisins du carbone fonctionnel.'),
  calculation('Le propan-2-ol a la formule C₃H₈O. Avec C=12, H=1 et O=16 g/mol, calculez M.', 60, 'g/mol', 'M = 36 + 8 + 16 = 60 g/mol.', 'Additionnez les masses molaires atomiques.'),
  trap('L’oxydation ménagée d’un alcool secondaire donne usuellement…', 'une cétone', 'un aldéhyde', 'un alcane', 'Un alcool primaire peut donner un aldéhyde puis un acide ; un secondaire donne une cétone.'));
add('terminale-amines',
  concept('Une amine primaire possède un groupe…', 'R−NH₂', 'R−COOH', 'R−CHO', 'Le groupe amine dérive formellement de NH₃ par remplacement d’hydrogènes par des groupes carbonés.'),
  calculation('CH₃NH₂ a la formule CH₅N. Avec C=12, H=1 et N=14 g/mol, calculez M.', 31, 'g/mol', 'M = 12 + 5 + 14 = 31 g/mol.', 'Comptez les trois H de CH₃ et les deux H de NH₂.'),
  trap('Une amine peut se comporter comme une base car…', 'l’azote peut capter un proton grâce à son doublet', 'elle cède toujours un électron libre', 'elle ne contient jamais d’hydrogène', 'Le doublet non liant de l’azote peut former une liaison avec H⁺.'));
add('terminale-applications-dynamique',
  concept('Un objet en chute libre dans le modèle sans air est soumis…', 'uniquement à son poids', 'au poids et à un frottement obligatoire', 'à aucune force', 'La chute libre est définie ici par l’action seule de la gravitation.'),
  calculation('Un objet part du repos en chute libre avec g = 10 m/s². Calculez sa vitesse après 2 s, en norme.', 20, 'm/s', 'v = gt = 10 × 2 = 20 m/s.', 'La vitesse initiale est nulle.'),
  trap('Dans le modèle sans résistance de l’air, l’accélération de chute…', 'ne dépend pas de la masse de l’objet', 'est proportionnelle à sa masse', 'est nulle pour un objet léger', 'ma = mg donne a = g pour m non nulle.'));
add('terminale-champ-magnetique',
  concept('Dans un long solénoïde idéal, le champ intérieur est approximativement…', 'uniforme et parallèle à l’axe', 'nul partout', 'perpendiculaire à l’axe en tout point', 'L’approximation s’applique loin des extrémités.'),
  calculation('Pour B = µ₀nI, µ₀ = 4π × 10⁻⁷ SI, n = 1 000 m⁻¹ et I = 2 A. Calculez B.', .0025132741228718345, 'T', 'B = 4π × 10⁻⁷ × 1 000 × 2 ≈ 2,51 × 10⁻³ T.', 'Multipliez les trois facteurs ; utilisez π ≈ 3,1416.', .00001),
  trap('Le champ magnétique B s’exprime en…', 'teslas', 'volts', 'newtons uniquement', 'Le tesla est l’unité SI de B.'));
add('terminale-cinematique',
  concept('La vitesse instantanée est…', 'la dérivée de la position par rapport au temps', 'la primitive de la position sans condition', 'toujours égale à la distance totale', 'En une dimension, v(t) = dx/dt.'),
  calculation('x(t) = 3t² en mètres, t en secondes. Calculez v à t = 2 s.', 12, 'm/s', 'v(t) = 6t ; v(2) = 12 m/s.', 'Dérivez x(t) avant de remplacer t.'),
  trap('Pour un mouvement circulaire uniforme, l’accélération est…', 'non nulle et dirigée vers le centre', 'nulle car la norme de la vitesse est constante', 'toujours tangentielle uniquement', 'Le vecteur vitesse change de direction, même si sa norme reste constante.'));
add('terminale-cinetique-chimique',
  concept('La vitesse d’une réaction décrit…', 'l’évolution des quantités chimiques au cours du temps', 'uniquement sa température finale', 'uniquement le volume du bécher', 'On peut suivre l’avancement ou une concentration en fonction du temps.'),
  calculation('Une concentration augmente de 0,02 à 0,08 mol/L en 30 s. Calculez sa vitesse moyenne d’augmentation.', .002, 'mol/(L·s)', '(0,08 − 0,02)/30 = 0,002 mol/(L·s).', 'Divisez la variation de concentration par la durée.'),
  trap('Un catalyseur…', 'accélère l’accès à l’équilibre sans changer sa composition finale', 'change toujours la constante d’équilibre', 'est consommé définitivement par définition', 'Il modifie le mécanisme et la cinétique, pas la constante d’équilibre à température fixée.'));
add('terminale-complexes',
  concept('Le nombre imaginaire i vérifie…', 'i² = −1', 'i² = 1', 'i = −1', 'Cette relation définit l’unité imaginaire.'),
  calculation('Calculez le module de z = 3 + 4i.', 5, '', '|z| = √(3² + 4²) = 5.', 'Utilisez |a + ib| = √(a² + b²).'),
  trap('Le conjugué de 3 + 4i est…', '3 − 4i', '−3 + 4i', '−3 − 4i', 'On conserve la partie réelle et on oppose la partie imaginaire.'));
add('terminale-derivation',
  concept('Sur un intervalle, si f′ est strictement positive, f est…', 'strictement croissante', 'strictement décroissante', 'constante', 'Le signe de la dérivée détermine les variations sur un intervalle.'),
  calculation('f(x) = x² − 4x. Calculez f′(3).', 2, '', 'f′(x) = 2x − 4 ; f′(3) = 2.', 'Dérivez puis remplacez x par 3.'),
  trap('f′(a) = 0 suffit-il toujours à prouver un extremum en a ?', 'Non, il faut étudier les variations ou d’autres conditions', 'Oui, toujours', 'Oui, cela prouve un maximum', 'Pour f(x) = x³, f′(0) = 0 sans extremum en 0.'));
add('terminale-dipole-rc',
  concept('La constante de temps d’un dipôle RC vaut…', 'τ = RC', 'τ = R/C', 'τ = C/R', 'Avec R en ohms et C en farads, τ est en secondes.'),
  calculation('R = 10 000 Ω et C = 100 µF. Calculez τ.', 1, 's', '100 µF = 10⁻⁴ F ; RC = 10⁴ × 10⁻⁴ = 1 s.', 'Convertissez C en farads.'),
  trap('Lors de la charge idéale d’un condensateur initialement déchargé, à t = τ, uC vaut environ…', '63 % de sa valeur finale', '100 % exactement', '37 % de sa valeur finale', 'uC/E = 1 − exp(−1) ≈ 0,632.'));
add('terminale-dynamique',
  concept('Dans un référentiel galiléen pour une masse constante, la deuxième loi de Newton s’écrit…', 'ΣF = ma', 'ΣF = mv', 'ΣF = m/a', 'La somme est vectorielle et porte sur les forces extérieures au système.'),
  calculation('Une résultante de 12 N agit sur une masse de 3 kg. Calculez la norme de l’accélération.', 4, 'm/s²', 'a = F/m = 12/3 = 4 m/s².', 'Utilisez la résultante, pas une force choisie isolément.'),
  trap('Une résultante nulle implique, dans ce modèle…', 'une vitesse vectorielle constante', 'une vitesse obligatoirement nulle', 'une accélération croissante', 'Le repos est un cas particulier du mouvement rectiligne uniforme.'));
add('terminale-exponentielle',
  concept('La dérivée de exp(x) est…', 'exp(x)', 'x exp(x)', '1/x', 'La fonction exponentielle est égale à sa dérivée.'),
  calculation('Calculez exp(0).', 1, '', 'exp(0) = 1.', 'C’est une valeur de référence de la fonction exponentielle.'),
  trap('Pour tout réel x, exp(x) est…', 'strictement positive', 'parfois nulle', 'négative si x < 0', 'La fonction exponentielle ne s’annule jamais sur les réels.'));
add('terminale-gravitation',
  concept('La norme de la force gravitationnelle entre deux masses ponctuelles est…', 'Gm₁m₂/r²', 'Gm₁m₂r²', 'G(m₁ + m₂)/r', 'r est la distance entre les masses, ou entre les centres dans le modèle sphérique adapté.'),
  calculation('Si la distance entre deux masses est doublée, par quel nombre faut-il diviser la force gravitationnelle ?', 4, '', 'F est proportionnelle à 1/r² : (2r)² = 4r².', 'La distance apparaît au carré au dénominateur.'),
  trap('Pour calculer la gravitation à l’altitude h au-dessus d’une planète de rayon R, la distance au centre vaut…', 'R + h', 'h seulement', 'R − h', 'L’altitude est mesurée depuis la surface ; la loi utilise la distance au centre.'));
add('terminale-induction-rl',
  concept('Pour un circuit RL série simple, la constante de temps vaut…', 'τ = L/R totale', 'τ = LR', 'τ = R/L', 'R totale inclut les résistances pertinentes de la boucle.'),
  calculation('L = 0,20 H et R totale = 10 Ω. Calculez τ.', .02, 's', 'τ = 0,20/10 = 0,020 s.', 'Divisez L par R totale.'),
  trap('Le courant dans une bobine idéale ne peut pas…', 'varier instantanément avec une tension finie', 'varier progressivement', 'stocker de l’énergie magnétique', 'uL = L di/dt : un saut instantané nécessiterait une tension non finie dans ce modèle.'));
add('terminale-interferences',
  concept('Des interférences stables nécessitent notamment…', 'des sources cohérentes', 'des fréquences quelconques sans relation', 'une absence totale de lumière', 'La différence de phase doit rester stable pour observer une figure stationnaire.'),
  calculation('Dans les fentes de Young, λ = 500 nm, D = 2 m et a = 1 mm. Calculez l’interfrange en millimètres.', 1, 'mm', 'i = λD/a = 5 × 10⁻⁷ × 2/10⁻³ = 10⁻³ m = 1 mm.', 'Convertissez λ et a en mètres avant le calcul.'),
  trap('Pour deux sources en phase, une différence de marche δ = kλ produit…', 'une interférence constructive', 'toujours une extinction', 'une disparition de l’énergie', 'k est entier : la différence de phase est un multiple de 2π.'));
add('terminale-laplace',
  concept('La norme de la force de Laplace sur un fil rectiligne vaut…', 'BIL sin θ', 'BIL cos θ dans tous les cas', 'BI/L', 'θ est l’angle entre la direction du courant et le champ magnétique.'),
  calculation('B = 0,50 T, I = 2 A, L = 0,20 m et fil perpendiculaire au champ. Calculez F.', .2, 'N', 'F = BIL = 0,50 × 2 × 0,20 = 0,20 N.', 'sin 90° = 1.'),
  trap('Si le fil est parallèle au champ magnétique, la force de Laplace est…', 'nulle', 'maximale', 'toujours BIL', 'sin 0° = 0 : F = 0.'));
add('terminale-limites',
  concept('L’expression ∞ − ∞ est…', 'une forme indéterminée', 'toujours égale à zéro', 'toujours égale à +∞', 'Il faut transformer l’expression avant de conclure.'),
  calculation('Calculez la limite de (3x² + 1)/(x² + 2) quand x tend vers +∞.', 3, '', 'En divisant par x² : (3 + 1/x²)/(1 + 2/x²) tend vers 3.', 'Comparez les termes de plus haut degré.'),
  trap('Une limite de type 0/0 signifie…', 'qu’une étude supplémentaire est nécessaire', 'que la limite est automatiquement nulle', 'que la limite est forcément infinie', '0/0 est une forme indéterminée, pas une valeur de limite.'));
add('terminale-logarithme',
  concept('La fonction ln(x) est définie sur les réels si…', 'x > 0', 'x ≥ 0', 'x est quelconque', 'Le logarithme népérien réel exige un argument strictement positif.'),
  calculation('Calculez ln(1).', 0, '', 'exp(0) = 1, donc ln(1) = 0.', 'Utilisez la relation entre ln et exp.'),
  trap('Pour a > 0 et b > 0, ln(ab) vaut…', 'ln(a) + ln(b)', 'ln(a) × ln(b)', 'ln(a + b)', 'Le logarithme transforme un produit de nombres positifs en somme.'));
add('terminale-niveaux-energie',
  concept('Un atome émet un photon lors d’une transition…', 'vers un niveau d’énergie plus bas', 'vers un niveau plus élevé sans énergie reçue', 'sans changement d’énergie nécessairement', 'L’énergie du photon est la perte d’énergie de l’atome.'),
  calculation('Un atome passe de −2 eV à −5 eV. Calculez l’énergie du photon émis.', 3, 'eV', 'E photon = E initiale − E finale = −2 − (−5) = 3 eV.', 'L’énergie du photon émis est positive.'),
  trap('Les niveaux d’énergie d’un atome sont…', 'quantifiés', 'toutes les valeurs réelles sans restriction', 'toujours positifs', 'Les transitions entre niveaux expliquent les raies spectrales.'));
add('terminale-oscillations-electriques',
  concept('Dans un circuit LC idéal, l’énergie s’échange entre…', 'le condensateur et la bobine', 'uniquement les fils sous forme de chaleur', 'deux piles obligatoires', 'L’énergie électrique du condensateur et l’énergie magnétique de la bobine alternent.'),
  calculation('L = 1 H et C = 10⁻⁴ F. Calculez T₀ = 2π√(LC).', .06283185307179587, 's', '√(LC) = 0,01 s ; T₀ = 2π × 0,01 ≈ 0,0628 s.', 'Calculez d’abord la racine du produit LC.', .0001),
  trap('Dans un circuit RLC libre avec résistance non nulle, l’amplitude…', 'diminue à cause de la dissipation', 'reste constante dans tous les cas', 'augmente sans apport d’énergie', 'L’effet Joule dissipe l’énergie ; le régime peut être oscillant ou non selon R.'));
add('terminale-oscillations-mecaniques',
  concept('Pour un système masse-ressort idéal, la pulsation propre vaut…', '√(k/m)', '√(m/k)', 'km', 'ω₀² = k/m et T₀ = 2π/ω₀.'),
  calculation('k = 100 N/m et m = 1 kg. Calculez la pulsation propre.', 10, 'rad/s', 'ω₀ = √(100/1) = 10 rad/s.', 'Calculez la racine de k/m.'),
  trap('Au passage par l’équilibre d’un oscillateur harmonique non amorti, la vitesse en norme est…', 'maximale', 'nulle', 'toujours égale à l’amplitude', 'L’énergie potentielle élastique est minimale ; l’énergie cinétique est maximale.'));
add('terminale-particule-champ',
  concept('La force magnétique sur une charge en mouvement est…', 'perpendiculaire à sa vitesse', 'toujours parallèle à sa vitesse', 'toujours opposée à sa vitesse', 'F = q v × B ; le produit vectoriel est perpendiculaire à v.'),
  calculation('q = 2 × 10⁻⁶ C, v = 1 000 m/s et B = 0,50 T, avec v perpendiculaire à B. Calculez la norme de F.', .001, 'N', 'F = |q|vB = 2 × 10⁻⁶ × 1 000 × 0,50 = 0,001 N.', 'Utilisez F = |q|vB sin θ.'),
  trap('Dans un champ magnétique seul, la force magnétique…', 'ne modifie pas l’énergie cinétique de la particule', 'augmente toujours sa vitesse en norme', 'effectue toujours un travail positif', 'La force est perpendiculaire à v : sa puissance F·v est nulle.'));
add('terminale-ph-autoprotolyse',
  concept('À 25 °C, le produit ionique de l’eau vaut approximativement…', '10⁻¹⁴', '10⁻⁷', '7', 'Kₑ = [H₃O⁺][OH⁻] dans le modèle de solution diluée usuel.'),
  calculation('À 25 °C, [H₃O⁺] = 10⁻⁴ mol/L. Calculez le pH.', 4, '', 'pH = −log₁₀(10⁻⁴) = 4.', 'Appliquez la définition du pH dans le modèle dilué.'),
  trap('Le pH neutre est toujours exactement 7 quelle que soit la température ?', 'Non, il dépend du produit ionique de l’eau', 'Oui, par définition à toute température', 'Oui, même si Kₑ change', 'La neutralité signifie [H₃O⁺] = [OH⁻] ; pH neutre = pKₑ/2.'));
add('terminale-photoelectrique',
  concept('L’émission photoélectrique exige que…', 'l’énergie d’un photon atteigne le travail d’extraction', 'l’intensité soit élevée quelle que soit la fréquence', 'la fréquence soit nulle', 'Un photon doit avoir hν ≥ W₀.'),
  calculation('Un photon a une énergie de 5 eV et W₀ = 2 eV. Calculez l’énergie cinétique maximale de l’électron.', 3, 'eV', 'E꜀ max = hν − W₀ = 5 − 2 = 3 eV.', 'Soustrayez le travail d’extraction à l’énergie du photon.'),
  trap('Si la fréquence est sous le seuil, augmenter l’intensité dans le modèle usuel…', 'ne suffit pas à émettre des électrons', 'augmente l’énergie de chaque photon', 'supprime le travail d’extraction', 'L’intensité change le flux de photons, pas leur énergie hν à fréquence fixée.'));
add('terminale-primitives-integrales',
  concept('Une primitive de 2x sur les réels est…', 'x²', '2x²', '2', 'La dérivée de x² est 2x ; toutes les primitives diffèrent d’une constante.'),
  calculation('Calculez l’intégrale de 2x de 0 à 2.', 4, '', '[x²]₀² = 4 − 0 = 4.', 'Utilisez une primitive puis les deux bornes.'),
  trap('Une intégrale définie de fonction négative peut être…', 'négative, contrairement à une aire géométrique', 'toujours positive', 'toujours nulle', 'Une intégrale est une aire algébrique ; une aire géométrique est non négative.'));
add('terminale-probabilites',
  concept('Si P(A) > 0, la probabilité conditionnelle P(B|A) vaut…', 'P(A∩B)/P(A)', 'P(A)/P(B)', 'P(A∪B)', 'On rapporte l’intersection à la probabilité de l’événement conditionnant.'),
  calculation('X suit une loi binomiale avec n = 10 et p = 0,30. Calculez son espérance.', 3, '', 'E(X) = np = 10 × 0,30 = 3.', 'Utilisez l’espérance d’une loi binomiale.'),
  trap('Deux événements disjoints de probabilités strictement positives sont-ils indépendants ?', 'Non', 'Oui, par définition', 'Oui, parce que leur intersection est vide', 'P(A∩B) = 0 alors que P(A)P(B) > 0 : la condition d’indépendance n’est pas satisfaite.'));
add('terminale-reactions-nucleaires',
  concept('Dans une équation nucléaire, on conserve notamment…', 'le nombre de nucléons et la charge électrique', 'toujours l’élément chimique initial', 'la masse de repos séparément sans énergie', 'Le bilan d’énergie tient compte de l’énergie de masse.'),
  calculation('Un noyau de nombre de masse 238 émet une particule α de nombre de masse 4. Quel est le nombre de masse du noyau fils ?', 234, '', 'A fils = 238 − 4 = 234.', 'Conservez la somme des nombres de masse.'),
  trap('Après une demi-vie, le nombre moyen de noyaux radioactifs restants est…', 'la moitié de sa valeur initiale', 'nul', 'le double de sa valeur initiale', 'La décroissance radioactive est exponentielle ; la demi-vie correspond à une division par deux.'));
add('terminale-statistiques-deux-variables',
  concept('Le point moyen d’une série de couples (xᵢ ; yᵢ) a pour coordonnées…', '(moyenne des x ; moyenne des y)', '(maximum des x ; maximum des y)', '(minimum des x ; minimum des y)', 'On calcule séparément les moyennes des deux variables.'),
  calculation('Pour les couples (1 ; 2), (2 ; 4) et (3 ; 6), calculez la moyenne des y.', 4, '', '(2 + 4 + 6)/3 = 4.', 'Additionnez les trois ordonnées puis divisez par 3.'),
  trap('Une forte corrélation entre deux variables prouve-t-elle une causalité ?', 'Non', 'Oui, toujours', 'Oui, si les points sont alignés', 'Une corrélation seule ne permet pas d’établir une relation causale.'));
add('terminale-tampon-dosage',
  concept('Une solution tampon associe usuellement…', 'un acide faible et sa base conjuguée en quantités appréciables', 'uniquement un acide fort très concentré', 'deux espèces sans rapport acide-base', 'Elle limite les variations de pH dans un domaine et pour des ajouts modérés.'),
  calculation('À la demi-équivalence d’un dosage idéal d’acide faible par base forte, pKₐ = 4,8. Quel est le pH ?', 4.8, '', 'À la demi-équivalence, [A⁻] ≈ [HA], donc pH ≈ pKₐ = 4,8.', 'Utilisez pH = pKₐ + log([A⁻]/[HA]) dans son domaine de validité.'),
  trap('Le pH d’équivalence d’un acide faible dosé par une base forte à 25 °C est usuellement…', 'supérieur à 7', 'toujours égal à 7', 'toujours inférieur à 7', 'La base conjuguée formée réagit avec l’eau et rend la solution basique dans le cas usuel.'));

for (const [id, questions] of Object.entries(banks)) {
  const original = questions.map((q, i) => ({...q, level:i === 1 ? 2 : 1}));
  const extra = deepeningBanks[id].map((q, i) => {
    const level = i < 2 ? 1 : i < 4 ? 2 : 3;
    const skill = level === 3 ? 'transfert' : level === 2 ? 'application' : q.kind === 'number' ? 'methode' : 'comprehension';
    const result = {...q, id:`deep-${i + 1}`, level, skill};
    if (q.kind === 'choice') {
      const shift = [...id].reduce((n,c)=>n+c.charCodeAt(0),i+3) % q.options.length;
      result.options = [...q.options.slice(shift), ...q.options.slice(0,shift)];
      result.correct = (q.correct - shift + q.options.length) % q.options.length;
    }
    return result;
  });
  banks[id] = [...original,...extra].sort((a,b)=>a.level-b.level);
}
export const automaticBanks = banks;
