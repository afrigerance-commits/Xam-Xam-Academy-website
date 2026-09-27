/* =====================================================================
   Empêche un signe de ponctuation (. , ; : ! ? ») de se retrouver seul en
   début de ligne juste après une formule : la formule et la ponctuation
   qui la suit sont regroupées dans un <span class="math-nowrap">.
   ===================================================================== */
import { SKIP, visit } from 'unist-util-visit';

const PONCTUATION = /^[.,;:!?)»  ]+/;

const estFormule = (n) =>
  n && n.type === 'element' && n.tagName === 'span' && [].concat(n.properties?.className || []).includes('katex');

export default function rehypePonctuation() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // Ne pas redescendre dans une formule ni dans un groupe déjà créé.
      const classes = [].concat(node.properties?.className || []);
      if (classes.includes('katex') || classes.includes('math-nowrap')) return SKIP;
      const enfants = node.children;
      for (let i = 0; i < enfants.length - 1; i += 1) {
        const suivant = enfants[i + 1];
        if (!estFormule(enfants[i]) || suivant.type !== 'text') continue;
        const m = suivant.value.match(PONCTUATION);
        if (!m) continue;
        suivant.value = suivant.value.slice(m[0].length);
        enfants[i] = {
          type: 'element',
          tagName: 'span',
          properties: { className: ['math-nowrap'] },
          children: [enfants[i], { type: 'text', value: m[0] }],
        };
      }
    });
  };
}
