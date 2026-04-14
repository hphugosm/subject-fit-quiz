import { getQuestionPlan } from './engine/adaptive.js';
import { buildCoverageAuditSummaryLines } from './engine/coverage-audit.js';
import { buildClusters, buildWhyNot } from './engine/narrative.js';
import { QUESTIONS } from './data/questions.js';
import { applyAnswer, computeConfidence, createInitialState, scoreSubjects } from './engine/scoring.js';
import { collectQuestionAnswer, exportResultsToDocx, renderDebug, renderQuestion, renderResults, setActiveView } from './ui/render.js';
import { getUiStrings, loadContentOverridesFromMarkdown, localizeQuestion } from './i18n/translations.js';
import { buildLocalizedNarrative, localizeContradictions, localizeRankedSubjects } from './i18n/results-localization.js';

let state = createInitialState();
let pendingQuestion = null;
let askedCount = 0;
const BASE_QUESTIONS = 12;
const MAX_GUARDRAIL_QUESTIONS = 4;
let targetQuestionCount = BASE_QUESTIONS;
let currentMode = 'balanced';
let currentLocale = 'cs';
let currentReportStyle = 'detailed';
let currentExportLanguage = 'bilingual';
const snapshots = [];
let lastResultsPayload = null;
const coverageAuditLines = buildCoverageAuditSummaryLines();

function setText(id, value) {
  const node = document.getElementById(id);
  if (node && typeof value === 'string') node.textContent = value;
}

function applyStaticTexts() {
  const t = getUiStrings(currentLocale);
  setText('brandEyebrow', t.brandEyebrow);
  setText('siteTitle', t.siteTitle);
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
  setText('reportStyleLabel', t.reportStyleLabel);
  setText('reportStyleConcise', t.reportStyleConcise);
  setText('reportStyleDetailed', t.reportStyleDetailed);
  setText('exportLanguageLabel', t.exportLanguageLabel);
  setText('exportLanguageBilingual', t.exportLanguageBilingual);
  setText('exportLanguageCs', t.exportLanguageCs);
  setText('exportLanguageEn', t.exportLanguageEn);
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
  document.title = `${t.siteTitle} | ${t.brandEyebrow}`;
}

function rerenderActiveView() {
  if (document.body.dataset.activeView === 'quizView' && pendingQuestion) {
    renderQuestion(localizeQuestion(pendingQuestion, currentLocale), state, askedCount, targetQuestionCount, getUiStrings(currentLocale));
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
  targetQuestionCount = BASE_QUESTIONS;
  snapshots.length = 0;
  currentMode = 'balanced';
  currentReportStyle = 'detailed';
  currentExportLanguage = 'bilingual';
  document.getElementById('resultMode').value = currentMode;
  document.getElementById('reportStyle').value = currentReportStyle;
  document.getElementById('exportLanguage').value = currentExportLanguage;
  applyStaticTexts();
  setActiveView('quizView');
  advance();
}

function advance() {
  if (askedCount >= targetQuestionCount) return finish();
  pendingQuestion = getQuestionPlan(state);
  if (!pendingQuestion) return finish();
  askedCount += 1;
  renderQuestion(localizeQuestion(pendingQuestion, currentLocale), state, askedCount, targetQuestionCount, getUiStrings(currentLocale));
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
  if (askedCount >= targetQuestionCount) return finish();
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
  renderQuestion(localizeQuestion(pendingQuestion, currentLocale), state, Math.max(1, askedCount), targetQuestionCount, getUiStrings(currentLocale));
  setActiveView('quizView');
  renderLiveDebug();
}

function unresolvedAdaptiveQuestionCount() {
  const answered = new Set(state.selectedQuestionIds);
  return QUESTIONS.filter((question) => question.phase === 'adaptive' && !answered.has(question.id)).length;
}

function finish() {
  const confidence = computeConfidence(state);
  const canExtend = askedCount >= BASE_QUESTIONS && askedCount >= targetQuestionCount;
  if (confidence.level === 'low' && canExtend) {
    const available = unresolvedAdaptiveQuestionCount();
    const extraCount = Math.min(MAX_GUARDRAIL_QUESTIONS, available);
    if (extraCount > 0) {
      targetQuestionCount = askedCount + extraCount;
      alert(getUiStrings(currentLocale).lowConfidenceExtendAlert);
      advance();
      return;
    }
  }
  setActiveView('resultsView');
  updateResults();
}

function updateResults() {
  const confidence = computeConfidence(state);
  const rankedRaw = scoreSubjects(state, currentMode);

  const rankedSubjects = localizeRankedSubjects(rankedRaw, currentLocale);
  const narrative = buildLocalizedNarrative(state, rankedSubjects, currentLocale);
  const clusters = buildClusters(rankedSubjects);
  const whyNot = buildWhyNot(rankedSubjects);
  const localizedState = {
    ...state,
    contradictions: localizeContradictions(state.contradictions, currentLocale)
  };

  const rankedSubjectsCs = localizeRankedSubjects(rankedRaw, 'cs');
  const rankedSubjectsEn = localizeRankedSubjects(rankedRaw, 'en');

  const ui = getUiStrings(currentLocale);
  lastResultsPayload = {
    rankedSubjects,
    narrative,
    clusters,
    whyNot,
    state: localizedState,
    mode: currentMode,
    reportStyle: currentReportStyle,
    exportLanguage: currentExportLanguage,
    confidence,
    locale: currentLocale,
    ui,
    uiCs: getUiStrings('cs'),
    uiEn: getUiStrings('en'),
    bilingual: {
      cs: {
        rankedSubjects: rankedSubjectsCs,
        narrative: buildLocalizedNarrative(state, rankedSubjectsCs, 'cs'),
        clusters: buildClusters(rankedSubjectsCs),
        whyNot: buildWhyNot(rankedSubjectsCs),
        state: { ...state, contradictions: localizeContradictions(state.contradictions, 'cs') }
      },
      en: {
        rankedSubjects: rankedSubjectsEn,
        narrative: buildLocalizedNarrative(state, rankedSubjectsEn, 'en'),
        clusters: buildClusters(rankedSubjectsEn),
        whyNot: buildWhyNot(rankedSubjectsEn),
        state: { ...state, contradictions: localizeContradictions(state.contradictions, 'en') }
      }
    }
  };
  renderResults(lastResultsPayload);
  renderDebug(localizedState, rankedSubjects, getUiStrings(currentLocale), currentLocale, coverageAuditLines);
}

function renderLiveDebug() {
  const rankedSubjects = localizeRankedSubjects(scoreSubjects(state, currentMode), currentLocale);
  const localizedState = {
    ...state,
    contradictions: localizeContradictions(state.contradictions, currentLocale)
  };
  renderDebug(localizedState, rankedSubjects, getUiStrings(currentLocale), currentLocale, coverageAuditLines);
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
document.getElementById('reportStyle').addEventListener('change', (e) => {
  currentReportStyle = e.target.value;
  updateResults();
});
document.getElementById('exportLanguage').addEventListener('change', (e) => {
  currentExportLanguage = e.target.value;
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

async function bootstrap() {
  await loadContentOverridesFromMarkdown('./TRANSLATION_TODO-4.md');
  applyStaticTexts();
  renderLiveDebug();
  setActiveView('introView');
  console.log('Subject Fit Engine loaded', computeConfidence(state));
}

bootstrap();
