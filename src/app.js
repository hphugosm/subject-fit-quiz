import { getQuestionPlan } from './engine/adaptive.js';
import { buildClusters, buildNarrative, buildWhyNot } from './engine/narrative.js';
import { applyAnswer, computeConfidence, createInitialState, scoreSubjects } from './engine/scoring.js';
import { collectQuestionAnswer, renderDebug, renderQuestion, renderResults, setActiveView } from './ui/render.js';

let state = createInitialState();
let pendingQuestion = null;
let askedCount = 0;
const MAX_QUESTIONS = 12;
let currentMode = 'balanced';
const snapshots = [];

function start() {
  state = createInitialState();
  pendingQuestion = null;
  askedCount = 0;
  snapshots.length = 0;
  currentMode = 'balanced';
  document.getElementById('resultMode').value = currentMode;
  setActiveView('quizView');
  advance();
}

function advance() {
  if (askedCount >= MAX_QUESTIONS) return finish();
  pendingQuestion = getQuestionPlan(state);
  if (!pendingQuestion) return finish();
  askedCount += 1;
  renderQuestion(pendingQuestion, state, askedCount, MAX_QUESTIONS);
  renderLiveDebug();
}

function submitCurrent() {
  if (!pendingQuestion) return;
  const payload = collectQuestionAnswer(pendingQuestion);
  if (!payload) {
    alert('Nejdřív vyber odpověď.');
    return;
  }
  snapshots.push(structuredClone(state));
  state = applyAnswer(state, pendingQuestion, payload);
  if (askedCount >= MAX_QUESTIONS) return finish();
  advance();
}

function goBack() {
  if (!snapshots.length) {
    setActiveView('introView');
    return;
  }
  state = snapshots.pop();
  askedCount = Math.max(0, askedCount - 1);
  pendingQuestion = getQuestionPlan(state);
  renderQuestion(pendingQuestion, state, Math.max(1, askedCount), MAX_QUESTIONS);
  setActiveView('quizView');
  renderLiveDebug();
}

function finish() {
  setActiveView('resultsView');
  updateResults();
}

function updateResults() {
  const rankedSubjects = scoreSubjects(state, currentMode);
  const narrative = buildNarrative(state, rankedSubjects);
  const clusters = buildClusters(rankedSubjects);
  const whyNot = buildWhyNot(rankedSubjects);
  renderResults({ rankedSubjects, narrative, clusters, whyNot, state, mode: currentMode });
  renderDebug(state, rankedSubjects);
}

function renderLiveDebug() {
  const rankedSubjects = scoreSubjects(state, currentMode);
  renderDebug(state, rankedSubjects);
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('nextBtn').addEventListener('click', submitCurrent);
document.getElementById('backBtn').addEventListener('click', goBack);
document.getElementById('restartBtn').addEventListener('click', () => {
  setActiveView('introView');
  state = createInitialState();
  askedCount = 0;
  snapshots.length = 0;
  renderLiveDebug();
});
document.getElementById('resultMode').addEventListener('change', (e) => {
  currentMode = e.target.value;
  updateResults();
});

renderLiveDebug();
setActiveView('introView');
console.log('Subject Fit Engine loaded', computeConfidence(state));
