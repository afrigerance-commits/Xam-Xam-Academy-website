import test from 'node:test';
import assert from 'node:assert/strict';
import { restoreProgress, saveAttempt, loadProgress, chapterProgress, nextReview, DAY } from '../src/lib/quizzes/progress.mjs';
const now=Date.now();
const attempt=(correct=1,extra={})=>({course:'3e-resistances',at:now,mode:'training',total:3,correct,duration:30,missed:Array.from({length:3-correct},(_,i)=>`q${i}`),skills:{application:{total:3,correct}},...extra});
const data=attempts=>({version:1,attempts});
test('corrupt, future, inconsistent and impossible stored records are discarded',()=>{
  const good=attempt();const corrupt=[null,{...good,at:1e99},{...good,at:now+DAY},{...good,correct:4},{...good,total:0},{...good,mode:'made-up'},{...good,skills:{application:{total:1,correct:1}}},{...good,missed:[]},{...good,course:'../secret'}];
  assert.deepEqual(restoreProgress(data([...corrupt,good])).attempts,[good]);
  assert.deepEqual(restoreProgress([]),data([]));
});
test('a perfect targeted retry cannot inflate the best full quiz score or replace its due date',()=>{
  const full=attempt(1);const retry=attempt(1,{mode:'retry',at:now+1000,total:1,missed:[],skills:{application:{total:1,correct:1}}});
  const p=chapterProgress(data([full,retry]),full.course);
  assert.equal(p.score,33);assert.equal(p.best,33);assert.equal(p.latest,full);assert.equal(p.attempts.length,2);assert.equal(p.due,now+DAY);
});
test('comparisons use only complete attempts and scheduling respects thresholds',()=>{
  const p=chapterProgress(data([attempt(1,{at:now-1000}),attempt(2)]),'3e-resistances');assert.equal(p.change,34);assert.equal(p.best,67);
  assert.equal(nextReview(attempt(1)),now+DAY);assert.equal(nextReview(attempt(2)),now+3*DAY);assert.equal(nextReview(attempt(3)),now+7*DAY);
});
test('an expanded quiz retains old history without comparing three questions with ten',()=>{
 const old=attempt(3,{at:now-1000});
 const expanded=attempt(6,{total:10,missed:['d1','d2','d3','d4'],skills:{application:{total:10,correct:6}}});
 const p=chapterProgress(data([old,expanded]),old.course);
 assert.equal(p.attempts.length,2);assert.equal(p.score,60);assert.equal(p.best,60);assert.equal(p.change,null);
 const recent={...expanded,at:now+1000,correct:8,missed:['d1','d2'],skills:{application:{total:10,correct:8}}};
 const next=chapterProgress(data([old,expanded,recent]),old.course);assert.equal(next.change,20);assert.equal(next.best,80);
});
test('storage denial or malformed JSON does not prevent scoring',()=>{
  const unavailable={getItem(){throw Error('denied');},setItem(){throw Error('quota');}};
  assert.equal(loadProgress(unavailable).available,false);const s=saveAttempt(attempt(),unavailable);assert.equal(s.available,false);assert.equal(s.data.attempts.length,1);
  assert.deepEqual(loadProgress({getItem(){return 'broken';}}).data,data([]));
});
test('stored records exclude written answers and preserve a latest full result when history grows',()=>{
  let text='';const storage={getItem(){return text||null;},setItem(k,v){text=v;}};
  saveAttempt({...attempt(),answers:{secret:'a written answer'}},storage);assert.equal(text.includes('secret'),false);
  const old=attempt(1,{course:'4e-fractions',at:now-100000});
  const recent=Array.from({length:600},(_,i)=>attempt(1,{at:now-600+i}));
  assert.ok(restoreProgress(data([old,...recent])).attempts.some(a=>a.course==='4e-fractions'));
});
