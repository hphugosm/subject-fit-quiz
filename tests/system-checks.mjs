import { readFileSync } from 'node:fs';
import { QUESTIONS } from '../src/data/questions.js';
import { getQuestionPlan } from '../src/engine/adaptive.js';
import { applyAnswer, computeConfidence, createInitialState, scoreSubjects } from '../src/engine/scoring.js';
import { getUiStrings, localizeQuestion } from '../src/i18n/translations.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function buildPayload(question) {
  if (question.type === 'single') return { optionId: question.options[0].id };
  if (question.type === 'ranked') return { order: question.options.map((option) => option.id) };
  return { value: 70 };
}

function checkLocalizationCoverage() {
  const uiCs = getUiStrings('cs');
  const uiEn = getUiStrings('en');

  assert(uiCs.exportDocx && uiEn.exportDocx, 'Missing DOCX export labels in UI dictionaries');
  assert(uiCs.chartSubjectsTitle && uiEn.chartSubjectsTitle, 'Missing chart labels in UI dictionaries');
  assert(uiCs.reportStyleLabel && uiEn.reportStyleLabel, 'Missing report style labels in UI dictionaries');
  assert(uiCs.reportStyleDetailed && uiEn.reportStyleDetailed, 'Missing detailed style labels in UI dictionaries');
  assert(uiCs.exportLanguageLabel && uiEn.exportLanguageLabel, 'Missing export language labels in UI dictionaries');
  assert(uiCs.exportLanguageBilingual && uiEn.exportLanguageBilingual, 'Missing bilingual export labels in UI dictionaries');

  for (const question of QUESTIONS) {
    const localizedCs = localizeQuestion(question, 'cs');
    const localizedEn = localizeQuestion(question, 'en');

    assert(typeof localizedCs.prompt === 'string' && localizedCs.prompt.length > 5, `Missing CS prompt for ${question.id}`);
    assert(typeof localizedEn.prompt === 'string' && localizedEn.prompt.length > 5, `Missing EN prompt for ${question.id}`);

    if (question.type === 'single' || question.type === 'ranked') {
      assert(Array.isArray(localizedEn.options), `Localized EN options missing for ${question.id}`);
      assert(localizedEn.options.every((option) => typeof option.label === 'string' && option.label.length > 0), `Localized EN option labels missing for ${question.id}`);
    }
  }
}

function runAdaptiveFlow() {
  let state = createInitialState();

  for (let step = 0; step < 12; step += 1) {
    const question = getQuestionPlan(state);
    assert(question, `Expected a question at adaptive step ${step + 1}`);
    state = applyAnswer(state, question, buildPayload(question));
  }

  const modes = ['balanced', 'interest', 'strength', 'career'];
  for (const mode of modes) {
    const ranked = scoreSubjects(state, mode);
    assert(ranked.length > 0, `No ranked subjects in mode ${mode}`);
    assert(ranked.every((item) => Number.isFinite(item.scores.final)), `Non-finite score in mode ${mode}`);
    for (let i = 1; i < ranked.length; i += 1) {
      assert(ranked[i - 1].scores.final >= ranked[i].scores.final, `Ranking not sorted in mode ${mode}`);
    }
  }

  const confidence = computeConfidence(state);
  assert(confidence.factor >= 0.72 && confidence.factor <= 1.04, 'Confidence factor out of expected bounds');
}

function checkDocxHooksAndTranslations() {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert(html.includes('docx@8.5.0/build/index.umd.js'), 'DOCX script include missing in index.html');
  assert(html.includes('file-saver@2.0.5/dist/FileSaver.min.js'), 'FileSaver script include missing in index.html');

  const todo = readFileSync(new URL('../TRANSLATION_TODO.md', import.meta.url), 'utf8');
  assert(todo.includes('## Zpětné vazby a výsledné texty'), 'Translation document missing full narrative section');

  const txt = readFileSync(new URL('../TEXTY_K_PREKLADU.txt', import.meta.url), 'utf8');
  assert(txt.includes('## Zpětné vazby a výsledné texty'), 'TEXTY_K_PREKLADU.txt missing full narrative section');
}

function run() {
  checkLocalizationCoverage();
  runAdaptiveFlow();
  checkDocxHooksAndTranslations();
  console.log('System checks passed.');
}

run();
