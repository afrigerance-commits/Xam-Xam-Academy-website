export const STORAGE_KEY = 'xam-progression-v1';
export const DAY = 86400000;
const modes = ['training', 'exam', 'retry'];
export function restoreProgress(value, now = Date.now()) {
  if (!value || value.version !== 1 || !Array.isArray(value.attempts)) return { version: 1, attempts: [] };
  const attempts = value.attempts.filter(a => {
    if (!a || typeof a.course !== 'string' || !/^[a-z0-9-]+$/.test(a.course) || a.course.length > 100) return false;
    if (!Number.isFinite(a.at) || a.at < 0 || a.at > now + 60000 || !Number.isFinite(new Date(a.at).getTime())) return false;
    if (!modes.includes(a.mode) || !Number.isInteger(a.total) || a.total < 1 || a.total > 200) return false;
    if (!Number.isInteger(a.correct) || a.correct < 0 || a.correct > a.total) return false;
    if (!Number.isInteger(a.duration) || a.duration < 0 || a.duration > 604800) return false;
    if (!Array.isArray(a.missed) || a.missed.length > a.total || a.missed.some(id => typeof id !== 'string' || id.length > 100)) return false;
    if (!a.skills || typeof a.skills !== 'object' || Array.isArray(a.skills)) return false;
    const groups = Object.entries(a.skills);
    if (!groups.length || groups.length > 20) return false;
    if (groups.some(([key, g]) => !/^[a-z]+$/.test(key) || !g || !Number.isInteger(g.total) || !Number.isInteger(g.correct) || g.total < 1 || g.correct < 0 || g.correct > g.total)) return false;
    return groups.reduce((n, [, g]) => n + g.total, 0) === a.total && groups.reduce((n, [, g]) => n + g.correct, 0) === a.correct && new Set(a.missed).size === a.total - a.correct;
  }).map(a => ({ course: a.course, at: a.at, mode: a.mode, correct: a.correct, total: a.total, duration: a.duration, missed: [...a.missed], skills: Object.fromEntries(Object.entries(a.skills).map(([k, g]) => [k, { total: g.total, correct: g.correct }])) }));
  // Keep a useful latest complete result for every chapter as history grows.
  const recent = attempts.slice(-500);
  const lastFull = new Map();
  for (const a of attempts) if (a.mode !== 'retry') lastFull.set(a.course, a);
  const retained = [...new Set([...lastFull.values(), ...recent])].sort((a, b) => a.at - b.at);
  return { version: 1, attempts: retained.slice(-700) };
}
export function loadProgress(storage) {
  try { return { data: restoreProgress(JSON.parse((storage ?? globalThis.localStorage).getItem(STORAGE_KEY) || 'null')), available: true }; }
  catch { return { data: { version: 1, attempts: [] }, available: false }; }
}
export function saveAttempt(attempt, storage) {
  const loaded = loadProgress(storage);
  const data = restoreProgress({ version: 1, attempts: [...loaded.data.attempts, attempt] });
  try { (storage ?? globalThis.localStorage).setItem(STORAGE_KEY, JSON.stringify(data)); return { data, available: true }; }
  catch { return { data, available: false }; }
}
export function chapterProgress(data, course) {
  const attempts = data.attempts.filter(a => a.course === course);
  const full = attempts.filter(a => a.mode !== 'retry');
  const latest = full.at(-1) ?? null;
  const previous = full.at(-2) ?? null;
  const percent = a => Math.round(100 * a.correct / a.total);
  return { attempts, latest, previous, best: full.length ? Math.max(...full.map(percent)) : null,
    score: latest ? percent(latest) : null, change: latest && previous ? percent(latest) - percent(previous) : null,
    due: latest ? nextReview(latest) : null };
}
export function nextReview(attempt) {
  const ratio = attempt.correct / attempt.total;
  return attempt.at + (ratio < .6 ? 1 : ratio < .8 ? 3 : 7) * DAY;
}
