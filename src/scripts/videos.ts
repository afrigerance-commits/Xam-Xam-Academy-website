/* =====================================================================
   Lecteur YouTube « léger » : seule la miniature est chargée ; le lecteur
   YouTube (plus lourd) n'est chargé qu'au clic sur « Lire ».
   ===================================================================== */
document.querySelectorAll<HTMLButtonElement>('[data-youtube]').forEach((bouton) => {
  bouton.addEventListener('click', () => {
    const id = bouton.dataset.youtube;
    if (!id) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = bouton.dataset.titre ?? 'Vidéo YouTube';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.className = 'vcard__iframe';
    bouton.replaceWith(iframe);
    iframe.focus();
  });
});
