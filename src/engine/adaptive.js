import { QUESTIONS } from "../data/questions.js";

function inferBranchScores(traits) {
  const signal = toSignalTraits(traits);
  return {
    systems: (signal.systematic_thinking + signal.optimization_drive + signal.quant_reasoning) / 3,
    business: (signal.strategic_thinking + signal.financial_orientation + signal.risk_evaluation + signal.organizational_drive) / 4,
    institutions: (signal.institutional_interest + signal.argumentation + signal.global_orientation) / 3,
    humanities: (signal.text_orientation + signal.cultural_curiosity + signal.theory_tolerance + signal.ambiguity_tolerance) / 4,
    presentation: (signal.presentation_energy + signal.people_orientation) / 2,
    text: (signal.text_orientation + signal.language_sensitivity) / 2,
    history: (signal.historical_interest + signal.cultural_curiosity) / 2,
    people: (signal.people_orientation + signal.ethics_orientation) / 2
  };
}

function toSignalTraits(traits) {
  return Object.fromEntries(
    Object.entries(traits).map(([key, value]) => [key, Math.max(0, (value - 0.5) * 2)])
  );
}

export function getQuestionPlan(state) {
  const core = QUESTIONS.filter((q) => q.phase === "core");
  const adaptive = QUESTIONS.filter((q) => q.phase === "adaptive");
  const answered = new Set(state.selectedQuestionIds);

  const remainingCore = core.filter((q) => !answered.has(q.id));
  if (remainingCore.length) return remainingCore[0];

  const branchScores = inferBranchScores(state.traits);
  const sortedBranches = Object.entries(branchScores).sort((a, b) => b[1] - a[1]).map(([key]) => key);

  const askedAdaptive = adaptive.filter((q) => answered.has(q.id));
  const tagUsage = askedAdaptive.reduce((acc, question) => {
    (question.branchTags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const candidatePool = adaptive
    .filter((q) => !answered.has(q.id))
    .map((q) => {
      const relevance = (q.branchTags || []).reduce((sum, tag) => {
        if (!sortedBranches.includes(tag)) return sum;
        const rankBoost = Math.max(0.2, 1 - sortedBranches.indexOf(tag) * 0.2);
        const diversityBoost = 1 / (1 + (tagUsage[tag] || 0));
        return sum + rankBoost * diversityBoost;
      }, 0);
      return { q, relevance };
    })
    .sort((a, b) => b.relevance - a.relevance);

  return candidatePool[0]?.q || null;
}
