import { loadProgress, chapterProgress, STORAGE_KEY } from '../lib/quizzes/progress.mjs';
const root = document.querySelector('[data-progression]');
if (root) {
  const { chapters, competencies } = JSON.parse(root.querySelector('[data-progress-config]').textContent);
  const $ = selector => root.querySelector(selector);
  const el = (tag, text, cls) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; };
  const date = at => new Intl.DateTimeFormat('fr-FR', {dateStyle:'medium', timeZone:'Africa/Dakar'}).format(at);
  const mode = value => value === 'exam' ? 'Examen' : value === 'retry' ? 'Reprise des erreurs' : 'Entraînement';
  let data = loadProgress().data;
  function link(text, href, cls = 'quiz-btn quiz-btn--quiet') { const a = el('a', text, cls); a.href = href; return a; }
  function render() {
    const loaded = loadProgress(); data = loaded.data;
    $('[data-storage]').textContent = loaded.available ? 'Résultats conservés sur cet appareil. Aucun compte nécessaire ; pas de synchronisation entre appareils. Effacer les données du navigateur efface ce suivi.' : 'Ce navigateur ne permet pas de conserver les résultats. Les quiz restent utilisables ; essayez avec le stockage du navigateur autorisé.';
    const rows = chapters.map(c => ({...c, progress: chapterProgress(data, c.id)}));
    const started = rows.filter(c => c.progress.latest);
    const due = started.filter(c => c.progress.due <= Date.now());
    const latestCorrect = started.reduce((n,c) => n + c.progress.latest.correct, 0);
    const latestTotal = started.reduce((n,c) => n + c.progress.latest.total, 0);
    const stats = $('[data-stats]'); stats.replaceChildren();
    for (const [value, label] of [[`${started.length}/${chapters.length}`, 'chapitres travaillés'], [latestTotal ? `${Math.round(100*latestCorrect/latestTotal)} %` : '—', 'réussite sur les derniers quiz complets'], [due.length, 'révisions conseillées maintenant']]) {
      const card = el('div'); card.append(el('strong',value),el('span',label)); stats.append(card);
    }
    const recommendations = $('[data-recommendations]'); recommendations.replaceChildren();
    if (!started.length) recommendations.append(el('p','Terminez un premier quiz pour retrouver ici votre bilan et une prochaine révision.'),link('Choisir mon premier chapitre','/quiz/','quiz-btn quiz-btn--primary'));
    else {
      const candidates = [...started].sort((a,b) => Number(b.progress.due<=Date.now())-Number(a.progress.due<=Date.now()) || a.progress.score-b.progress.score || a.progress.due-b.progress.due).slice(0,3);
      const list = el('ul','', 'progress-plan');
      for (const c of candidates) { const item = el('li'); const text = c.progress.due <= Date.now() ? 'À reprendre maintenant' : `Révision conseillée le ${date(c.progress.due)}`;
        item.append(el('strong',c.title),el('p',`${c.level} · ${text} · Dernier quiz : ${c.progress.latest.correct}/${c.progress.latest.total}`),link('Reprendre ce chapitre',c.href)); list.append(item); }
      recommendations.append(list,el('p','Repères proposés selon le dernier résultat : 1 jour sous 60 %, 3 jours de 60 à moins de 80 %, 7 jours à partir de 80 %. Ce calendrier aide à réviser et ne constitue pas une certification de maîtrise.','quiz-note'));
    }
    const filter = $('[data-filter]').value;
    const visible = rows.filter(c => filter==='all' || (filter==='started' ? c.progress.latest : c.progress.latest && c.progress.due<=Date.now()));
    const list = $('[data-chapters]'); list.replaceChildren();
    for (const c of visible) {
      const card = el('li',undefined,'progress-chapter'); card.append(el('p',`${c.level} · ${c.subject}`,'quiz-skill'),el('h3',c.title));
      const p = c.progress;
      if (p.latest) {
        card.append(el('p',`Dernier quiz complet : ${p.latest.correct}/${p.latest.total} · ${mode(p.latest.mode)} · ${date(p.latest.at)}`));
        const bar = el('progress'); bar.max=100; bar.value=p.score; bar.setAttribute('aria-label',`Dernier résultat : ${p.score} %`); card.append(bar);
        card.append(el('p',`Meilleur résultat complet : ${p.best} %${p.change !== null ? ` · Évolution : ${p.change>0?'+':''}${p.change} points` : ''}`));
        const weak = Object.entries(p.latest.skills).filter(([,g])=>g.correct<g.total).map(([key])=>competencies[key]?.label ?? key);
        card.append(el('p',weak.length ? `À retravailler : ${weak.join(', ')}.` : 'Toutes les questions de ce quiz sont réussies. Consolidez avec les exercices du cours.'));
        card.append(el('p',`${p.due<=Date.now()?'À réviser maintenant':'Prochaine révision'} · ${date(p.due)}`,'progress-due'));
      } else card.append(el('p','Pas encore de quiz complet terminé sur ce chapitre.'));
      card.append(link(p.latest?'Refaire le quiz':'Commencer le quiz',c.href),link('Relire le cours',`/ressources/${c.id}/`,'quiz-text-button')); list.append(card);
    }
    $('[data-empty]').hidden = visible.length>0;
    $('[data-empty]').textContent = filter === 'due' ? 'Aucune révision n’est arrivée à échéance. Vous pouvez consolider un chapitre ou en découvrir un autre.' : 'Vous retrouverez vos chapitres ici après un quiz. Choisissez « Tous les chapitres » pour commencer.';
    const history = $('[data-attempts]'); history.replaceChildren();
    for (const a of [...data.attempts].reverse().filter(a=>chapters.some(c=>c.id===a.course)).slice(0,20)) {
      const chapter = chapters.find(c=>c.id===a.course); const item = el('li');
      item.append(link(chapter.title,chapter.href,'quiz-text-button'),el('span',`${date(a.at)} · ${mode(a.mode)} · ${a.correct}/${a.total} · ${Math.floor(a.duration/60)} min ${a.duration%60} s`)); history.append(item);
    }
    if (!history.children.length) history.append(el('li','Les prochaines sessions terminées apparaîtront ici.'));
  }
  $('[data-filter]').addEventListener('change',render);
  $('[data-clear-progress]').addEventListener('click',()=>{
    if (!window.confirm('Effacer tous vos résultats de quiz et vos auto-évaluations enregistrés sur cet appareil ?')) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      const keys = Array.from({length:localStorage.length},(_,i)=>localStorage.key(i));
      for (const key of keys) if (key && /^(xam-quiz-|xam-revision-)/.test(key)) localStorage.removeItem(key);
      render(); $('[data-storage]').textContent = 'Vos résultats ont été effacés sur cet appareil.';
    } catch { $('[data-storage]').textContent = 'Le navigateur ne permet pas d’effacer ces résultats.'; }
  });
  window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY||e.key===null)render();});
  render();
}
