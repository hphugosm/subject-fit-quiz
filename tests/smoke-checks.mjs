import { readFileSync } from 'node:fs';
import { createInitialState, applyAnswer, computeConfidence, scoreSubjects } from '../src/engine/scoring.js';
import { getQuestionPlan } from '../src/engine/adaptive.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function checkDomHooks() {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const requiredIds = [
    'startBtn',
    'restartBtn',
    'languageSelect',
    'siteTitle',
    'nextBtn',
    'backBtn',
    'introView',
    'quizView',
    'resultsView',
    'questionBody',
    'resultMode',
    'reportStyle',
    'reportStyleLabel',
    'reportStyleConcise',
    'reportStyleDetailed',
    'exportLanguage',
    'exportLanguageLabel',
    'exportLanguageBilingual',
    'exportLanguageCs',
    'exportLanguageEn',
    'exportPdfBtn',
    'subjectsPieChart',
    'traitsPieChart',
    'questionMeta',
    'questionTitle',
    'questionHint',
    'progressText',
    'progressBar',
    'topResults',
    'narrativeBlock',
    'clusterBlock',
    'conflictBlock',
    'profileBlock',
    'whyNotBlock',
    'debugPanel'
  ];

  for (const id of requiredIds) {
    const count = (html.match(new RegExp(`id="${id}"`, 'g')) || []).length;
    assert(count === 1, `ID ${id} must exist exactly once (found ${count})`);
  }
}

function buildPayload(question) {
  if (question.type === 'single') return { optionId: question.options[0].id };
  if (question.type === 'ranked') return { order: question.options.map((o) => o.id) };
  return { value: 50 };
}

function checkQuestionFlow() {
  let state = createInitialState();
  const seen = [];

  for (let i = 0; i < 12; i += 1) {
    const question = getQuestionPlan(state);
    assert(question, `Expected question at step ${i + 1}, got null`);
    assert(!seen.includes(question.id), `Duplicate question encountered: ${question.id}`);
    seen.push(question.id);
    state = applyAnswer(state, question, buildPayload(question));
  }

  const ranked = scoreSubjects(state, 'balanced');
  assert(ranked.length > 0, 'No ranked subjects returned after flow');
  assert(Number.isFinite(ranked[0].scores.final), 'Final score must be finite');

  const confidence = computeConfidence(state);
  assert(confidence.factor >= 0.72 && confidence.factor <= 1.04, 'Confidence factor out of expected bounds');
}

function run() {
  checkDomHooks();
  checkQuestionFlow();
  console.log('Smoke checks passed.');
}

run();
