/* =====================================================================
   Petites fonctions utilitaires
   ===================================================================== */
import { NIVEAUX, WHATSAPP_NUMERO } from './constantes';

/** Lien WhatsApp avec message prérempli. */
export function lienWhatsApp(message?: string): string {
  const url = `https://wa.me/${WHATSAPP_NUMERO}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

/** Date au format français : « 27 septembre 2026 ». */
export function formaterDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

/** Date au format ISO (AAAA-MM-JJ) pour l'attribut datetime. */
export function dateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Temps de lecture estimé, en minutes (200 mots par minute). */
export function tempsDeLecture(texte = ''): number {
  const mots = texte.replace(/\$[^$]*\$/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 200));
}

/** Rang d'un niveau, pour trier du collège vers le supérieur. */
export function rangNiveau(niveau: string): number {
  const i = (NIVEAUX as readonly string[]).indexOf(niveau);
  return i === -1 ? NIVEAUX.length : i;
}

/**
 * Identifiant d'une vidéo YouTube à partir d'un lien
 * (youtube.com/watch?v=…, youtu.be/…, /shorts/…, /embed/…) ou de l'identifiant seul.
 */
export function idYouTube(valeur?: string): string | null {
  if (!valeur) return null;
  const v = valeur.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  const m = v.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/** Les brouillons ne sont visibles qu'en local (npm run dev). */
export const afficherBrouillons = import.meta.env.DEV;

export function estPublie(entree: { data: { brouillon?: boolean } }): boolean {
  return afficherBrouillons || !entree.data.brouillon;
}
