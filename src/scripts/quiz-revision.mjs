import { acquired, reviewSummary, restoreHistory, skills } from '../lib/quizzes/revision.mjs';
const root=document.querySelector('[data-revision]');
if(root){
  const $=selector=>root.querySelector(selector);
  const cards=[...root.querySelectorAll('[data-question]')];
  const panels=['setup','arena','submit','results'];
  const key=`xam-revision-${root.dataset.course}-v1`;
  const duration=Number(root.dataset.duration)*60*1000;
  let active=cards.map((_,i)=>i), index=0, mode='training', phase='answer', timer=null, deadline=0;
  let ratings=new Map(), revealed=new Set(), finished=false, history=[];
  try{history=restoreHistory(JSON.parse(localStorage.getItem(key)||'[]'));}catch{unavailable();}
  function unavailable(){$('[data-storage-note]').textContent='L’historique ne peut pas être conservé dans ce navigateur. Vous pouvez utiliser toutes les questions.';}
  function persist(){try{localStorage.setItem(key,JSON.stringify(history));}catch{unavailable();}}
  function element(tag,text,className){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
  function focus(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});}
  function panel(name){for(const p of panels)$(`[data-${p}]`).hidden=p!==name;if(name!=='arena')focus($(`[data-${name}]`).querySelector('[data-focus]'));}
  function historyView(){
    const list=$('[data-history-list]');list.replaceChildren();
    for(const item of history){const date=new Intl.DateTimeFormat('fr-FR',{dateStyle:'short',timeStyle:'short',timeZone:'Africa/Dakar'}).format(item.time);list.append(element('li',`${date} · ${item.acquired}/${item.total} acquis déclarés · ${item.mode==='exam'?'chronométré':item.mode==='retry'?'reprise':'entraînement'}`));}
    if(!history.length)list.append(element('li','Votre prochain bilan apparaîtra ici.'));
    $('[data-clear]').hidden=history.length===0;
  }
  function current(){return cards[active[index]];}
  function stopClock(){clearInterval(timer);timer=null;}
  function tick(){
    if(mode!=='exam'||phase!=='answer'||finished)return;
    const remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
    $('[data-clock]').textContent=`${String(Math.floor(remaining/60)).padStart(2,'0')}:${String(remaining%60).padStart(2,'0')}`;
    if(!remaining){stopClock();submitExam(true);}
  }
  function start(newMode,subset){
    stopClock();active=subset??cards.map((_,i)=>i);index=0;mode=newMode;phase='answer';finished=false;ratings=new Map();revealed=new Set();
    for(const card of cards){card.querySelector('[data-answer]').value='';card.querySelector('[data-answer]').readOnly=false;card.querySelector('[data-hint]').open=false;}
    root.classList.add('quiz-ready');panel('arena');
    if(mode==='exam'){deadline=Date.now()+duration;timer=setInterval(tick,1000);}
    show();tick();
  }
  function show(){
    const card=current(), id=card.dataset.id, input=card.querySelector('[data-answer]');
    for(const c of cards)c.hidden=c!==card;
    $('[data-counter]').textContent=`${phase==='assess'?'Correction · ':''}Question ${index+1} sur ${active.length}`;
    $('[data-progress]').max=active.length;$('[data-progress]').value=index;
    $('[data-error]').textContent='';
    const isExam=mode==='exam'&&phase==='answer';
    const visible=phase==='assess'||revealed.has(id);
    card.querySelector('[data-hint]').hidden=isExam||phase==='assess';
    card.querySelector('[data-correction]').hidden=!visible;
    input.readOnly=phase==='assess'||revealed.has(id);
    $('[data-clock]').hidden=!isExam;
    $('[data-prev]').disabled=index===0;
    $('[data-skip]').hidden=isExam||visible;
    $('[data-compare]').hidden=isExam||visible;
    $('[data-next]').hidden=!isExam&&!visible;
    $('[data-next]').textContent=index===active.length-1?(isExam?'Vérifier ma session':'Voir mon bilan'):'Suivante →';
    card.querySelector('[data-empty-note]').hidden=!!input.value.trim();
    for(const button of card.querySelectorAll('[data-rating]')){
      button.disabled=button.dataset.rating==='acquired'&&!input.value.trim();
      button.setAttribute('aria-pressed',String(ratings.get(id)===button.dataset.rating));
    }
    focus(card.querySelector('[data-question-heading]'));
  }
  function reveal(skipped=false){
    const card=current(), input=card.querySelector('[data-answer]');
    if(!input.value.trim()&&!skipped){$('[data-error]').textContent='Écrivez votre raisonnement, ou choisissez « Passer cette question ».';input.focus();return;}
    revealed.add(card.dataset.id);
    if(!input.value.trim())ratings.set(card.dataset.id,'review');
    show();focus(card.querySelector('[data-correction]'));
  }
  function reviewItems(){return active.map(i=>({skill:cards[i].dataset.skill,answer:cards[i].querySelector('[data-answer]').value,rating:ratings.get(cards[i].dataset.id)}));}
  function submitExam(expired=false){
    stopClock();panel('submit');const written=reviewSummary(reviewItems()).answered;
    $('[data-submit-note]').textContent=`${expired?'Le temps est écoulé. ':''}${written} réponse${written>1?'s':''} rédigée${written>1?'s':''} sur ${active.length}. Les réponses vides resteront à revoir. Vous allez comparer vos réponses aux corrigés et déclarer vos acquis.`;
    $('[data-return]').hidden=expired;
  }
  function assess(){stopClock();phase='assess';index=0;for(const i of active){const c=cards[i];if(!c.querySelector('[data-answer]').value.trim())ratings.set(c.dataset.id,'review');}panel('arena');show();}
  function next(){
    if(!(mode==='exam'&&phase==='answer')&&!ratings.has(current().dataset.id)){
      $('[data-error]').textContent='Après comparaison, indiquez « À revoir » ou « J’ai compris et réussi ».';current().querySelector('[data-rating]').focus();return;
    }
    if(index<active.length-1){index++;show();return;}
    if(mode==='exam'&&phase==='answer')submitExam();else finish();
  }
  function finish(){
    if(finished)return;finished=true;stopClock();panel('results');
    const summary=reviewSummary(reviewItems());$('[data-score]').textContent=`${summary.acquired}/${summary.total}`;
    $('[data-bilan-note]').textContent=`${summary.answered} réponse${summary.answered>1?'s':''} rédigée${summary.answered>1?'s':''}. Ce bilan reflète votre comparaison aux corrigés ; faites vérifier une justification incertaine par votre professeur.`;
    const groups=$('[data-skills]');groups.replaceChildren();
    for(const [skill,group] of Object.entries(summary.groups)){
      const row=element('div',undefined,'quiz-skill-row');row.append(element('strong',skills[skill].label),element('span',`${group.acquired}/${group.total}`));
      const bar=element('progress');bar.max=group.total;bar.value=group.acquired;bar.setAttribute('aria-label',`${skills[skill].label} : ${group.acquired} acquis déclarés sur ${group.total}`);row.append(bar);
      const link=element('a','Revoir dans le cours →');link.href=`/ressources/${root.dataset.course}/#${skills[skill].anchor}`;row.append(link);groups.append(row);
    }
    const list=$('[data-review-list]');list.replaceChildren();
    for(const i of active){
      const card=cards[i], input=card.querySelector('[data-answer]');const details=element('details');
      const status=acquired(input.value,ratings.get(card.dataset.id))?'Acquis déclaré':'À revoir';
      const heading=element('summary',`${status} · ${skills[card.dataset.skill].label}`);details.append(heading);
      const question=element('div',undefined,'prose');question.append(...[...card.querySelector('[data-question-heading]').childNodes].map(n=>n.cloneNode(true)));details.append(question);
      details.append(element('h4','Ma réponse'),element('p',input.value.trim()||'Aucune réponse rédigée.','revision-user-answer'),element('h4','Corrigé de référence'));
      details.append(card.querySelector('[data-correction] .prose').cloneNode(true));list.append(details);
    }
    $('[data-retry]').hidden=summary.acquired===summary.total;
    history.unshift({time:Date.now(),total:summary.total,acquired:summary.acquired,mode});history=history.slice(0,5);persist();historyView();
  }
  for(const button of root.querySelectorAll('[data-start]'))button.addEventListener('click',()=>start(button.dataset.start));
  $('[data-compare]').addEventListener('click',()=>reveal());$('[data-skip]').addEventListener('click',()=>reveal(true));
  $('[data-next]').addEventListener('click',next);
  $('[data-prev]').addEventListener('click',()=>{if(index>0){index--;show();}});
  $('[data-return]').addEventListener('click',()=>{panel('arena');show();if(mode==='exam'){timer=setInterval(tick,1000);tick();}});
  $('[data-finish]').addEventListener('click',assess);
  for(const card of cards)for(const button of card.querySelectorAll('[data-rating]'))button.addEventListener('click',()=>{
    if(button.dataset.rating==='acquired'&&!card.querySelector('[data-answer]').value.trim())return;
    ratings.set(card.dataset.id,button.dataset.rating);$('[data-error]').textContent='';
    for(const b of card.querySelectorAll('[data-rating]'))b.setAttribute('aria-pressed',String(b===button));
  });
  $('[data-retry]').addEventListener('click',()=>{const subset=active.filter(i=>!acquired(cards[i].querySelector('[data-answer]').value,ratings.get(cards[i].dataset.id)));if(subset.length)start('retry',subset);});
  $('[data-restart]').addEventListener('click',()=>{stopClock();panel('setup');});
  $('[data-clear]').addEventListener('click',()=>{history=[];try{localStorage.removeItem(key);}catch{unavailable();}historyView();});
  window.addEventListener('pagehide',stopClock);
  window.addEventListener('pageshow',()=>{if(mode==='exam'&&phase==='answer'&&!finished&&deadline&& !$('[data-arena]').hidden){stopClock();timer=setInterval(tick,1000);tick();}});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
  historyView();
}
