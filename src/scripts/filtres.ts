/* =====================================================================
   Filtres des listes (ressources, vidéos) : boutons « Niveau » / « Type ».
   L'état est conservé dans l'adresse (ex. /ressources/?niveau=3e) pour
   pouvoir partager un lien déjà filtré.
   ===================================================================== */
const zone = document.querySelector<HTMLElement>('[data-filters]');
const liste = document.querySelector<HTMLElement>('[data-items]');

if (zone && liste) {
  const boutons = Array.from(zone.querySelectorAll<HTMLButtonElement>('[data-filtre]'));
  const cartes = Array.from(liste.children) as HTMLElement[];
  const compteur = zone.querySelector<HTMLElement>('[data-compteur]');
  const aucun = document.querySelector<HTMLElement>('[data-aucun]');
  const [singulier, pluriel] = (zone.dataset.unite ?? 'élément|éléments').split('|');
  const cles = Array.from(new Set(boutons.map((b) => b.dataset.filtre as string)));
  const etat: Record<string, string> = {};

  // État initial depuis l'adresse, en ignorant les valeurs inconnues.
  const params = new URLSearchParams(window.location.search);
  cles.forEach((cle) => {
    const valeur = params.get(cle) ?? '';
    const existe = boutons.some((b) => b.dataset.filtre === cle && b.dataset.valeur === valeur);
    etat[cle] = existe ? valeur : '';
  });

  const appliquer = () => {
    let visibles = 0;
    cartes.forEach((carte) => {
      const ok = cles.every((cle) => !etat[cle] || carte.dataset[cle] === etat[cle]);
      carte.hidden = !ok;
      if (ok) visibles += 1;
    });

    boutons.forEach((b) => {
      const actif = etat[b.dataset.filtre as string] === b.dataset.valeur;
      b.classList.toggle('is-active', actif);
      b.setAttribute('aria-pressed', String(actif));
    });

    if (compteur) compteur.textContent = `${visibles} ${visibles > 1 ? pluriel : singulier}`;
    if (aucun) aucun.hidden = visibles > 0;

    const url = new URL(window.location.href);
    cles.forEach((cle) => (etat[cle] ? url.searchParams.set(cle, etat[cle]) : url.searchParams.delete(cle)));
    window.history.replaceState(null, '', url);
  };

  boutons.forEach((b) =>
    b.addEventListener('click', () => {
      etat[b.dataset.filtre as string] = b.dataset.valeur ?? '';
      appliquer();
    }),
  );

  zone.classList.add('is-ready');
  appliquer();
}
