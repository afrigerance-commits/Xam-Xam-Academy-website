export const competencies = {
  reperes: { label: 'Lentilles et foyers', section: '3-reconnaître-et-représenter-une-lentille' },
  calcul: { label: 'Vergence et conversions', section: '4-foyers-distance-focale-et-vergence' },
  rayons: { label: 'Construction des rayons', section: '6-construire-limage-avec-des-rayons-particuliers' },
  images: { label: 'Nature et taille des images', section: '7-décrire-limage-et-comprendre-la-loupe' },
  vision: { label: 'Loupe et vision', section: '8-lœil-et-les-défauts-simples-de-la-vision' },
};
const mc = (id, skill, prompt, options, correct, hint, explanation) => ({ id, skill, kind: 'choice', prompt, options, correct, hint, explanation });
const num = (id, skill, prompt, correct, unit, tolerance, hint, explanation) => ({ id, skill, kind: 'number', prompt, correct, unit, tolerance, hint, explanation });
export const questions = [
  mc('q01','reperes','Une lentille usuelle dans l’air est plus épaisse au centre. Elle est…',['convergente','divergente','toujours opaque','un miroir plan'],0,'Compare la forme du centre et des bords.','Une lentille usuelle dans l’air, plus épaisse au centre, est convergente. Elle rapproche les rayons parallèles à son axe.'),
  mc('q02','reperes','Une lentille divergente agit sur un faisceau parallèle en…',['le concentrant en un foyer réel','écartant ses rayons','l’arrêtant totalement','le transformant en courant électrique'],1,'Le nom indique l’évolution de l’écartement des rayons.','Les rayons émergents s’écartent. Leurs prolongements semblent provenir d’un foyer virtuel.'),
  mc('q03','reperes','Pour une convergente, F′ est le point où se croisent les rayons incidents…',['passant tous par F','parallèles à l’axe avant la lentille','provenant de n’importe quel point','parallèles à n’importe quelle direction'],1,'Le foyer principal concerne le faisceau parallèle à l’axe principal.','Les rayons parallèles à l’axe principal convergent en F′ après une convergente, dans le modèle étudié.'),
  mc('q04','reperes','Quelle description définit correctement l’axe principal ?',['Une droite passant par O et les foyers','La surface de l’écran','Tout rayon passant par B','Une droite toujours verticale'],0,'Sur le schéma, repère O, F et F′.','L’axe principal passe par le centre optique O et les foyers F et F′. Son orientation sur le papier est un choix de dessin.'),
  num('q05','calcul','Une convergente a une distance focale de 20 cm. Quelle est sa vergence ?',5,'dioptries',0.01,'Convertis 20 cm en mètres, puis utilise C = 1/f.','20 cm = 0,20 m. C = 1/0,20 = +5 dioptries.'),
  num('q06','calcul','Une convergente a une vergence de +8 dioptries. Quelle est sa distance focale en centimètres ?',12.5,'cm',0.01,'f = 1/C donne des mètres. Convertis ensuite en centimètres.','f = 1/8 = 0,125 m = 12,5 cm.'),
  mc('q07','calcul','Quelle unité doit-on utiliser pour f dans C = 1/f afin d’obtenir C en dioptries ?',['Le centimètre','Le millimètre','Le mètre','Le kilomètre'],2,'La dioptrie équivaut à un mètre inverse.','La distance focale doit être exprimée en mètres. Une dioptrie correspond à 1 m⁻¹.'),
  num('q08','calcul','Une divergente a une distance positive O-foyer de 50 cm. Quelle est sa vergence ?',-2,'dioptries',0.01,'Le signe de la vergence est négatif pour une divergente.','d = 0,50 m. C = −1/d = −2 dioptries. La distance focale algébrique est négative.'),
  mc('q09','rayons','Dans le modèle mince, un rayon passant par O…',['est réfléchi vers l’objet','est toujours arrêté','continue sans déviation','ressort toujours par F′'],2,'O est le centre optique.','Le rayon passant par le centre optique O n’est pas dévié dans l’approximation des lentilles minces.'),
  mc('q10','rayons','Un rayon parallèle à l’axe arrive sur une convergente. Il ressort…',['en passant par F′','en passant obligatoirement par O','parallèle à lui-même dans tous les cas','en direction du foyer objet F'],0,'Distingue foyer objet F et foyer image F′.','Le rayon parallèle à l’axe ressort en passant par le foyer image F′.'),
  mc('q11','rayons','Un rayon passe par F avant une convergente. Après la lentille, il est…',['perpendiculaire à l’axe','parallèle à l’axe','toujours dirigé vers F','bloqué'],1,'Utilise le troisième rayon particulier de construction.','Un rayon passant par le foyer objet F ressort parallèle à l’axe principal.'),
  mc('q12','rayons','Pour construire une image virtuelle, on cherche l’intersection…',['des rayons réels sur un écran','des prolongements en arrière des rayons émergents','uniquement de l’axe et de la lentille','des bords de l’écran'],1,'Les pointillés du schéma de loupe ont un rôle précis.','Les rayons émergents divergent. Leurs prolongements en arrière se croisent au point image virtuel.'),
  mc('q13','images','L’objet est au-delà de 2f devant une convergente. Son image est…',['réelle, renversée et réduite','virtuelle, droite et agrandie','réelle, droite et réduite','toujours de même taille'],0,'Compare la position de l’objet à f et 2f.','Au-delà de 2f, l’image se forme entre F′ et 2F′. Elle est réelle, renversée et réduite.'),
  num('q14','images','Une convergente a f = 12 cm. L’objet est à 24 cm devant elle. À quelle distance derrière la lentille se forme l’image ?',24,'cm',0.01,'24 cm représente deux fois la distance focale.','L’objet est à 2f. Son image est à 2f de l’autre côté, donc à 24 cm derrière la lentille.'),
  mc('q15','images','Un objet réel est entre f et 2f devant une convergente. L’image est…',['virtuelle et réduite','réelle, renversée et agrandie','droite et de même taille','absente dans tous les cas'],1,'L’image se forme au-delà de 2F′.','Entre f et 2f, l’objet donne une image réelle, renversée et agrandie, située au-delà de 2F′.'),
  mc('q16','images','Quelle image peut être recueillie directement sur un écran ?',['Une image virtuelle','Une image réelle','Toutes les images','Aucune image'],1,'Pense au croisement réel des rayons émergents.','Une image réelle est formée par le croisement des rayons et peut être recueillie sur un écran à la bonne position.'),
  mc('q17','vision','Une loupe a f = 8 cm. Où placer l’objet pour obtenir une image virtuelle agrandie ?',['À 20 cm','À 16 cm','À 12 cm','À 5 cm'],3,'Une loupe s’utilise avec l’objet entre O et F.','5 cm est inférieur à f = 8 cm : l’objet est entre O et F. L’image est virtuelle, droite et agrandie.'),
  mc('q18','vision','Dans le modèle de la myopie, l’image d’un objet éloigné se forme devant la rétine. Quelle lentille corrige ce défaut ?',['Convergente','Divergente','Un miroir','Une vitre plane dans tous les cas'],1,'Il faut réduire la convergence du système œil-correction.','Une lentille divergente réduit la convergence et aide à ramener l’image sur la rétine. La correction réelle est déterminée par un professionnel.'),
  mc('q19','vision','Dans le modèle de l’hypermétropie sans accommodation suffisante, quelle correction rapproche l’image de la rétine ?',['Une lentille divergente','Une lentille convergente','Un écran devant l’œil','Aucune correction optique possible'],1,'Le système doit devenir plus convergent.','Une lentille convergente apporte la convergence nécessaire dans ce modèle simplifié de l’hypermétropie.'),
  mc('q20','vision','Quelle règle de sécurité est correcte ?',['Regarder le Soleil à travers une loupe pour repérer le foyer','Concentrer le Soleil sur un écran tenu à la main','Utiliser une source choisie par le professeur, sans viser le Soleil','Supprimer toutes les précautions avec une petite lentille'],2,'Une lentille peut concentrer dangereusement la lumière solaire.','Ne jamais regarder le Soleil à travers une lentille ni concentrer sa lumière. Les observations utilisent une source et un montage choisis par le professeur.'),
];
export function parseNumber(value) {
  const normalized = String(value ?? '').trim().replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized)) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}
export function answered(question, answer) {
  return question.kind === 'number' ? parseNumber(answer) !== null : Number.isInteger(answer) && answer >= 0 && answer < question.options.length;
}
export function isCorrect(question, answer) {
  if (!answered(question, answer)) return false;
  return question.kind === 'number' ? Math.abs(parseNumber(answer) - question.correct) <= question.tolerance : answer === question.correct;
}
export function correctLabel(question) {
  return question.kind === 'number' ? `${String(question.correct).replace('.', ',')} ${question.unit}` : question.options[question.correct];
}
export function summarize(bank, answers) {
  const skills = Object.fromEntries(Object.keys(competencies).map(key => [key, { total: 0, correct: 0 }]));
  let correct = 0;
  let attempted = 0;
  const missed = [];
  for (const q of bank) {
    skills[q.skill].total++;
    if (answered(q, answers[q.id])) attempted++;
    if (isCorrect(q, answers[q.id])) { correct++; skills[q.skill].correct++; }
    else missed.push(q.id);
  }
  return { correct, total: bank.length, attempted, missed, skills };
}
