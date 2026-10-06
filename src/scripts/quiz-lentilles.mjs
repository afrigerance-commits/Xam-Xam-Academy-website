import { questions, competencies, answered, isCorrect, correctLabel, summarize } from '../lib/quizzes/lentilles.mjs';
const root = document.querySelector('[data-quiz]');
if (root) {
  const setup = root.querySelector('[data-setup]');
  const arena = root.querySelector('[data-arena]');
  const results = root.querySelector('[data-results]');
  const history = root.querySelector('[data-history]');
  const storageKey = 'xam-quiz-lentilles-v1';
  let bank = questions;
  let mode = 'training';
  let index = 0;
  let answers = {};
  let validated = new Set();
  let hints = new Set();
  let timer = null;
  let deadline = 0;
  let finished = false;
  let startedAt = 0;
  let attempts = [];
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) attempts = saved.filter(a => a && Number.isFinite(a.correct) && Number.isFinite(a.total) && a.total > 0 && a.correct >= 0 && a.correct <= a.total && Number.isFinite(a.at) && ['training','exam','retry'].includes(a.mode)).slice(-10);
  } catch { storageAvailable = false; }
  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function button(text, handler, className = 'quiz-btn') {
    const node = el('button', text, className); node.type = 'button'; node.addEventListener('click', handler); return node;
  }
  function courseLink(skill) { return `/ressources/3e-lentilles-minces/#${competencies[skill].section}`; }
  function focusHeading(container) {
    const heading = container.querySelector('[data-focus]');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); container.scrollIntoView({ block: 'start', behavior: 'instant' }); }
  }
  function renderHistory() {
    history.replaceChildren();
    history.append(el('h3', 'Vos dernières sessions'));
    if (!attempts.length) history.append(el('p', 'Votre premier résultat apparaîtra ici après un quiz.'));
    else {
      const list = el('ul');
      [...attempts].reverse().slice(0,5).forEach(a => {
        const label = a.mode === 'exam' ? 'Examen' : a.mode === 'retry' ? 'Reprise des erreurs' : 'Entraînement';
        list.append(el('li', `${new Date(a.at).toLocaleDateString('fr-SN')} · ${label} · ${a.correct}/${a.total}`));
      });
      history.append(list, button('Effacer mon historique', () => { attempts=[]; try { localStorage.removeItem(storageKey); } catch { storageAvailable=false; } renderHistory(); }, 'quiz-text-button'));
    }
    history.append(el('p', storageAvailable ? 'Historique enregistré uniquement dans ce navigateur. Aucune synchronisation entre appareils.' : 'Le stockage du navigateur est indisponible. Cette session fonctionne, mais les résultats peuvent ne pas être conservés.', 'quiz-note'));
  }
  function start(nextMode, selected = questions) {
    if (timer) clearInterval(timer);
    mode=nextMode; bank=selected; index=0; answers={}; validated=new Set(); hints=new Set(); finished=false; startedAt=Date.now();
    setup.hidden=true; results.hidden=true; arena.hidden=false;
    deadline=mode==='exam' ? Date.now()+20*60*1000 : 0;
    renderQuestion();
    if (mode==='exam') timer=setInterval(tick,1000);
    focusHeading(arena);
  }
  function tick() {
    if (finished || !deadline) return;
    const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));
    const clock=arena.querySelector('[data-clock]');
    if (clock) clock.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
    if (!seconds) finish(true);
  }
  function answerDisplay(q) {
    const a=answers[q.id];
    if (!answered(q,a)) return 'Sans réponse';
    return q.kind==='number' ? `${a} ${q.unit}` : q.options[a];
  }
  function renderQuestion() {
    arena.replaceChildren();
    const q=bank[index];
    const meta=el('div',undefined,'quiz-meta');
    meta.append(el('span',`${mode==='exam'?'Examen':mode==='retry'?'Reprise ciblée':'Entraînement'} · Question ${index+1}/${bank.length}`));
    if (mode==='exam') { const clock=el('span','','quiz-clock'); clock.dataset.clock=''; clock.setAttribute('aria-label','Temps restant'); meta.append(clock); }
    arena.append(meta);
    const progress=el('progress'); progress.max=bank.length; progress.value=index+1; progress.setAttribute('aria-label','Position dans le quiz'); arena.append(progress);
    const question=el('h2',q.prompt,'quiz-question'); question.dataset.focus=''; arena.append(el('p',competencies[q.skill].label,'quiz-skill'),question);
    const form=el('form'); form.noValidate=true;
    const field=el('fieldset'); const legend=el('legend',q.kind==='choice'?'Choisissez une réponse':'Saisissez votre réponse'); legend.className='sr-only'; field.append(legend);
    const locked=validated.has(q.id);
    const error=el('p','','quiz-error'); error.id='quiz-answer-error'; error.setAttribute('role','alert');
    const validate=el('button',locked?'Réponse validée':'Valider ma réponse','quiz-btn quiz-btn--primary'); validate.type='submit'; validate.disabled=locked;
    if(q.kind==='choice') {
      q.options.forEach((option,i)=>{
        const label=el('label',undefined,'quiz-choice');
        const input=el('input'); input.type='radio'; input.name='answer'; input.value=String(i); input.checked=answers[q.id]===i; input.disabled=locked; input.setAttribute('aria-describedby','quiz-answer-error');
        input.addEventListener('change',()=>{answers[q.id]=i; error.textContent='';});
        label.append(input,el('span',String.fromCharCode(65+i),'quiz-letter'),el('span',option)); field.append(label);
      });
    } else {
      const label=el('label','Votre valeur','quiz-numeric-label'); label.htmlFor='quiz-number';
      const line=el('div',undefined,'quiz-numeric');
      const input=el('input'); input.id='quiz-number'; input.type='text'; input.inputMode='decimal'; input.autocomplete='off'; input.maxLength=24; input.value=answers[q.id]??''; input.disabled=locked; input.setAttribute('aria-describedby','quiz-answer-error quiz-unit');
      input.addEventListener('input',()=>{answers[q.id]=input.value;error.textContent='';});
      const unit=el('span',q.unit); unit.id='quiz-unit'; line.append(input,unit); field.append(label,line,el('p','Vous pouvez utiliser une virgule ou un point.','quiz-note'));
    }
    form.append(field,error);
    if(mode!=='exam') {
      const hint=el('details',undefined,'quiz-hint'); hint.append(el('summary','Un indice ?'),el('p',q.hint)); hint.open=hints.has(q.id);
      hint.addEventListener('toggle',()=>{if(hint.open)hints.add(q.id);}); form.append(hint,validate);
      form.addEventListener('submit',event=>{
        event.preventDefault();
        if(validated.has(q.id))return;
        if(!answered(q,answers[q.id])) {error.textContent=q.kind==='number'?'Saisissez un nombre valide, sans ajouter l’unité.':'Choisissez une réponse avant de valider.'; return;}
        validated.add(q.id); renderQuestion(); const feedback=arena.querySelector('[data-feedback]'); if(feedback){feedback.tabIndex=-1;feedback.focus({preventScroll:true});feedback.scrollIntoView({block:"nearest",behavior:"instant"});}
      });
    } else form.addEventListener('submit',event=>{event.preventDefault(); if(index<bank.length-1){index++;renderQuestion();focusHeading(arena);}else showExamReview();});
    arena.append(form);
    if(locked) {
      const good=isCorrect(q,answers[q.id]);
      const feedback=el('div',undefined,`quiz-feedback ${good?'quiz-feedback--good':'quiz-feedback--review'}`); feedback.dataset.feedback=''; feedback.setAttribute('role','status');
      feedback.append(el('strong',good?'Bonne réponse':'À revoir'),el('p',q.explanation));
      if(!good)feedback.append(el('p',`Réponse attendue : ${correctLabel(q)}`));
      const link=el('a','Revoir cette notion dans le cours →'); link.href=courseLink(q.skill); link.target='_blank';link.rel='noopener';feedback.append(link);arena.append(feedback);
    }
    const nav=el('div',undefined,'quiz-actions');
    if(index>0)nav.append(button('← Précédente',()=>{index--;renderQuestion();focusHeading(arena);},'quiz-btn quiz-btn--quiet'));
    const next=button(index===bank.length-1?'Voir mon bilan':'Suivante →',()=>{
      if(mode==='exam' && index===bank.length-1){showExamReview();return;}
      if(index===bank.length-1){finish();return;}
      index++;renderQuestion();focusHeading(arena);
    },'quiz-btn quiz-btn--primary');
    next.disabled=mode!=='exam'&&!locked;nav.append(next);arena.append(nav);
    arena.append(el('p',mode==='exam'?'Vos réponses peuvent être modifiées avant de terminer. Les corrigés seront affichés dans le bilan.':'Le score conserve votre première réponse validée. Un indice vous aide à raisonner ; il ne retire pas de point.','quiz-note'));
    tick();
  }
  function showExamReview() {
    if(finished)return;
    arena.replaceChildren();
    const heading=el('h2','Avant de rendre votre copie');heading.dataset.focus='';
    const count=bank.filter(q=>answered(q,answers[q.id])).length;
    const clock=el('span','','quiz-clock');clock.dataset.clock='';clock.setAttribute('aria-label','Temps restant');
    arena.append(heading,clock,el('p',`${count} réponse${count>1?'s':''} sur ${bank.length}. Les questions sans réponse compteront comme non réussies.`));
    const grid=el('div',undefined,'quiz-review-grid');
    bank.forEach((q,i)=>grid.append(button(`${i+1} · ${answered(q,answers[q.id])?'Répondue':'À compléter'}`,()=>{index=i;renderQuestion();focusHeading(arena);},'quiz-btn quiz-btn--quiet')));
    arena.append(grid,button('Terminer et voir les corrigés',()=>finish(),'quiz-btn quiz-btn--primary'));tick();focusHeading(arena);
  }
  function finish(timedOut=false) {
    if(finished)return;
    finished=true;if(timer)clearInterval(timer);timer=null;
    const summary=summarize(bank,answers);
    const attempt={at:Date.now(),mode,correct:summary.correct,total:summary.total,duration:Math.round((Date.now()-startedAt)/1000)};
    attempts=[...attempts,attempt].slice(-10);
    try { localStorage.setItem(storageKey,JSON.stringify(attempts)); } catch { storageAvailable=false; }
    arena.hidden=true;results.hidden=false;results.replaceChildren();
    const heading=el('h2',summary.correct===summary.total?'Bravo, les bases sont solides.':'Votre prochaine étape est claire.');heading.dataset.focus='';
    results.append(el('p',timedOut?'Temps écoulé · Bilan de votre examen':'Session terminée','quiz-skill'),heading);
    const score=el('div',undefined,'quiz-score');score.append(el('strong',`${summary.correct}/${summary.total}`),el('span','réponses correctes'));
    results.append(score,el('p',`${summary.attempted} question${summary.attempted>1?'s':''} répondue${summary.attempted>1?'s':''}${hints.size?` · ${hints.size} indice${hints.size>1?'s':''} consulté${hints.size>1?'s':''}`:''}. Ce résultat indique les notions à retravailler ; ce n’est pas une note officielle.`));
    const skills=el('div',undefined,'quiz-skills');
    Object.entries(summary.skills).forEach(([key,data])=>{
      if(!data.total)return;
      const row=el('div',undefined,'quiz-skill-row');
      row.append(el('strong',competencies[key].label),el('span',`${data.correct}/${data.total}`));
      const bar=el('progress');bar.max=data.total;bar.value=data.correct;bar.setAttribute('aria-label',competencies[key].label);row.append(bar);
      const link=el('a',data.correct===data.total?'Relire pour consolider →':'Revoir cette notion →');link.href=courseLink(key);row.append(link);skills.append(row);
    });results.append(skills);
    const actions=el('div',undefined,'quiz-actions');
    if(summary.missed.length)actions.append(button('Reprendre mes erreurs',()=>start('retry',questions.filter(q=>summary.missed.includes(q.id))),'quiz-btn quiz-btn--primary'));
    actions.append(button('Nouveau quiz',()=>{results.hidden=true;setup.hidden=false;renderHistory();focusHeading(setup);},'quiz-btn quiz-btn--quiet'));results.append(actions);
    const review=el('div',undefined,'quiz-corrections');review.append(el('h3','Votre copie, expliquée'));
    bank.forEach((q,i)=>{
      const details=el('details'); const good=isCorrect(q,answers[q.id]);
      details.append(el('summary',`${i+1}. ${good?'✓ Réussi':'À revoir'} — ${q.prompt}`),el('p',`Votre réponse : ${answerDisplay(q)}`),el('p',`Réponse attendue : ${correctLabel(q)}`),el('p',q.explanation));review.append(details);
    });results.append(review);renderHistory();focusHeading(results);
  }
  root.querySelectorAll('[data-start]').forEach(node=>node.addEventListener('click',()=>start(node.dataset.start)));
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&mode==='exam'&&!finished)tick();});
  window.addEventListener('pagehide',()=>{if(timer)clearInterval(timer);timer=null;});
  window.addEventListener('pageshow',()=>{if(mode==='exam'&&!finished&&deadline){tick();if(!finished&&!timer)timer=setInterval(tick,1000);}});
  renderHistory();root.classList.add('quiz-ready');
}
