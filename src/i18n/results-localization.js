import { TRAIT_LABELS } from '../data/traits.js';

const SUBJECT_LOCALIZATION = {
  anthropology: {
    csName: 'Antropologie',
    enName: 'Anthropology',
    csWhyNot: 'Bývá níž, pokud tě dlouhodobě naplňuje hlavně formální modelování, číselná optimalizace nebo čistě technický provoz.',
    enWhyNot: 'It is usually lower if you are mainly energized by formal modeling, numerical optimization, or purely technical operations.',
    csFit: 'Sedí lidem, kteří umí číst kulturní vzorce v chování lidí i institucí.',
    enFit: 'It suits people who can read cultural patterns in human and institutional behavior.'
  },
  art_architecture: {
    csName: 'Umění a architektura',
    enName: 'Art and Architecture',
    csWhyNot: 'Klesá u profilů, které víc táhne optimalizace, výkon a systémy než vizuální a estetická práce.',
    enWhyNot: 'It tends to be weaker for profiles drawn more to optimization, performance, and systems than to visual and aesthetic work.',
    csFit: 'Táhne lidi s vizuálním a estetickým cítěním.',
    enFit: 'It attracts people with visual and aesthetic sensitivity.'
  },
  classical_studies: {
    csName: 'Starověké a klasické studie',
    enName: 'Classical Studies',
    csWhyNot: 'Mívá slabší prioritu, pokud potřebuješ hlavně okamžitý operativní dopad a minimum delší textové analýzy.',
    enWhyNot: 'It tends to be lower if you mainly need immediate operational impact and minimal long-form textual analysis.',
    csFit: 'Sedí lidem, kteří skládají minulost z pramenů, pojmů a souvislostí.',
    enFit: 'It fits people who reconstruct the past from sources, concepts, and context.'
  },
  creative_writing: {
    csName: 'Tvůrčí psaní',
    enName: 'Creative Writing',
    csWhyNot: 'Bývá slabší volba pro lidi, kteří chtějí hlavně strukturu, systém a funkční řešení.',
    enWhyNot: 'It is often a weaker option for people who mainly want structure, systems, and functional solutions.',
    csFit: 'Potřebuje silnou chuť tvořit a pracovat s jazykem.',
    enFit: 'It requires a strong desire to create and work with language.'
  },
  economics_finance: {
    csName: 'Ekonomie, finance a ekonometrie',
    enName: 'Economics, Finance, and Econometrics',
    csWhyNot: 'Může být slabší pro někoho, koho nebaví práce s čísly a modely a má radši čistě slovní nebo kreativní styl.',
    enWhyNot: 'It may be weaker for someone who does not enjoy working with numbers and models and prefers a purely verbal or creative style.',
    csFit: 'Sedí profilům s čísly, financemi a rozhodováním.',
    enFit: 'It fits profiles oriented toward numbers, finance, and decision-making.'
  },
  environment_engineering: {
    csName: 'Environmentální inženýrství',
    enName: 'Environmental Engineering',
    csWhyNot: 'Klesá, pokud profil nechce řešit systémy nebo technické kompromisy.',
    enWhyNot: 'It becomes weaker if the profile does not want to deal with systems or technical trade-offs.',
    csFit: 'Spojuje technické myšlení s praktickým dopadem.',
    enFit: 'It combines technical thinking with practical impact.'
  },
  film_media: {
    csName: 'Film a média',
    enName: 'Film and Media',
    csWhyNot: 'Není ideální pro někoho, kdo chce hlavně přesné problémy a rozhodování přes systém nebo čísla.',
    enWhyNot: 'It is not ideal for someone who mainly wants precise problems and decision-making through systems or numbers.',
    csFit: 'Hodí se pro mediální, vizuální a interpretační profil.',
    enFit: 'It suits a media-oriented, visual, and interpretive profile.'
  },
  language_linguistics: {
    csName: 'Řeč a jazykověda',
    enName: 'Language and Linguistics',
    csWhyNot: 'Může klesat, pokud nechceš pracovat s jazykovým detailem a preferuješ převážně rychlá rozhodnutí bez textu.',
    enWhyNot: 'It may drop if you do not want to work with linguistic detail and prefer mostly fast decisions without text.',
    csFit: 'Spojuje detailní cit pro jazyk s analytickou prací nad strukturou řeči.',
    enFit: 'It combines fine-grained language sensitivity with analytical work on language structure.'
  },
  world_literature: {
    csName: 'Světová literatura',
    enName: 'World Literature',
    csWhyNot: 'Mívá nižší prioritu, pokud tě dlouhodobě drží hlavně procesní optimalizace a minimální práce s textem.',
    enWhyNot: 'It tends to be lower when you are mainly driven by process optimization and minimal text work.',
    csFit: 'Silný fit pro dlouhodobé čtení textů v kulturním a historickém kontextu.',
    enFit: 'A strong fit for long-form reading in cultural and historical context.'
  },
  law: {
    csName: 'Právo',
    enName: 'Law',
    csWhyNot: 'Může ztrácet, pokud profil nemá rád textovou práci, přesnost a práci s pravidly.',
    enWhyNot: 'It can lose strength if the profile does not like text-based work, precision, and working with rules.',
    csFit: 'Sedí lidem se silnou argumentací a zájmem o pravidla a instituce.',
    enFit: 'It fits people with strong argumentation and an interest in rules and institutions.'
  },
  management_business: {
    csName: 'Řízení a podnikání',
    enName: 'Management and Business',
    csWhyNot: 'Slábne, pokud člověk nechce rozhodovat, organizovat a tlačit věci do praxe.',
    enWhyNot: 'It becomes weaker if the person does not want to make decisions, organize things, and push them into practice.',
    csFit: 'Vyhovuje lidem, které baví strategie, řízení a výsledek.',
    enFit: 'It suits people who enjoy strategy, management, and results.'
  },
  human_resources: {
    csName: 'Lidské zdroje a řízení organizace',
    enName: 'Human Resources and Organization Management',
    csWhyNot: 'Není ideální pro profil, který chce spíš systémy, technologie a méně sociálního vyjednávání.',
    enWhyNot: 'It is not ideal for a profile that prefers systems and technology and less social negotiation.',
    csFit: 'Stojí víc na práci s lidmi a fungování organizace.',
    enFit: 'It relies more on working with people and how an organization functions.'
  },
  music: {
    csName: 'Hudba',
    enName: 'Music',
    csWhyNot: 'Bývá níž u profilů, které dlouhodobě preferují hlavně procesní kontrolu, formální modely a minimální estetickou složku práce.',
    enWhyNot: 'It is usually lower for profiles that long-term prefer process control, formal models, and minimal aesthetic work.',
    csFit: 'Sedí profilům s hudební představivostí, rytmickým citem a potřebou výrazu.',
    enFit: 'It suits profiles with musical imagination, rhythmic sensitivity, and a need for expression.'
  },
  philosophy: {
    csName: 'Filosofie',
    enName: 'Philosophy',
    csWhyNot: 'Často ztrácí u profilů, které chtějí rychlé využití, jasný výkon a přímý užitek.',
    enWhyNot: 'It often loses fit with profiles that want quick use, clear performance, and direct benefit.',
    csFit: 'Sedí lidem, kteří snesou abstrakci, argumentaci a otevřené otázky.',
    enFit: 'It fits people who are comfortable with abstraction, argumentation, and open questions.'
  },
  political_social_theory: {
    csName: 'Státní politika a společenskovědní teorie',
    enName: 'Political and Social Theory',
    csWhyNot: 'Bývá méně vhodný pro profil, který chce spíš tvrdě praktický nebo technický výstup.',
    enWhyNot: 'It is often less suitable for a profile that prefers a strongly practical or technical output.',
    csFit: 'Kombinuje zájem o moc, společnost a teoretické souvislosti.',
    enFit: 'It combines an interest in power, society, and theoretical context.'
  },
  politics_ir: {
    csName: 'Politika a mezinárodní vztahy',
    enName: 'Politics and International Relations',
    csWhyNot: 'Může být slabší, pokud člověk nechce instituce, geopolitiku a argumentační rámce.',
    enWhyNot: 'It may be weaker if the person is not interested in institutions, geopolitics, and argumentative frameworks.',
    csFit: 'Sedí lidem se zájmem o stát, světové dění a vliv.',
    enFit: 'It fits people interested in the state, world affairs, and influence.'
  },
  psychology_cognitive: {
    csName: 'Psychologie a poznávací vědy',
    enName: 'Psychology and Cognitive Science',
    csWhyNot: 'Klesá, pokud nechceš systematicky sledovat chování lidí ani pracovat s interpretací dat a vzorců.',
    enWhyNot: 'It drops if you do not want to systematically study human behavior or work with interpreted data patterns.',
    csFit: 'Kombinuje práci s lidským chováním, hypotézami a analytickým ověřováním.',
    enFit: 'It combines human behavior work with hypotheses and analytical validation.'
  },
  public_speaking: {
    csName: 'Řečnictví',
    enName: 'Public Speaking',
    csWhyNot: 'Klesá, pokud člověk nechce stát před lidmi nebo ho víc baví systémy než veřejné vystupování.',
    enWhyNot: 'It becomes weaker if the person does not want to stand in front of people or enjoys systems more than public speaking.',
    csFit: 'Hodně stojí na mluvení, argumentaci a pohodě před lidmi.',
    enFit: 'It strongly relies on speaking, argumentation, and comfort in front of people.'
  },
  real_estate_investment: {
    csName: 'Nemovitosti a investice',
    enName: 'Real Estate and Investment',
    csWhyNot: 'Méně sedí těm, kdo nemají vztah k hodnotě, riziku a finančnímu rozhodování.',
    enWhyNot: 'It fits less well for those who do not relate to value, risk, and financial decision-making.',
    csFit: 'Hodí se pro hodnotové, investiční a rozhodovací myšlení.',
    enFit: 'It suits value-focused, investment-oriented, and decision-driven thinking.'
  },
  sociology_cultural: {
    csName: 'Sociologie a kulturní studia',
    enName: 'Sociology and Cultural Studies',
    csWhyNot: 'Mívá nižší prioritu, pokud chceš pracovat téměř výhradně s technickým řešením a minimem sociálního kontextu.',
    enWhyNot: 'It tends to be lower when you prefer almost exclusively technical solutions with minimal social context.',
    csFit: 'Silný fit pro analýzu společnosti, norem a kulturních změn.',
    enFit: 'A strong fit for analyzing society, norms, and cultural change.'
  },
  technology_information_systems: {
    csName: 'Technika a informační soustavy',
    enName: 'Technology and Information Systems',
    csWhyNot: 'Slábne, pokud člověk potřebuje hlavně sebevyjádření, textový výklad nebo práci s kulturou.',
    enWhyNot: 'It becomes weaker if the person mainly needs self-expression, text interpretation, or work with culture.',
    csFit: 'Silný fit pro systémové, technické a optimalizační profily.',
    enFit: 'A strong fit for system-oriented, technical, and optimization-driven profiles.'
  },
  translation_interpretation: {
    csName: 'Tlumočení a překlad',
    enName: 'Translation and Interpretation',
    csWhyNot: 'Mívá nižší prioritu, pokud tě dlouhodobě víc nabíjí čistě procesní optimalizace nebo finanční rozhodování bez jazykové práce.',
    enWhyNot: 'It tends to be lower if you are more energized by pure process optimization or finance decisions without language work.',
    csFit: 'Stojí na přesném převodu významu, tónu a kulturního kontextu.',
    enFit: 'It is built on precise transfer of meaning, tone, and cultural context.'
  }
};

const CLUSTER_LOCALIZATION = {
  'Systems / Technology': { cs: 'Systémy / technologie', en: 'Systems / Technology' },
  'Business / Applied Decision': { cs: 'Byznys / praktické rozhodování', en: 'Business / Applied decision-making' },
  'Business / Asset Decision': { cs: 'Byznys / investice a aktiva', en: 'Business / Investment and assets' },
  'Business / Quant': { cs: 'Byznys / čísla a finance', en: 'Business / Quantitative finance' },
  'Society / Culture': { cs: 'Společnost / kultura', en: 'Society / Culture' },
  'Creative / Visual': { cs: 'Tvorba / vizuál', en: 'Creative / Visual' },
  'Creative / Language': { cs: 'Tvorba / jazyk', en: 'Creative / Language' },
  'Creative / Media': { cs: 'Tvorba / média', en: 'Creative / Media' },
  'Creative / Performance': { cs: 'Tvorba / vystupování', en: 'Creative / Performance' },
  'Humanities / History': { cs: 'Humanitní obory / historie', en: 'Humanities / History' },
  'Humanities / Language': { cs: 'Humanitní obory / jazyk', en: 'Humanities / Language' },
  'Language / Analysis': { cs: 'Jazyk / analýza', en: 'Language / Analysis' },
  'Language / Communication': { cs: 'Jazyk / komunikace', en: 'Language / Communication' },
  'Institutions / Argumentation': { cs: 'Instituce / argumentace', en: 'Institutions / Argumentation' },
  'Politics / Theory': { cs: 'Politika / teorie', en: 'Politics / Theory' },
  'Politics / Institutions': { cs: 'Politika / instituce', en: 'Politics / Institutions' },
  'Mind / Analysis': { cs: 'Mysl / analýza', en: 'Mind / Analysis' },
  'People / Organization': { cs: 'Lidé / organizace', en: 'People / Organization' },
  'Communication / Performance': { cs: 'Komunikace / vystupování', en: 'Communication / Performance' },
  'Ideas / Theory': { cs: 'Myšlenky / teorie', en: 'Ideas / Theory' },
  'Systems / Applied': { cs: 'Systémy / praxe', en: 'Systems / Applied' }
};

const TRAIT_LABELS_EN = {
  systematic_thinking: 'systematic thinking',
  optimization_drive: 'optimization',
  practical_impact: 'practical impact',
  strategic_thinking: 'strategic thinking',
  quant_reasoning: 'quantitative reasoning',
  structure_need: 'need for structure',
  creative_expression: 'creativity and expression',
  text_orientation: 'text-based work',
  language_sensitivity: 'language sensitivity',
  cultural_curiosity: 'cultural curiosity',
  people_orientation: 'people orientation',
  ambiguity_tolerance: 'tolerance for ambiguity',
  historical_interest: 'interest in history',
  theory_tolerance: 'tolerance for theory and abstraction',
  ethics_orientation: 'ethics and values orientation',
  aesthetic_sensitivity: 'aesthetic sensitivity',
  media_sensitivity: 'media sensitivity',
  institutional_interest: 'interest in rules and institutions',
  argumentation: 'argumentation',
  organizational_drive: 'organizing and leading',
  presentation_energy: 'energy for presenting',
  financial_orientation: 'interest in value and finance',
  risk_evaluation: 'risk evaluation',
  global_orientation: 'global orientation'
};

const CONTRADICTION_LABELS = {
  structure_vs_ambiguity: {
    cs: 'Silná potřeba struktury a zároveň vysoká tolerance otevřené nejasnosti.',
    en: 'Strong need for structure together with high tolerance for open ambiguity.'
  },
  anti_text_vs_text_preference: {
    cs: 'Silná argumentace a zájem o instituce, ale nízká ochota pracovat s textem.',
    en: 'Strong argumentation and institutional interest, but low willingness to work with text.'
  },
  practical_vs_pure_theory: {
    cs: 'Silný tah na okamžitý dopad i vysoká tolerance čisté teorie.',
    en: 'Strong pull toward immediate impact together with high tolerance for pure theory.'
  },
  creative_vs_hard_structure: {
    cs: 'Silná potřeba kreativity i velmi vysoké struktury.',
    en: 'Strong need for creativity together with very high structure.'
  }
};

const NARRATIVE_TEMPLATES = {
  cs: {
    title: '{topSubject} vychází nejvýš',
    dominant: 'Nejsilněji se u tebe skládá osa {trait1}, {trait2} a {trait3}.',
    motivePractical: 'Z odpovědí je vidět tah na výsledek, použitelnost a hodnotu, ne jen na zajímavost tématu.',
    motiveCreative: 'Silně se u tebe objevuje potřeba vyjádření, formy a práce s významem.',
    motiveInstitutions: 'Výrazně se ukazuje zájem o pravidla, moc, institucionální rámce a obhajobu názoru.',
    motiveMixed: 'Profil působí jako mix preferencí, ale s jasnými hlavními směry.',
    summary: 'Proto se nahoře drží hlavně {top1}, {top2} a {top3}. Nejde jen o tematický zájem, ale o kombinaci stylu přemýšlení, motivace a typu práce, který ti nejspíš sedí.',
    tensionPresent: 'V profilu se ale ukazuje i napětí: {contradictions}',
    tensionNone: 'Profil je celkově poměrně konzistentní a bez výrazných vnitřních rozporů.'
  },
  en: {
    title: '{topSubject} comes out on top',
    dominant: 'Your strongest profile is built around {trait1}, {trait2}, and {trait3}.',
    motivePractical: 'Your answers show a clear pull toward results, usefulness, and value, not just interesting topics.',
    motiveCreative: 'You show a strong need for expression, form, and working with meaning.',
    motiveInstitutions: 'There is a strong interest in rules, power, institutions, and defending a viewpoint.',
    motiveMixed: 'Your profile is a mix of preferences, but with clear main directions.',
    summary: 'That is why {top1}, {top2}, and {top3} stay at the top. This is not only about topic interest, but also about your thinking style, motivation, and the type of work that probably suits you.',
    tensionPresent: 'There is also some tension in your profile: {contradictions}',
    tensionNone: 'Overall, your profile is fairly consistent and does not show major internal conflicts.'
  }
};

function fillTemplate(template, vars) {
  return Object.entries(vars).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), template);
}

export function localizeCluster(cluster, locale) {
  const entry = CLUSTER_LOCALIZATION[cluster];
  if (!entry) return cluster;
  return entry[locale] || entry.cs;
}

export function getTraitLabel(traitKey, locale) {
  if (locale === 'en') return TRAIT_LABELS_EN[traitKey] || traitKey;
  return TRAIT_LABELS[traitKey] || traitKey;
}

export function localizeContradictions(contradictions, locale) {
  return contradictions.map((item) => {
    const localized = CONTRADICTION_LABELS[item.id]?.[locale] || item.label;
    return { ...item, label: localized };
  });
}

export function localizeRankedSubjects(rankedSubjects, locale) {
  return rankedSubjects.map((subject) => {
    const localized = SUBJECT_LOCALIZATION[subject.id] || {};
    return {
      ...subject,
      name: locale === 'en' ? localized.enName || subject.name : localized.csName || subject.name,
      cluster: localizeCluster(subject.cluster, locale),
      whyNot: locale === 'en' ? localized.enWhyNot || subject.whyNot : localized.csWhyNot || subject.whyNot,
      explanations: [locale === 'en' ? localized.enFit || subject.explanations?.[0] || '' : localized.csFit || subject.explanations?.[0] || '']
    };
  });
}

function buildMotiveLine(traits, locale) {
  const t = NARRATIVE_TEMPLATES[locale] || NARRATIVE_TEMPLATES.cs;
  if (traits.practical_impact > 0.72 && traits.financial_orientation > 0.62) return t.motivePractical;
  if (traits.creative_expression > 0.75 && traits.language_sensitivity > 0.6) return t.motiveCreative;
  if (traits.institutional_interest > 0.72 && traits.argumentation > 0.7) return t.motiveInstitutions;
  return t.motiveMixed;
}

export function buildLocalizedNarrative(state, rankedSubjects, locale) {
  const t = NARRATIVE_TEMPLATES[locale] || NARRATIVE_TEMPLATES.cs;
  const topTraits = Object.entries(state.traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, value]) => ({ key, value, label: getTraitLabel(key, locale).toLowerCase() }));

  const primary = rankedSubjects[0];
  const secondary = rankedSubjects[1];
  const tertiary = rankedSubjects[2];

  const contradictions = localizeContradictions(state.contradictions, locale);
  const dominant = fillTemplate(t.dominant, {
    trait1: topTraits[0]?.label || 'profil',
    trait2: topTraits[1]?.label || 'směr',
    trait3: topTraits[2]?.label || 'styl'
  });

  const summary = fillTemplate(t.summary, {
    top1: primary?.name || '-',
    top2: secondary?.name || '-',
    top3: tertiary?.name || '-'
  });

  const tension = contradictions.length
    ? fillTemplate(t.tensionPresent, { contradictions: contradictions.map((item) => item.label).join(' ') })
    : t.tensionNone;

  return {
    title: fillTemplate(t.title, { topSubject: primary?.name || '-' }),
    paragraphs: [
      `${dominant} ${buildMotiveLine(state.traits, locale)}`,
      summary,
      tension
    ],
    topTraits
  };
}
