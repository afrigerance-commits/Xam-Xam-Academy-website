import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { automaticBanks } from '../src/lib/quizzes/bank.mjs';
import { questions as lenses } from '../src/lib/quizzes/lentilles.mjs';
import { answered, isCorrect, parseNumber, summarize, competencies, levelSummary } from '../src/lib/quizzes/automatic.mjs';
const catalog = JSON.parse(fs.readFileSync(new URL('../src/lib/quizzes/catalog.json',import.meta.url)));
test('all 122 written chapters have ten distinct questions in three progressive stages',()=>{
  assert.deepEqual(Object.keys(automaticBanks).sort(),catalog.filter(c=>c.kind==='written').map(c=>c.id).sort());
  assert.equal(Object.values(automaticBanks).flat().length,1220);
  for (const [id,bank] of Object.entries(automaticBanks)) {
    assert.equal(bank.length,10,id); assert.equal(new Set(bank.map(q=>q.id)).size,10,id);
    assert.equal(new Set(bank.map(q=>q.prompt.normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim())).size,10,id);
    assert.deepEqual(bank.map(q=>q.level),[1,1,1,1,2,2,2,3,3,3],id);
    for(const skill of ['comprehension','application','vigilance','transfert']) assert.ok(bank.some(q=>q.skill===skill),id);
    for (const q of bank) {
      assert.ok(competencies[q.skill],id); assert.ok(q.prompt.trim().length>0,id); assert.ok(q.explanation.trim().length>0,id); assert.ok(q.hint.trim().length>0,id);
      if(q.kind==='choice') { assert.equal(new Set(q.options).size,q.options.length,id); assert.ok(q.correct>=0&&q.correct<q.options.length,id); for(let i=0;i<q.options.length;i++)assert.equal(isCorrect(q,i),i===q.correct,id); }
      else { assert.ok(Number.isFinite(q.correct),id); assert.ok(q.tolerance>0,id); assert.equal(isCorrect(q,String(q.correct)),true,id); assert.equal(isCorrect(q,String(q.correct).replace('.',',')),true,id); assert.equal(isCorrect(q,q.correct===0?'1':'0'),false,id); }
    }
    const full=Object.fromEntries(bank.map(q=>[q.id,q.correct]));assert.equal(summarize(bank,full).correct,bank.length,id);
  }
});
test('numeric parsing accepts scientific notation, commas and Unicode minus without coercing blanks or units',()=>{
  assert.equal(parseNumber(' −1,2e-3 '),-.0012);
  for(const value of ['', ' ', undefined, 'Infinity','NaN','1/2','12 V','1,2,3','1 2'])assert.equal(parseNumber(value),null);
});
test('blank and invalid answers are wrong and included in the revision plan',()=>{
  const bank=automaticBanks['3e-resistances']; const s=summarize(bank,{[bank[0].id]:bank[0].correct});
  assert.equal(s.correct,1);assert.equal(s.attempted,1);assert.equal(s.missed.length,9);assert.equal(s.total,10);
  assert.equal(answered(bank[0],String(bank[0].correct)),false);
});
test('legacy lens question bank is compatible with the shared engine',()=>{
  const answers=Object.fromEntries(lenses.map(q=>[q.id,q.correct])); const summary=summarize(lenses,answers);
  assert.equal(summary.correct,20);assert.equal(summary.missed.length,0);
  for(const q of lenses)assert.equal(isCorrect(q,q.correct),true);
});
test('physical calculations preserve small values, signs and explicit tolerances',()=>{
  const electron=automaticBanks['seconde-s-electrisation'].find(q=>q.id==='auto-2');assert.equal(isCorrect(electron,'-1,6e-7'),true);assert.equal(isCorrect(electron,'1.6e-7'),false);assert.equal(isCorrect(electron,'0'),false);
  const field=automaticBanks['terminale-champ-magnetique'].find(q=>q.id==='auto-2');assert.equal(isCorrect(field,'2.51e-3'),true);
  const molar=automaticBanks['terminale-acides-amines'].find(q=>q.id==='auto-2');assert.equal(isCorrect(molar,'75'),true);
});
test('bilan by stage accounts for blank syntheses and targeted retries',()=>{
 const bank=automaticBanks['3e-resistances'];
 const answers=Object.fromEntries(bank.filter(q=>q.level<3).map(q=>[q.id,q.correct]));
 assert.deepEqual(levelSummary(bank,answers).map(g=>[g.level,g.correct,g.total]),[[1,4,4],[2,3,3],[3,0,3]]);
 const retry=bank.filter(q=>q.level===3); assert.deepEqual(levelSummary(retry,{}).map(g=>[g.level,g.total]),[[3,3]]);
 assert.deepEqual(lenses.map(q=>q.level),[...lenses.map(q=>q.level)].sort());
});
test('chapter calculations agree with independent physical and mathematical balances',()=>{
 const q=(chapter,id)=>automaticBanks[chapter].find(q=>q.id===`deep-${id}`);
 const check=(chapter,id,value)=>assert.ok(isCorrect(q(chapter,id),String(value)),`${chapter} deep-${id}`);
 check('3e-resistances',5,12/(15+25));
 check('3e-resistances',6,6/6+6/3);
 check('3e-solutions-aqueuses',5,40*.05/.2);
 check('3e-metaux',6,Math.min(.2,.2/2));
 check('premiere-s2-calorimetrie',5,(.1*80+.3*20)/.4);
 check('premiere-s2-lentilles',3,1/(1/10+1/(-30)));
 check('premiere-s2-electrolyse',5,1930/96500/2);
 check('terminale-acide-base-forts',6,-Math.log10((.02*.1-.01*.1)/(.02+.01)));
 check('terminale-applications-dynamique',6,20**2/(2*5));
 check('terminale-oscillations-mecaniques',7,Math.sqrt(100*.1**2/.25));
 check('terminale-probabilites',7,.6*.02+.4*.05);
 check('terminale-primitives-integrales',4,(2**3+2)-(1**3+1));
 check('terminale-photoelectrique',6,6.6e-34*1e15-3.3e-19);
});
