import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { automaticBanks } from '../src/lib/quizzes/bank.mjs';
import { questions as lenses } from '../src/lib/quizzes/lentilles.mjs';
import { answered, isCorrect, parseNumber, summarize, competencies } from '../src/lib/quizzes/automatic.mjs';
const catalog = JSON.parse(fs.readFileSync(new URL('../src/lib/quizzes/catalog.json',import.meta.url)));
test('all 122 written chapters have three explicit automatic questions and explanations',()=>{
  assert.deepEqual(Object.keys(automaticBanks).sort(),catalog.filter(c=>c.kind==='written').map(c=>c.id).sort());
  assert.equal(Object.values(automaticBanks).flat().length,366);
  for (const [id,bank] of Object.entries(automaticBanks)) {
    assert.equal(bank.length,3,id); assert.equal(new Set(bank.map(q=>q.id)).size,3,id);
    assert.deepEqual(new Set(bank.map(q=>q.skill)),new Set(['comprehension','application','vigilance']),id);
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
  assert.equal(s.correct,1);assert.equal(s.attempted,1);assert.equal(s.missed.length,2);assert.equal(s.total,3);
  assert.equal(answered(bank[0],String(bank[0].correct)),false);
});
test('legacy lens question bank is compatible with the shared engine',()=>{
  const answers=Object.fromEntries(lenses.map(q=>[q.id,q.correct])); const summary=summarize(lenses,answers);
  assert.equal(summary.correct,20);assert.equal(summary.missed.length,0);
  for(const q of lenses)assert.equal(isCorrect(q,q.correct),true);
});
test('physical calculations preserve small values, signs and explicit tolerances',()=>{
  const electron=automaticBanks['seconde-s-electrisation'][1];assert.equal(isCorrect(electron,'-1,6e-7'),true);assert.equal(isCorrect(electron,'1.6e-7'),false);assert.equal(isCorrect(electron,'0'),false);
  const field=automaticBanks['terminale-champ-magnetique'][1];assert.equal(isCorrect(field,'2.51e-3'),true);
  const molar=automaticBanks['terminale-acides-amines'][1];assert.equal(isCorrect(molar,'75'),true);
});
