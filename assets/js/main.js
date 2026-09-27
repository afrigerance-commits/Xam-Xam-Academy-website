/* =====================================================================
   XAM XAM ACADEMY — Scripts du site
   JavaScript léger, sans dépendance. Chargé avec l'attribut "defer".
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     CONFIGURATION — c'est ici que l'on modifie les informations clés
     =================================================================== */
  var CONFIG = {
    // Numéro WhatsApp au format international : indicatif pays + numéro,
    // sans « + », sans espaces ni tirets.
    whatsappNumber: '221711715359',

    // Numéro tel qu'il est affiché aux visiteurs.
    whatsappDisplay: '+221 71 171 53 59'
  };

  /* ===================================================================
     OUTILS WHATSAPP
     =================================================================== */

  // Construit un lien wa.me, avec un message prérempli si fourni.
  function whatsappUrl(message) {
    var url = 'https://wa.me/' + CONFIG.whatsappNumber;
    return message ? url + '?text=' + encodeURIComponent(message) : url;
  }

  // Ouvre WhatsApp dans un nouvel onglet (ou dans l'onglet courant si le
  // navigateur bloque l'ouverture d'une nouvelle fenêtre).
  function openWhatsApp(message) {
    var url = whatsappUrl(message);
    var win = window.open(url, '_blank');
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url;
    }
  }

  // Tous les liens portant l'attribut data-wa="Message…" reçoivent
  // automatiquement l'URL WhatsApp avec ce message prérempli.
  // Les éléments data-wa-display affichent le numéro défini dans CONFIG.
  function initWhatsAppLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (link) {
      link.href = whatsappUrl(link.getAttribute('data-wa'));
    });
    document.querySelectorAll('[data-wa-display]').forEach(function (el) {
      el.textContent = CONFIG.whatsappDisplay;
    });
  }

  /* ===================================================================
     EN-TÊTE : ombre légère dès que la page défile
     =================================================================== */
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;

    var update = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ===================================================================
     MENU MOBILE (bouton hamburger)
     =================================================================== */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    // Doit correspondre au point de rupture « ordinateur » du CSS.
    var desktop = window.matchMedia('(min-width: 1180px)');

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open, returnFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);

      if (open) {
        var firstLink = nav.querySelector('a[href]');
        if (firstLink) firstLink.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    // Fermeture au clic sur un lien du menu.
    nav.addEventListener('click', function (event) {
      if (isOpen() && event.target.closest('a')) setOpen(false);
    });

    // Clavier : Échap pour fermer, Tab reste dans le menu ouvert.
    document.addEventListener('keydown', function (event) {
      if (!isOpen()) return;

      if (event.key === 'Escape') {
        setOpen(false, true);
        return;
      }

      if (event.key === 'Tab') {
        var links = nav.querySelectorAll('a[href]');
        var first = links[0];
        var last = links[links.length - 1];
        var active = document.activeElement;

        if (!event.shiftKey && (active === last || active === toggle)) {
          event.preventDefault();
          (active === last ? toggle : first).focus();
        } else if (event.shiftKey && (active === first || active === toggle)) {
          event.preventDefault();
          (active === first ? toggle : last).focus();
        }
      }
    });

    // Si l'écran s'élargit (rotation, redimensionnement), on referme.
    desktop.addEventListener('change', function (event) {
      if (event.matches && isOpen()) setOpen(false);
    });
  }

  /* ===================================================================
     NAVIGATION : lien actif selon la section visible
     =================================================================== */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
    var sections = links
      .map(function (link) { return document.getElementById(link.getAttribute('href').slice(1)); })
      .filter(Boolean);
    if (!sections.length) return;

    var ticking = false;

    // La section active est la dernière dont le haut a dépassé 40 % de l'écran.
    function update() {
      ticking = false;
      var line = window.innerHeight * 0.4;
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= line) current = section;
      });
      // Tout en bas de la page, on active la dernière section (Contact).
      var root = document.documentElement;
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        current = sections[sections.length - 1];
      }
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
      });
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ===================================================================
     APPARITION DOUCE DES ÉLÉMENTS AU DÉFILEMENT
     =================================================================== */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ===================================================================
     FORMULAIRE DE CONTACT → MESSAGE WHATSAPP PRÉREMPLI
     Aucun serveur : les informations saisies composent un message
     qui s'ouvre dans WhatsApp, prêt à être envoyé.
     =================================================================== */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('form-status');
    var requiredFields = [
      { input: form.elements.prenom, message: 'Merci d’indiquer le prénom de l’élève.' },
      { input: form.elements.classe, message: 'Merci de choisir la classe.' }
    ];

    function setError(field, message) {
      var error = document.getElementById(field.input.id + '-error');
      if (message) {
        field.input.setAttribute('aria-invalid', 'true');
      } else {
        field.input.removeAttribute('aria-invalid');
      }
      if (error) error.textContent = message;
    }

    // L'erreur disparaît dès que le champ est corrigé.
    requiredFields.forEach(function (field) {
      ['input', 'change'].forEach(function (type) {
        field.input.addEventListener(type, function () {
          if (field.input.value.trim()) setError(field, '');
        });
      });
    });

    function value(name) {
      return form.elements[name].value.trim();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      requiredFields.forEach(function (field) {
        var valid = field.input.value.trim() !== '';
        setError(field, valid ? '' : field.message);
        if (!valid && !firstInvalid) firstInvalid = field.input;
      });

      if (firstInvalid) {
        status.textContent = '';
        firstInvalid.focus();
        return;
      }

      var message = [
        'Bonjour Xam Xam Academy,',
        '',
        'Prénom : ' + value('prenom'),
        'Classe : ' + value('classe'),
        'Ville : ' + (value('ville') || 'Non précisée'),
        'Cours souhaité : ' + (value('type') || 'Non précisé'),
        'Message : ' + (value('message') || '—')
      ].join('\n');

      openWhatsApp(message);
      status.textContent = 'WhatsApp s’ouvre avec votre message : il ne reste plus qu’à l’envoyer.';
    });
  }

  /* ===================================================================
     BOUTON WHATSAPP FLOTTANT : masqué lorsque la section Contact est
     affichée (elle propose déjà ses propres boutons).
     =================================================================== */
  function initFloatingButton() {
    var button = document.querySelector('.wa-float');
    var contact = document.getElementById('contact');
    if (!button || !contact || !('IntersectionObserver' in window)) return;

    new IntersectionObserver(function (entries) {
      button.classList.toggle('is-hidden', entries[0].isIntersecting);
    }, { rootMargin: '0px 0px -35% 0px' }).observe(contact);
  }

  /* ===================================================================
     DÉMARRAGE
     =================================================================== */
  initWhatsAppLinks();
  initHeader();
  initMobileNav();
  initScrollSpy();
  initReveal();
  initContactForm();
  initFloatingButton();
})();
