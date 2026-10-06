import { skills } from './revision.mjs';

export const competencies = Object.fromEntries(Object.entries(skills).map(([key, value]) => [key, { label: value.label, section: value.anchor }]));
export function parseNumber(value) {
  const text = String(value ?? '').trim().replace(/−/g, '-').replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}
export function answered(q, value) {
  return q.kind === 'number' ? parseNumber(value) !== null : Number.isInteger(value) && value >= 0 && value < q.options.length;
}
export function isCorrect(q, value) {
  if (!answered(q, value)) return false;
  return q.kind === 'number' ? Math.abs(parseNumber(value) - q.correct) <= q.tolerance : value === q.correct;
}
export function correctLabel(q) {
  return q.kind === 'number' ? `${String(q.correct).replace('.', ',')}${q.unit ? ` ${q.unit}` : ''}` : q.options[q.correct];
}
export function summarize(bank, answers) {
  const groups = {};
  let correct = 0, attempted = 0;
  const missed = [];
  for (const q of bank) {
    const group = groups[q.skill] ??= { total: 0, correct: 0 };
    group.total++;
    if (answered(q, answers[q.id])) attempted++;
    if (isCorrect(q, answers[q.id])) { correct++; group.correct++; } else missed.push(q.id);
  }
  return { correct, total: bank.length, attempted, missed, skills: groups };
}
