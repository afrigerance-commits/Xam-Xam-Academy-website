export const skills = {
  comprehension: { label: 'Notions essentielles', anchor: 'révision-active--comprendre-avant-de-calculer' },
  methode: { label: 'Démarche de résolution', anchor: 'révision-active--comprendre-avant-de-calculer' },
  vigilance: { label: 'Conditions et pièges', anchor: 'révision-active--comprendre-avant-de-calculer' },
  application: { label: 'Applications', anchor: 'mon-objectif-de-révision' },
  transfert: { label: 'Transfert et justification', anchor: 'mon-parcours-de-consolidation' },
};
// A declared acquisition requires a written answer. Unanswered work cannot
// inflate the self-assessment, which remains distinct from an automatic grade.
export function acquired(answer, rating) {
  return typeof answer === 'string' && answer.trim().length > 0 && rating === 'acquired';
}
export function reviewSummary(items) {
  const groups = {};
  for (const item of items) {
    const group = groups[item.skill] ??= { total: 0, acquired: 0 };
    group.total++;
    group.acquired += Number(acquired(item.answer, item.rating));
  }
  return { total: items.length, acquired: items.filter(i=>acquired(i.answer,i.rating)).length,
    answered: items.filter(i=>typeof i.answer==='string'&&i.answer.trim()).length, groups };
}
export function restoreHistory(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(i=>i && Number.isFinite(i.time) && Number.isFinite(new Date(i.time).getTime()) && Number.isInteger(i.total) && i.total>0
    && Number.isInteger(i.acquired) && i.acquired>=0 && i.acquired<=i.total
    && ['training','exam','retry'].includes(i.mode)).slice(0,5);
}
