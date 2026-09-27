/* =====================================================================
   Blocs pédagogiques dans les fichiers Markdown
   ---------------------------------------------------------------------
   :::correction            → correction masquée, dépliable (« Voir la correction »)
   :::correction[Titre]     → idem avec un titre personnalisé
   :::definition / :::retenir / :::attention / :::methode / :::exemple
                            → encadrés colorés avec titre
   Tout autre « :mot » est laissé tel quel dans le texte.
   ===================================================================== */
import { visit } from 'unist-util-visit';

const BLOCS = {
  correction: 'Voir la correction',
  definition: 'Définition',
  retenir: 'À retenir',
  attention: 'Attention',
  methode: 'Méthode',
  exemple: 'Exemple',
};

/** Texte brut d'un nœud (et de ses enfants). */
function texte(node) {
  if ('value' in node) return node.value;
  return (node.children || []).map(texte).join('');
}

export default function remarkBlocs() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      // Directives en ligne ou sur une ligne (« :mot », « ::mot ») : on restitue le texte.
      if ((node.type === 'textDirective' || node.type === 'leafDirective') && parent && index !== undefined) {
        const prefixe = node.type === 'textDirective' ? ':' : '::';
        const libelle = node.children && node.children.length ? `[${texte(node)}]` : '';
        const restitue = { type: 'text', value: `${prefixe}${node.name}${libelle}` };
        parent.children[index] = node.type === 'leafDirective' ? { type: 'paragraph', children: [restitue] } : restitue;
        return;
      }

      if (node.type !== 'containerDirective') return;

      const titreParDefaut = BLOCS[node.name];
      if (!titreParDefaut) {
        // Bloc inconnu : on garde simplement son contenu.
        if (parent && index !== undefined) {
          parent.children.splice(index, 1, ...node.children);
          return index;
        }
        return;
      }

      // Titre personnalisé : :::correction[Correction de l'exercice 1]
      let titre = titreParDefaut;
      const premier = node.children[0];
      if (premier && premier.data && premier.data.directiveLabel) {
        titre = texte(premier);
        node.children.shift();
      }

      const contenu = {
        type: 'blocContenu',
        data: { hName: 'div', hProperties: { className: ['bloc__contenu'] } },
        children: node.children,
      };

      if (node.name === 'correction') {
        node.data = { hName: 'details', hProperties: { className: ['bloc', 'bloc--correction'] } };
        node.children = [
          { type: 'blocTitre', data: { hName: 'summary', hProperties: { className: ['bloc__titre'] } }, children: [{ type: 'text', value: titre }] },
          contenu,
        ];
      } else {
        node.data = { hName: 'div', hProperties: { className: ['bloc', `bloc--${node.name}`], role: 'note' } };
        node.children = [
          { type: 'blocTitre', data: { hName: 'p', hProperties: { className: ['bloc__titre'] } }, children: [{ type: 'text', value: titre }] },
          contenu,
        ];
      }
    });
  };
}
