import { getQuestionPlan } from './engine/adaptive.js';
import { buildClusters, buildNarrative, buildWhyNot } from './engine/narrative.js';
import { applyAnswer, computeConfidence, createInitialState, scoreSubjects } from './engine/scoring.js';
import { collectQuestionAnswer, exportResultsToDocx, renderDebug, renderQuestion, renderResults, setActiveView } from './ui/render.js';
import { getUiStrings, localizeQuestion } from './i18n/translations.js';

let state = createInitialState();
let pendingQuestion = null;
let askedCount = 0;
const MAX_QUESTIONS = 12;
let currentMode = 'balanced';
let currentLocale = 'cs';
const snapshots = [];
let lastResultsPayload = null;

function setText(id, value) {
  const node = document.getElementById(id);
  if (node && typeof value === 'string') node.textContent = value;
}

function applyStaticTexts() {
  const t = getUiStrings(currentLocale);
  setText('brandEyebrow', t.brandEyebrow);
  setText('restartBtn', t.restart);
  setText('heroBadge', t.heroBadge);
  setText('heroTitle', t.heroTitle);
  setText('heroSubtitle', t.heroSubtitle);
  t.features.forEach((item, index) => setText(`feature${index + 1}`, item));
  setText('startBtn', t.start);
  setText('durationNote', t.durationNote);
  setText('pullQuote', t.pullQuote);
  setText('resultsEyebrow', t.resultsEyebrow);
  setText('resultsTitle', t.resultsTitle);
  setText('resultModeLabel', t.resultModeLabel);
  setText('modeBalanced', t.modeBalanced);
  setText('modeInterest', t.modeInterest);
  setText('modeStrength', t.modeStrength);
  setText('modeCareer', t.modeCareer);
  setText('debugTitle', t.debugTitle);
  setText('backBtn', t.back);
  setText('nextBtn', t.next);
  setText('exportPdfBtn', t.exportDocx);
  setText('chartSubjectsTitle', t.chartSubjectsTitle);
  setText('chartTraitsTitle', t.chartTraitsTitle);
}

function rerenderActiveView() {
  if (document.body.dataset.activeView === 'quizView' && pendingQuestion) {
    renderQuestion(localizeQuestion(pendingQuestion, currentLocale), state, askedCount, MAX_QUESTIONS, getUiStrings(currentLocale));
    renderLiveDebug();
    return;
  }
  if (document.body.dataset.activeView === 'resultsView') {
    updateResults();
  }
}

function start() {
  state = createInitialState();
  pendingQuestion = null;
  askedCount = 0;
  snapshots.length = 0;
  currentMode = 'balanced';
  document.getElementById('resultMode').value = currentMode;
  applyStaticTexts();
  setActiveView('quizView');
  advance();
}

function advance() {
  if (askedCount >= MAX_QUESTIONS) return finish();
  pendingQuestion = getQuestionPlan(state);
  if (!pendingQuestion) return finish();
  askedCount += 1;
  renderQuestion(localizeQuestion(pendingQuestion, currentLocale), state, askedCount, MAX_QUESTIONS, getUiStrings(currentLocale));
  renderLiveDebug();
}

function submitCurrent() {
  if (!pendingQuestion) return;
  const payload = collectQuestionAnswer(pendingQuestion);
  if (!payload) {
    alert(getUiStrings(currentLocale).chooseAnswerAlert);
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
  renderQuestion(localizeQuestion(pendingQuestion, currentLocale), state, Math.max(1, askedCount), MAX_QUESTIONS, getUiStrings(currentLocale));
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
  const ui = getUiStrings(currentLocale);
  lastResultsPayload = {
    rankedSubjects,
    narrative,
    clusters,
    whyNot,
    state,
    mode: currentMode,
    ui,
    uiCs: getUiStrings('cs'),
    uiEn: getUiStrings('en')
  };
  renderResults(lastResultsPayload);
  renderDebug(state, rankedSubjects, getUiStrings(currentLocale));
}

function renderLiveDebug() {
  const rankedSubjects = scoreSubjects(state, currentMode);
  renderDebug(state, rankedSubjects, getUiStrings(currentLocale));
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
document.getElementById('exportPdfBtn').addEventListener('click', () => {
  if (!lastResultsPayload) return;
  exportResultsToDocx(lastResultsPayload);
});
document.getElementById('languageSelect').addEventListener('change', (e) => {
  currentLocale = e.target.value;
  applyStaticTexts();
  rerenderActiveView();
});

applyStaticTexts();
renderLiveDebug();
setActiveView('introView');
console.log('Subject Fit Engine loaded', computeConfidence(state));
