export const QUESTIONS = [
  {
    id: "q1",
    phase: "core",
    style: "broad",
    type: "single",
    prompt: "Co tě v dlouhodobém projektu přirozeně táhne nejvíc?",
    hint: "Vyber variantu, kterou bys nejspíš chtěl držet jako svoji hlavní roli.",
    options: [
      { id: "a", label: "zlepšit systém nebo proces, aby fungoval efektivněji", effects: { systematic_thinking: 0.9, optimization_drive: 1.0, practical_impact: 0.45 } },
      { id: "b", label: "vymyslet strategii, jak dosáhnout co nejlepšího výsledku", effects: { strategic_thinking: 1.0, organizational_drive: 0.55, practical_impact: 0.5 } },
      { id: "c", label: "vyjednat směr, obhájit názor a pracovat s pravidly", effects: { argumentation: 0.95, institutional_interest: 0.75, presentation_energy: 0.35 } },
      { id: "d", label: "vytvořit originální koncept, sdělení nebo styl", effects: { creative_expression: 1.0, aesthetic_sensitivity: 0.45, language_sensitivity: 0.35 } }
    ]
  },
  {
    id: "q2",
    phase: "core",
    style: "broad",
    type: "ranked",
    prompt: "Seřaď podle toho, co je pro tebe při studiu nejdůležitější.",
    hint: "Nahoře = nejvíc, dole = nejméně.",
    options: [
      { id: "a", label: "praktický dopad a použitelnost", effects: { practical_impact: 1.0 } },
      { id: "b", label: "intelektuální hloubka a porozumění", effects: { theory_tolerance: 1.0, ambiguity_tolerance: 0.35 } },
      { id: "c", label: "strategie, výsledek a rozhodování", effects: { strategic_thinking: 1.0, organizational_drive: 0.35 } },
      { id: "d", label: "vyjádření, styl a originalita", effects: { creative_expression: 1.0, aesthetic_sensitivity: 0.35 } }
    ]
  },
  {
    id: "q3",
    phase: "core",
    style: "discriminative",
    type: "pairwise",
    prompt: "Co by tě méně frustrovalo?",
    hint: "Posuvník určuje, ke které straně máš blíž.",
    left: { label: "jasně strukturovaný problém s jedním dobrým řešením", effects: { structure_need: 1.0, systematic_thinking: 0.55 } },
    right: { label: "otevřený problém s více obhajitelnými interpretacemi", effects: { ambiguity_tolerance: 1.0, theory_tolerance: 0.55 } }
  },
  {
    id: "q4",
    phase: "core",
    style: "discriminative",
    type: "single",
    prompt: "Který typ výstupu by tě dlouhodobě bavil nejvíc?",
    options: [
      { id: "a", label: "návrh systému, procesu nebo nástroje", effects: { systematic_thinking: 0.9, optimization_drive: 0.75 } },
      { id: "b", label: "rozbor investice, rizika nebo hodnoty", effects: { financial_orientation: 0.95, risk_evaluation: 0.85, strategic_thinking: 0.3 } },
      { id: "c", label: "obhajoba názoru na pravidla, moc nebo společnost", effects: { argumentation: 0.9, institutional_interest: 0.8, global_orientation: 0.25 } },
      { id: "d", label: "vlastní kreativní nebo interpretační výstup", effects: { creative_expression: 0.9, text_orientation: 0.4, aesthetic_sensitivity: 0.35 } }
    ]
  },
  {
    id: "q5",
    phase: "core",
    style: "discriminative",
    type: "single",
    prompt: "Když narazíš na komplikovaný problém, co je ti nejbližší?",
    options: [
      { id: "a", label: "rozložit ho na části a najít funkční architekturu", effects: { systematic_thinking: 1.0, optimization_drive: 0.55 } },
      { id: "b", label: "vybrat nejlepší strategii a ohlídat výsledek", effects: { strategic_thinking: 1.0, organizational_drive: 0.45, practical_impact: 0.35 } },
      { id: "c", label: "zvážit, co je správné, obhajitelné a legitimní", effects: { ethics_orientation: 0.7, argumentation: 0.7, institutional_interest: 0.55 } },
      { id: "d", label: "hledat nové úhly, významy a interpretace", effects: { ambiguity_tolerance: 0.85, creative_expression: 0.5, cultural_curiosity: 0.35 } }
    ]
  },
  {
    id: "q6",
    phase: "core",
    style: "aversion",
    type: "single",
    prompt: "Co by tě nejspíš vyčerpávalo nejvíc?",
    options: [
      { id: "a", label: "dlouhé nejasné interpretace bez jasného výstupu", effects: { ambiguity_tolerance: -0.8, structure_need: 0.35 } },
      { id: "b", label: "technické nebo systémové detaily", effects: { systematic_thinking: -0.8, optimization_drive: -0.5 } },
      { id: "c", label: "časté veřejné vystupování a obhajoba před lidmi", effects: { presentation_energy: -0.8, people_orientation: -0.35 } },
      { id: "d", label: "rozhodování podle hodnoty, rizika a výsledku", effects: { financial_orientation: -0.65, risk_evaluation: -0.6, strategic_thinking: -0.25 } }
    ]
  },
  {
    id: "q7",
    phase: "core",
    style: "broad",
    type: "single",
    prompt: "Co tě tematicky táhne nejvíc?",
    options: [
      { id: "a", label: "technologie, systémy a jejich fungování", effects: { systematic_thinking: 0.8, optimization_drive: 0.7, quant_reasoning: 0.25 } },
      { id: "b", label: "trh, hodnota, růst a rozhodování", effects: { financial_orientation: 0.85, strategic_thinking: 0.55, risk_evaluation: 0.45 } },
      { id: "c", label: "moc, pravidla, stát a světové dění", effects: { institutional_interest: 0.9, global_orientation: 0.65, argumentation: 0.35 } },
      { id: "d", label: "kultura, jazyk, média a význam", effects: { cultural_curiosity: 0.75, language_sensitivity: 0.45, media_sensitivity: 0.35, text_orientation: 0.3 } }
    ]
  },
  {
    id: "q8",
    phase: "core",
    style: "confidence",
    type: "confidence",
    prompt: "Nakolik si zatím věříš, že odpovídáš podle sebe a ne podle toho, co zní dobře?",
    hint: "Tohle ovlivní confidence skóre, ne samotný obsah profilu."
  },
  {
    id: "q9",
    phase: "adaptive",
    branchTags: ["systems", "business"],
    style: "discriminative",
    type: "pairwise",
    prompt: "Co tě láká víc?",
    left: { label: "navrhnout lepší systém nebo informační řešení", effects: { systematic_thinking: 0.9, optimization_drive: 0.8, practical_impact: 0.35 } },
    right: { label: "udělat lepší rozhodnutí s vyšší hodnotou nebo výnosem", effects: { financial_orientation: 0.8, risk_evaluation: 0.7, strategic_thinking: 0.65 } }
  },
  {
    id: "q10",
    phase: "adaptive",
    branchTags: ["institutions", "business"],
    style: "discriminative",
    type: "single",
    prompt: "Co zní přirozeněji jako tvoje silná stránka?",
    options: [
      { id: "a", label: "rozumět pravidlům, institucím a jejich dopadu", effects: { institutional_interest: 0.85, argumentation: 0.55 } },
      { id: "b", label: "vyhodnotit příležitost, strategii a výsledek", effects: { strategic_thinking: 0.85, financial_orientation: 0.4, organizational_drive: 0.35 } },
      { id: "c", label: "pochopit chování lidí a motivaci skupin", effects: { people_orientation: 0.8, ethics_orientation: 0.25 } },
      { id: "d", label: "pracovat s významem, jazykem nebo interpretací", effects: { language_sensitivity: 0.8, text_orientation: 0.55 } }
    ]
  },
  {
    id: "q11",
    phase: "adaptive",
    branchTags: ["text", "institutions", "humanities"],
    style: "validation",
    type: "pairwise",
    prompt: "Co bys radši dělal celý semestr?",
    left: { label: "přesné čtení textů, argumentů a pravidel", effects: { text_orientation: 0.75, argumentation: 0.55, institutional_interest: 0.35 } },
    right: { label: "otevřenou interpretaci významu, kultury a souvislostí", effects: { ambiguity_tolerance: 0.75, cultural_curiosity: 0.55, theory_tolerance: 0.35 } }
  },
  {
    id: "q12",
    phase: "adaptive",
    branchTags: ["systems", "business", "institutions"],
    style: "validation",
    type: "single",
    prompt: "Kdybys měl udělat semestrální projekt, co by tě bavilo nejvíc?",
    options: [
      { id: "a", label: "model zlepšení procesu nebo systému", effects: { systematic_thinking: 0.8, optimization_drive: 0.65 } },
      { id: "b", label: "case study rozhodnutí, hodnoty nebo investice", effects: { risk_evaluation: 0.8, financial_orientation: 0.65, strategic_thinking: 0.35 } },
      { id: "c", label: "analýza pravidel, institucí nebo moci", effects: { institutional_interest: 0.85, argumentation: 0.55 } },
      { id: "d", label: "kulturní nebo mediální interpretace", effects: { cultural_curiosity: 0.75, media_sensitivity: 0.4, ambiguity_tolerance: 0.3 } }
    ]
  },
  {
    id: "q13",
    phase: "adaptive",
    branchTags: ["presentation", "people", "business"],
    style: "discriminative",
    type: "single",
    prompt: "V jaké roli bys pravděpodobně působil nejpřesvědčivěji?",
    options: [
      { id: "a", label: "prezentující a obhajující řešení před lidmi", effects: { presentation_energy: 0.9, argumentation: 0.45, people_orientation: 0.3 } },
      { id: "b", label: "architekt systému nebo procesu v pozadí", effects: { systematic_thinking: 0.9, structure_need: 0.35 } },
      { id: "c", label: "strateg, který vyhodnocuje varianty a riziko", effects: { strategic_thinking: 0.8, risk_evaluation: 0.55 } },
      { id: "d", label: "interpret, který dává věcem význam a rámec", effects: { text_orientation: 0.65, ambiguity_tolerance: 0.45, cultural_curiosity: 0.35 } }
    ]
  },
  {
    id: "q14",
    phase: "adaptive",
    branchTags: ["history", "culture", "global"],
    style: "broad",
    type: "single",
    prompt: "Která vrstva souvislostí tě zajímá nejvíc?",
    options: [
      { id: "a", label: "historický vývoj a dlouhé dějiny", effects: { historical_interest: 0.95, theory_tolerance: 0.2 } },
      { id: "b", label: "kultury, identity a významy", effects: { cultural_curiosity: 0.85, people_orientation: 0.35 } },
      { id: "c", label: "státy, instituce a mezinárodní svět", effects: { global_orientation: 0.85, institutional_interest: 0.55 } },
      { id: "d", label: "trhy, hodnota a reálné rozhodování", effects: { financial_orientation: 0.75, practical_impact: 0.35, strategic_thinking: 0.3 } }
    ]
  },
  {
    id: "q15",
    phase: "adaptive",
    branchTags: ["final_validation"],
    style: "confidence",
    type: "confidence",
    prompt: "Nakolik ti průběžně dává smysl, kam se quiz profilově ubírá?",
    hint: "Použito pro finální confidence a případný warning o nízké jistotě."
  }
];
