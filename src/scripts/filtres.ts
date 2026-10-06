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
  const recherche = document.querySelector<HTMLInputElement>('[data-search]');
  const normaliser = (valeur: string) => valeur.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
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

  if (recherche) recherche.value = params.get('q') ?? '';

  const appliquer = () => {
    let visibles = 0;
    cartes.forEach((carte) => {
      const mots = normaliser(recherche?.value ?? '').trim().split(/\s+/).filter(Boolean);
      const texte = normaliser(carte.dataset.searchtext ?? carte.textContent ?? '');
      const ok = cles.every((cle) => !etat[cle] || carte.dataset[cle] === etat[cle]) && mots.every(mot => texte.includes(mot));
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
    if (recherche) recherche.value.trim() ? url.searchParams.set('q', recherche.value.trim()) : url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  };

  boutons.forEach((b) =>
    b.addEventListener('click', () => {
      etat[b.dataset.filtre as string] = b.dataset.valeur ?? '';
      appliquer();
    }),
  );

  recherche?.addEventListener('input', appliquer);
  zone.classList.add('is-ready');
  appliquer();
}
