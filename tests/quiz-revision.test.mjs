import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { acquired, reviewSummary, restoreHistory, skills } from '../src/lib/quizzes/revision.mjs';
const catalog=JSON.parse(fs.readFileSync(new URL('../src/lib/quizzes/catalog.json',import.meta.url),'utf8'));
test('an unanswered or unassessed response never counts as acquired',()=>{
  assert.equal(acquired('', 'acquired'),false);assert.equal(acquired('  ', 'acquired'),false);
  assert.equal(acquired(undefined,'acquired'),false);assert.equal(acquired('Une justification','review'),false);
  assert.equal(acquired('Une justification','acquired'),true);
});
test('partial written work has independent answered and declared acquisition counts',()=>{
  assert.deepEqual(reviewSummary([{skill:'methode',answer:'Réponse',rating:'acquired'},{skill:'methode',answer:'',rating:'acquired'},{skill:'vigilance',answer:'Essai',rating:'review'}]),{total:3,answered:2,acquired:1,groups:{methode:{total:2,acquired:1},vigilance:{total:1,acquired:0}}});
});
test('local history rejects corrupted sessions and impossible totals',()=>{
  const good={time:Date.now(),total:6,acquired:4,mode:'exam'};
  assert.deepEqual(restoreHistory([null,{...good,time:1e99},{...good,acquired:7},{...good,mode:'bad'},good]),[good]);
  assert.deepEqual(restoreHistory({}),[]);assert.equal(restoreHistory(Array(8).fill(good)).length,5);
});
test('every published course has exactly one revision path and complete chapter-specific answers',()=>{
  const dir=new URL('../src/content/ressources/',import.meta.url);
  const courses=fs.readdirSync(dir).filter(p=>p.endsWith('.md')&&/^type: "Cours"$/m.test(fs.readFileSync(new URL(p,dir),'utf8'))).map(p=>p.slice(0,-3));
  assert.equal(catalog.length,123);assert.deepEqual(catalog.map(q=>q.id).sort(),courses.sort());
  assert.equal(new Set(catalog.map(q=>q.href)).size,123);
  for(const quiz of catalog.filter(q=>q.kind==='written')){
    assert.equal(quiz.questions.length,quiz.count,quiz.id);
    assert.equal(new Set(quiz.questions.map(q=>q.id)).size,quiz.count,quiz.id);
    assert.equal(new Set(quiz.questions.map(q=>q.prompt)).size,quiz.count,quiz.id);
    for(const q of quiz.questions){assert.ok(skills[q.skill]);assert.ok(q.prompt.trim().length>0);assert.ok(q.answer.trim().length>0);assert.ok(q.hint.trim().length>15);assert.doesNotMatch(q.answer,/:::|<!--|undefined/);}
    assert.equal(quiz.questions.filter(q=>q.skill==='transfert').length,1);
  }
});
