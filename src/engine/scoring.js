import { SUBJECTS } from "../data/subjects.js";
import { TRAITS } from "../data/traits.js";
import { CONTRADICTION_RULES, SCORING_MODES, QUESTION_WEIGHTS } from "../data/rules.js";

export function createInitialState() {
  const zeroed = Object.fromEntries(TRAITS.map((t) => [t, 0]));
  return {
    answers: {},
    history: [],
    traits: { ...zeroed },
    confidenceSignals: [],
    contradictions: [],
    selectedQuestionIds: []
  };
}

export function applyAnswer(state, question, answerPayload) {
  const next = structuredClone(state);
  next.answers[question.id] = answerPayload;
  next.history.push({ questionId: question.id, answer: answerPayload });
  if (!next.selectedQuestionIds.includes(question.id)) next.selectedQuestionIds.push(question.id);

  const multiplier = QUESTION_WEIGHTS[question.style] ?? 1;

  if (question.type === "single") {
    const option = question.options.find((o) => o.id === answerPayload.optionId);
    mergeEffects(next.traits, option.effects, multiplier);
  }

  if (question.type === "ranked") {
    const ordered = answerPayload.order;
    ordered.forEach((optionId, idx) => {
      const option = question.options.find((o) => o.id === optionId);
      const rankMultiplier = [1.0, 0.68, 0.42, 0.2][idx] ?? 0.1;
      mergeEffects(next.traits, option.effects, multiplier * rankMultiplier);
    });
  }

  if (question.type === "pairwise") {
    const raw = Number(answerPayload.value);
    const leftWeight = Math.max(0, (100 - raw) / 100);
    const rightWeight = Math.max(0, raw / 100);
    mergeEffects(next.traits, question.left.effects, multiplier * leftWeight);
    mergeEffects(next.traits, question.right.effects, multiplier * rightWeight);
  }

  if (question.type === "confidence") {
    next.confidenceSignals.push(Number(answerPayload.value) / 100);
  }

  normalizeTraits(next.traits);
  next.contradictions = detectContradictions(next.traits);
  return next;
}

function mergeEffects(target, effects, mult) {
  Object.entries(effects).forEach(([trait, value]) => {
    if (!(trait in target)) target[trait] = 0;
    target[trait] += value * mult;
  });
}

function normalizeTraits(traits) {
  Object.keys(traits).forEach((key) => {
    const value = traits[key];
    const normalized = 1 / (1 + Math.exp(-value));
    traits[key] = Number(normalized.toFixed(4));
  });
}

export function detectContradictions(traits) {
  return CONTRADICTION_RULES
    .filter((rule) => rule.when(traits))
    .map(({ id, severity, label }) => ({ id, severity, label }));
}

function dot(user, weights) {
  return Object.entries(weights).reduce((sum, [k, v]) => sum + (user[k] || 0) * v, 0);
}

function antiFitPenalty(user, antiFit) {
  return Object.entries(antiFit).reduce((sum, [k, v]) => sum + (user[k] || 0) * v, 0);
}

export function scoreSubjects(state, modeKey = "balanced") {
  const mode = SCORING_MODES[modeKey] ?? SCORING_MODES.balanced;
  const confidence = computeConfidence(state);
  const contradictionPenalty = state.contradictions.reduce((sum, item) => sum + item.severity, 0);
  const signalTraits = toSignalTraits(state.traits);

  const preScored = SUBJECTS.map((subject) => {
    const interestFit = dot(signalTraits, subject.ideal);
    const aptitudeFit = dot(signalTraits, mapAptitude(subject.ideal));
    const workStyleFit = dot(signalTraits, mapWorkStyle(subject.ideal));
    const motivationFit = dot(signalTraits, mapMotivation(subject.ideal));
    const assessmentFit = dot(signalTraits, mapAssessment(subject.ideal));
    const antiPenalty = antiFitPenalty(signalTraits, subject.antiFit || {});

    const raw =
      interestFit * mode.interest +
      aptitudeFit * mode.aptitude +
      workStyleFit * mode.workStyle +
      motivationFit * mode.motivation +
      assessmentFit * mode.assessment -
      antiPenalty -
      contradictionPenalty;

    return {
      subject,
      interestFit,
      aptitudeFit,
      workStyleFit,
      motivationFit,
      assessmentFit,
      antiPenalty,
      raw
    };
  });

  const clusterAdjustment = buildClusterAdjustment(preScored);

  return preScored.map((entry) => {
    const clusterFairnessPenalty = clusterAdjustment.get(entry.subject.cluster) ?? 0;
    const fairRaw = entry.raw * (1 - clusterFairnessPenalty);
    const scaled = Math.max(0, Math.min(100, fairRaw * 28 * confidence.factor));

    return {
      ...entry.subject,
      scores: {
        interestFit: round(entry.interestFit * 100 / 6),
        aptitudeFit: round(entry.aptitudeFit * 100 / 6),
        workStyleFit: round(entry.workStyleFit * 100 / 5),
        motivationFit: round(entry.motivationFit * 100 / 5),
        assessmentFit: round(entry.assessmentFit * 100 / 4),
        antiPenalty: round(entry.antiPenalty * 10),
        clusterFairnessPenalty: round(clusterFairnessPenalty * 100),
        contradictionPenalty: round(contradictionPenalty * 100),
        final: round(scaled)
      },
      confidence: confidence.level
    };
  }).sort((a, b) => b.scores.final - a.scores.final);
}

function mapAptitude(ideal) {
  return projectWeights(ideal, ["systematic_thinking", "strategic_thinking", "argumentation", "quant_reasoning", "language_sensitivity", "organizational_drive"]);
}
function mapWorkStyle(ideal) {
  return projectWeights(ideal, ["people_orientation", "text_orientation", "practical_impact", "structure_need", "presentation_energy", "optimization_drive"]);
}
function mapMotivation(ideal) {
  return projectWeights(ideal, ["practical_impact", "financial_orientation", "creative_expression", "ethics_orientation", "global_orientation", "cultural_curiosity"]);
}
function mapAssessment(ideal) {
  return projectWeights(ideal, ["text_orientation", "theory_tolerance", "presentation_energy", "quant_reasoning", "ambiguity_tolerance"]);
}
function projectWeights(ideal, keys) {
  return Object.fromEntries(Object.entries(ideal).filter(([k]) => keys.includes(k)));
}
function round(n) { return Math.round(n * 10) / 10; }

function toSignalTraits(traits) {
  return Object.fromEntries(
    Object.entries(traits).map(([key, value]) => {
      // Values around 0.5 are neutral due to sigmoid normalization.
      const signal = Math.max(0, (value - 0.5) * 2);
      return [key, Number(signal.toFixed(4))];
    })
  );
}

function buildClusterAdjustment(preScored) {
  const buckets = new Map();
  preScored.forEach((entry) => {
    const key = entry.subject.cluster;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(entry.raw);
  });

  const clusterAverages = Array.from(buckets.entries()).map(([cluster, values]) => ({
    cluster,
    avg: values.reduce((sum, value) => sum + value, 0) / values.length
  }));

  const globalAverage = clusterAverages.length
    ? clusterAverages.reduce((sum, item) => sum + item.avg, 0) / clusterAverages.length
    : 0;

  const adjustments = new Map();
  clusterAverages.forEach(({ cluster, avg }) => {
    const dominance = Math.max(0, avg - globalAverage * 1.14);
    const penalty = Math.min(0.14, dominance * 0.34);
    adjustments.set(cluster, Number(penalty.toFixed(4)));
  });

  return adjustments;
}

export function computeConfidence(state) {
  const avgSignal = state.confidenceSignals.length
    ? state.confidenceSignals.reduce((a, b) => a + b, 0) / state.confidenceSignals.length
    : 0.65;
  const contradictionDrag = state.contradictions.reduce((a, b) => a + b.severity, 0);
  const answered = state.selectedQuestionIds.length;
  const densityBoost = Math.min(0.15, answered / 100);
  const factor = Math.max(0.72, Math.min(1.04, avgSignal + densityBoost - contradictionDrag));
  let level = "medium";
  if (factor >= 0.95) level = "high";
  if (factor < 0.82) level = "low";
  return { factor, level };
}
