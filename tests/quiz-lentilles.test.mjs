import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, parseNumber, answered, isCorrect, summarize } from '../src/lib/quizzes/lentilles.mjs';

test('accepte les décimales françaises et les signes sans interpréter du texte', () => {
  assert.equal(parseNumber('12,5'), 12.5);
  assert.equal(parseNumber(' -2 '), -2);
  assert.equal(parseNumber('0.125'), 0.125);
  for (const input of ['', null, '12 cm', 'Infinity', '2,3,4', '1/2', '<script>']) assert.equal(parseNumber(input), null);
});
test('une case non cochée ne devient pas la première réponse', () => {
  for (const input of [null, undefined, '', '0', -1, 99]) assert.equal(answered(questions[0], input), false);
  assert.equal(isCorrect(questions[0], null), false);
});
test('ne confond pas vergence positive et vergence négative', () => {
  const q = questions.find(q => q.id === 'q08');
  assert.equal(isCorrect(q, '-2'), true);
  assert.equal(isCorrect(q, '2'), false);
});
test('respecte la précision annoncée des réponses numériques', () => {
  const q = questions.find(q => q.id === 'q06');
  assert.equal(isCorrect(q, '12,505'), true);
  assert.equal(isCorrect(q, '12,52'), false);
});
test('un bilan incomplet compte les réponses vides et distingue les compétences', () => {
  const bank = questions.filter(q => ['q01', 'q05', 'q08'].includes(q.id));
  const result = summarize(bank, { q01: 0, q05: '5,00' });
  assert.equal(result.correct, 2);
  assert.equal(result.total, 3);
  assert.equal(result.attempted, 2);
  assert.deepEqual(result.missed, ['q08']);
  assert.deepEqual(result.skills.calcul, { total: 2, correct: 1 });
  assert.deepEqual(result.skills.reperes, { total: 1, correct: 1 });
});
test('une reprise ciblée est évaluée sur ses propres questions', () => {
  const bank = questions.filter(q => ['q05','q08'].includes(q.id));
  const result = summarize(bank, { q05: '5', q08: '-2' });
  assert.equal(result.correct, 2);
  assert.equal(result.total, 2);
  assert.deepEqual(result.missed, []);
});
