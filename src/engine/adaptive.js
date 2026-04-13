import { QUESTIONS } from "../data/questions.js";

function inferBranchScores(traits) {
  return {
    systems: (traits.systematic_thinking + traits.optimization_drive + traits.quant_reasoning) / 3,
    business: (traits.strategic_thinking + traits.financial_orientation + traits.risk_evaluation + traits.organizational_drive) / 4,
    institutions: (traits.institutional_interest + traits.argumentation + traits.global_orientation) / 3,
    humanities: (traits.text_orientation + traits.cultural_curiosity + traits.theory_tolerance + traits.ambiguity_tolerance) / 4,
    presentation: (traits.presentation_energy + traits.people_orientation) / 2,
    text: (traits.text_orientation + traits.language_sensitivity) / 2,
    history: (traits.historical_interest + traits.cultural_curiosity) / 2,
    people: (traits.people_orientation + traits.ethics_orientation) / 2
  };
}

export function getQuestionPlan(state) {
  const core = QUESTIONS.filter((q) => q.phase === "core");
  const adaptive = QUESTIONS.filter((q) => q.phase === "adaptive");
  const answered = new Set(state.selectedQuestionIds);

  const remainingCore = core.filter((q) => !answered.has(q.id));
  if (remainingCore.length) return remainingCore[0];

  const branchScores = inferBranchScores(state.traits);
  const sortedBranches = Object.entries(branchScores).sort((a, b) => b[1] - a[1]).map(([key]) => key);

  const candidatePool = adaptive
    .filter((q) => !answered.has(q.id))
    .map((q) => {
      const relevance = (q.branchTags || []).reduce((sum, tag) => sum + (sortedBranches.includes(tag) ? Math.max(0, 1 - sortedBranches.indexOf(tag) * 0.2) : 0), 0);
      return { q, relevance };
    })
    .sort((a, b) => b.relevance - a.relevance);

  return candidatePool[0]?.q || null;
}
