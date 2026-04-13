const CS = {
  brandEyebrow: 'Academic Vanguard',
  restart: 'Restart',
  heroBadge: 'Pruvodce vyberem predmetu',
  heroTitle: 'Najdi predmety, ktere ti sednou profilem i stylem prace.',
  heroSubtitle: 'Kratky adaptivni quiz vytahne tvoje dominantni preference a doporuci nejlepsi smery.',
  features: [
    '24 dimenzi profilu',
    'vice typu otazek: single, ranked, pairwise, aversion, confidence',
    'adaptivni vyber dalsi otazky podle informacni hodnoty',
    'podslozky vysledku: interest, aptitude, motivation, work-style',
    'penalizace rozporu a anti-fit faktoru',
    'confidence scoring a narativni vysvetleni'
  ],
  start: 'Zacit quiz',
  durationNote: 'Zabere cca 5 minut',
  pullQuote: '"Nejde o zavazne rozhodnuti, ale o doporuceni pro tvuj dalsi rozvoj."',
  resultsEyebrow: 'Vysledek',
  resultsTitle: 'Tvoje nejsilnejsi doporuceni',
  resultModeLabel: 'Rezim',
  modeBalanced: 'Balanced fit',
  modeInterest: 'Interest fit',
  modeStrength: 'Strength fit',
  modeCareer: 'Career utility fit',
  debugTitle: 'Debug / diagnostika',
  back: 'Zpet',
  next: 'Pokracovat',
  chooseAnswerAlert: 'Nejdriv vyber odpoved.',
  questionPrefix: 'Otazka',
  interpretationLabel: 'Interpretace',
  clustersTitle: 'Silne clustery',
  conflictTitle: 'Konflikty a jistota',
  noContradictions: 'Bez vyraznych rozporu.',
  confidenceSignals: 'Confidence signaly',
  noSignals: 'zadne',
  profileTitle: 'Dominantni profil',
  whyNotTitle: 'Proc ne jine smery',
  debugAnswered: 'Odpovezeno',
  debugTopTraits: 'Top traits',
  debugTopRanking: 'Top ranking',
  metricInterest: 'Interest fit',
  metricAptitude: 'Aptitude fit',
  metricWorkStyle: 'Work-style fit',
  metricMotivation: 'Motivation fit',
  confidenceLabel: 'Confidence'
};

const EN = {
  ...CS,
  heroBadge: 'Course selection guide',
  heroTitle: 'Find courses that match your profile and way of working.',
  heroSubtitle: 'A short adaptive quiz identifies your strongest preferences and recommends the best-fit directions.',
  features: [
    '24 profile dimensions',
    'multiple question types: single, ranked, pairwise, aversion, confidence',
    'adaptive next-question selection based on information value',
    'result components: interest, aptitude, motivation, work-style',
    'contradiction and anti-fit penalties',
    'confidence scoring and narrative explanation'
  ],
  start: 'Start quiz',
  durationNote: 'Takes about 5 minutes',
  pullQuote: '"This is not a binding decision, but a recommendation for your next development step."',
  resultsEyebrow: 'Result',
  resultsTitle: 'Your strongest recommendations',
  resultModeLabel: 'Mode',
  debugTitle: 'Debug / diagnostics',
  back: 'Back',
  next: 'Continue',
  chooseAnswerAlert: 'Pick an answer first.',
  questionPrefix: 'Question',
  interpretationLabel: 'Interpretation',
  clustersTitle: 'Strong clusters',
  conflictTitle: 'Conflicts and confidence',
  noContradictions: 'No major contradictions.',
  confidenceSignals: 'Confidence signals',
  noSignals: 'none',
  profileTitle: 'Dominant profile',
  whyNotTitle: 'Why not other paths',
  debugAnswered: 'Answered',
  metricWorkStyle: 'Work style fit',
  confidenceLabel: 'Confidence'
};

export const UI_STRINGS = { cs: CS, en: EN };

export const EN_QUESTION_TEXT = {
  q1: {
    prompt: 'In a long-term project, what naturally pulls you the most?',
    hint: 'Pick the option you would most likely keep as your main role.',
    options: {
      a: 'improve a system or process so it works more efficiently',
      b: 'design a strategy to reach the best possible outcome',
      c: 'negotiate direction, defend a position, and work with rules',
      d: 'create an original concept, message, or style'
    }
  },
  q2: {
    prompt: 'Rank what matters most to you when studying.',
    hint: 'Top = most important, bottom = least important.',
    options: {
      a: 'practical impact and usability',
      b: 'intellectual depth and understanding',
      c: 'strategy, outcome, and decision-making',
      d: 'expression, style, and originality'
    }
  },
  q3: {
    prompt: 'What would frustrate you less?',
    hint: 'The slider shows which side you lean toward.',
    left: 'a clearly structured problem with one strong solution',
    right: 'an open problem with multiple defensible interpretations'
  },
  q4: {
    prompt: 'Which output type would you enjoy most in the long run?',
    options: {
      a: 'design of a system, process, or tool',
      b: 'analysis of investment, risk, or value',
      c: 'defense of opinions about rules, power, or society',
      d: 'your own creative or interpretive output'
    }
  },
  q5: {
    prompt: 'When you face a complex problem, what is closest to your style?',
    options: {
      a: 'break it down and design a working architecture',
      b: 'choose the best strategy and secure the outcome',
      c: 'evaluate what is right, defensible, and legitimate',
      d: 'seek new angles, meanings, and interpretations'
    }
  },
  q6: {
    prompt: 'What would most likely drain you the most?',
    options: {
      a: 'long unclear interpretation without clear output',
      b: 'technical or system details',
      c: 'frequent public speaking and defending ideas in front of people',
      d: 'decision-making based on value, risk, and outcomes'
    }
  },
  q7: {
    prompt: 'Which topic area pulls you the most?',
    options: {
      a: 'technology, systems, and how they work',
      b: 'markets, value, growth, and decision-making',
      c: 'power, rules, state, and world affairs',
      d: 'culture, language, media, and meaning'
    }
  },
  q8: {
    prompt: 'How confident are you that you answer based on yourself and not what sounds good?',
    hint: 'This affects confidence score, not profile content.'
  },
  q9: {
    prompt: 'What attracts you more?',
    left: 'design a better system or information solution',
    right: 'make a better decision with higher value or return'
  },
  q10: {
    prompt: 'What sounds more like your natural strength?',
    options: {
      a: 'understanding rules, institutions, and their impact',
      b: 'evaluating opportunity, strategy, and outcome',
      c: 'understanding people behavior and group motivation',
      d: 'working with meaning, language, or interpretation'
    }
  },
  q11: {
    prompt: 'What would you rather do for a whole semester?',
    left: 'precise reading of texts, arguments, and rules',
    right: 'open interpretation of meaning, culture, and context'
  },
  q12: {
    prompt: 'If you had to do a semester project, what would you enjoy most?',
    options: {
      a: 'model for improving a process or system',
      b: 'case study of decision-making, value, or investment',
      c: 'analysis of rules, institutions, or power',
      d: 'cultural or media interpretation'
    }
  },
  q13: {
    prompt: 'In which role would you likely be most convincing?',
    options: {
      a: 'presenting and defending solutions in front of people',
      b: 'system or process architect behind the scenes',
      c: 'strategist evaluating options and risk',
      d: 'interpreter giving things meaning and frame'
    }
  },
  q14: {
    prompt: 'Which layer of context interests you the most?',
    options: {
      a: 'historical development and long-term history',
      b: 'cultures, identities, and meanings',
      c: 'states, institutions, and the international world',
      d: 'markets, value, and practical decision-making'
    }
  },
  q15: {
    prompt: 'How much sense does the direction of the quiz currently make to you?',
    hint: 'Used for final confidence and a possible low-confidence warning.'
  }
};

export function getUiStrings(locale) {
  return UI_STRINGS[locale] || UI_STRINGS.cs;
}

export function localizeQuestion(question, locale) {
  if (locale !== 'en') return question;
  const translated = EN_QUESTION_TEXT[question.id];
  if (!translated) return question;

  const localized = structuredClone(question);
  if (translated.prompt) localized.prompt = translated.prompt;
  if (translated.hint !== undefined) localized.hint = translated.hint;

  if (translated.options && Array.isArray(localized.options)) {
    localized.options = localized.options.map((option) => ({
      ...option,
      label: translated.options[option.id] || option.label
    }));
  }

  if (localized.left && translated.left) localized.left.label = translated.left;
  if (localized.right && translated.right) localized.right.label = translated.right;

  return localized;
}
