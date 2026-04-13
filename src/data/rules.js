export const SCORING_MODES = {
  balanced: { interest: 0.28, aptitude: 0.26, workStyle: 0.18, motivation: 0.18, assessment: 0.10 },
  interest: { interest: 0.52, aptitude: 0.18, workStyle: 0.12, motivation: 0.12, assessment: 0.06 },
  strength: { interest: 0.14, aptitude: 0.50, workStyle: 0.14, motivation: 0.12, assessment: 0.10 },
  career: { interest: 0.12, aptitude: 0.18, workStyle: 0.16, motivation: 0.36, assessment: 0.18 }
};

export const CONTRADICTION_RULES = [
  {
    id: "structure_vs_ambiguity",
    when: (traits) => traits.structure_need > 0.7 && traits.ambiguity_tolerance > 0.7,
    severity: 0.07,
    label: "Silná potřeba struktury a zároveň vysoká tolerance otevřené nejasnosti."
  },
  {
    id: "anti_text_vs_text_preference",
    when: (traits) => traits.text_orientation < 0.2 && traits.argumentation > 0.7 && traits.institutional_interest > 0.7,
    severity: 0.06,
    label: "Silná argumentace a zájem o instituce, ale nízká ochota pracovat s textem."
  },
  {
    id: "practical_vs_pure_theory",
    when: (traits) => traits.practical_impact > 0.8 && traits.theory_tolerance > 0.8,
    severity: 0.04,
    label: "Silný tah na okamžitý dopad i vysoká tolerance čisté teorie."
  },
  {
    id: "creative_vs_hard_structure",
    when: (traits) => traits.creative_expression > 0.8 && traits.structure_need > 0.8,
    severity: 0.05,
    label: "Silná potřeba kreativity i velmi vysoké struktury."
  }
];

export const QUESTION_WEIGHTS = {
  broad: 1.0,
  discriminative: 1.1,
  validation: 0.75,
  aversion: 0.9,
  confidence: 0.65
};
