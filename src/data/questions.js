export const QUESTIONS = [
  {
    id: "q1",
    phase: "core",
    style: "broad",
    type: "single",
    prompt: "Když máš v týmu volnější projekt, kterou roli si přirozeně vezmeš?",
    hint: "Vyber činnost, u které bys vydržel i po prvním nadšení.",
    options: [
      { id: "a", label: "rozkreslit, jak celek funguje, a najít slabé místo v postupu", effects: { systematic_thinking: 0.72, optimization_drive: 0.68, structure_need: 0.28 } },
      { id: "b", label: "pozorovat, jak lidé spolupracují, a vychytat motivaci v týmu", effects: { people_orientation: 0.74, organizational_drive: 0.42, ethics_orientation: 0.28 } },
      { id: "c", label: "uhlídat přesnost formulací a význam napříč jazyky", effects: { language_sensitivity: 0.82, text_orientation: 0.62, cultural_curiosity: 0.28 } },
      { id: "d", label: "vymyslet podobu výstupu, aby měl styl, rytmus a silný dojem", effects: { creative_expression: 0.7, aesthetic_sensitivity: 0.74, media_sensitivity: 0.52, presentation_energy: 0.22 } }
    ]
  },
  {
    id: "q2",
    phase: "core",
    style: "broad",
    type: "ranked",
    prompt: "Seřaď, co tě při učení opravdu udrží ve flow.",
    hint: "Nahoře = nejvíc, dole = nejméně.",
    options: [
      { id: "a", label: "skládat obraz tématu z různých zdrojů a stop", effects: { historical_interest: 0.72, theory_tolerance: 0.46, text_orientation: 0.42 } },
      { id: "b", label: "pozorovat lidi a skupiny, hledat v nich opakující se vzorce", effects: { people_orientation: 0.74, cultural_curiosity: 0.5, systematic_thinking: 0.22 } },
      { id: "c", label: "navrhovat postup, který funguje i v reálném provozu", effects: { practical_impact: 0.66, optimization_drive: 0.5, strategic_thinking: 0.24 } },
      { id: "d", label: "pilovat formulaci, tón a přesnost významu", effects: { language_sensitivity: 0.78, text_orientation: 0.56, ambiguity_tolerance: 0.24 } }
    ]
  },
  {
    id: "q3",
    phase: "core",
    style: "broad",
    type: "pairwise",
    prompt: "Co by tě při semestrálním úkolu unavovalo méně?",
    hint: "Posuvník určuje, ke které straně máš blíž.",
    left: { label: "úkol s jasnými kritérii a průběžným testováním řešení", effects: { structure_need: 0.78, systematic_thinking: 0.52, quant_reasoning: 0.24 } },
    right: { label: "úkol, kde skládáš smysl z více výkladů a kontextů", effects: { ambiguity_tolerance: 0.78, theory_tolerance: 0.52, cultural_curiosity: 0.24 } }
  },
  {
    id: "q4",
    phase: "core",
    style: "discriminative",
    type: "single",
    prompt: "Který výstup by tě bavil dělat opakovaně i po několik týdnů?",
    options: [
      { id: "a", label: "diagnostika procesu a test, jestli navržené zlepšení funguje", effects: { systematic_thinking: 0.62, optimization_drive: 0.46, practical_impact: 0.5, ethics_orientation: 0.42, quant_reasoning: 0.22 } },
      { id: "b", label: "profil motivace týmu a návrh, jak rozdělit role", effects: { people_orientation: 0.72, organizational_drive: 0.62, ethics_orientation: 0.22 } },
      { id: "c", label: "kritické porovnání zdrojů a argumentů kolem sporného tématu", effects: { argumentation: 0.78, institutional_interest: 0.46, theory_tolerance: 0.34 } },
      { id: "d", label: "kurátorský koncept výstavy, playlistu nebo mediální série", effects: { aesthetic_sensitivity: 0.78, creative_expression: 0.56, media_sensitivity: 0.72, historical_interest: 0.24 } }
    ]
  },
  {
    id: "q5",
    phase: "core",
    style: "discriminative",
    type: "single",
    prompt: "Když narazíš na komplikovaný problém, kde začneš nejspíš hledat pevný bod?",
    options: [
      { id: "a", label: "v terénním pozorování lidí v odlišných prostředích", effects: { people_orientation: 0.72, cultural_curiosity: 0.54, ambiguity_tolerance: 0.36, theory_tolerance: 0.34, text_orientation: 0.3 } },
      { id: "b", label: "v modelu variant, kritériích a porovnání rizik", effects: { quant_reasoning: 0.74, risk_evaluation: 0.6, strategic_thinking: 0.38 } },
      { id: "c", label: "v přesném významu pojmů a formulaci napříč jazyky", effects: { language_sensitivity: 0.82, text_orientation: 0.66, argumentation: 0.24 } },
      { id: "d", label: "ve stavbě sdělení, které přesvědčí konkrétní publikum", effects: { presentation_energy: 0.74, argumentation: 0.5, creative_expression: 0.28 } }
    ]
  },
  {
    id: "q6",
    phase: "core",
    style: "aversion",
    type: "single",
    prompt: "Co by tě po pár týdnech nejspíš vyčerpávalo nejvíc?",
    options: [
      { id: "a", label: "dlouhé rozplétání významů bez jasného ukotvení", effects: { ambiguity_tolerance: -0.78, theory_tolerance: -0.35 } },
      { id: "b", label: "technické dolaďování detailů a procesních kroků", effects: { systematic_thinking: -0.75, optimization_drive: -0.55 } },
      { id: "c", label: "časté vystupování a okamžité reakce před lidmi", effects: { presentation_energy: -0.78, people_orientation: -0.42 } },
      { id: "d", label: "práce s numerickým porovnáním variant a rizik", effects: { quant_reasoning: -0.62, risk_evaluation: -0.58, financial_orientation: -0.34 } }
    ]
  },
  {
    id: "q7",
    phase: "core",
    style: "broad",
    type: "single",
    prompt: "Který typ materiálu tě nejspíš vtáhne i mimo povinné úkoly?",
    options: [
      { id: "a", label: "schémata, data, modely a návrhy fungování systémů", effects: { systematic_thinking: 0.62, optimization_drive: 0.44, quant_reasoning: 0.46, theory_tolerance: 0.28 } },
      { id: "b", label: "případové situace o rozhodování pod nejistotou", effects: { strategic_thinking: 0.52, risk_evaluation: 0.62, organizational_drive: 0.26 } },
      { id: "c", label: "společenské konflikty, pravidla a legitimita rozhodnutí", effects: { institutional_interest: 0.74, argumentation: 0.52, ethics_orientation: 0.34, global_orientation: 0.58 } },
      { id: "d", label: "texty, jazyky, obrazy a kulturní kontext", effects: { text_orientation: 0.52, language_sensitivity: 0.46, cultural_curiosity: 0.66, media_sensitivity: 0.62 } }
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
    branchTags: ["systems", "people", "language"],
    style: "discriminative",
    type: "pairwise",
    prompt: "Co by tě víc bavilo ladit do hloubky?",
    left: { label: "fungování nástroje nebo systému, aby byl spolehlivý a čitelný", effects: { systematic_thinking: 0.66, optimization_drive: 0.48, structure_need: 0.28, practical_impact: 0.32 } },
    right: { label: "komunikaci a koordinaci mezi lidmi, aby tým fungoval bez tření", effects: { people_orientation: 0.78, organizational_drive: 0.62, presentation_energy: 0.24 } }
  },
  {
    id: "q10",
    phase: "adaptive",
    branchTags: ["institutions", "humanities", "people"],
    style: "discriminative",
    type: "single",
    prompt: "Co zní přirozeněji jako tvoje silná stránka?",
    options: [
      { id: "a", label: "rozkrýt, kde jsou v argumentaci slabá místa a co je obhajitelné", effects: { argumentation: 0.82, institutional_interest: 0.56, ethics_orientation: 0.24 } },
      { id: "b", label: "odhadnout, která varianta dává smysl při omezeních a riziku", effects: { strategic_thinking: 0.58, risk_evaluation: 0.74, quant_reasoning: 0.34 } },
      { id: "c", label: "vysvětlit, proč skupiny reagují odlišně v podobných situacích", effects: { people_orientation: 0.74, systematic_thinking: 0.52, theory_tolerance: 0.38, quant_reasoning: 0.24, cultural_curiosity: 0.2 } },
      { id: "d", label: "uhlídat význam, tón a přesnost sdělení v textu i mluvení", effects: { language_sensitivity: 0.82, text_orientation: 0.62, presentation_energy: 0.24 } }
    ]
  },
  {
    id: "q11",
    phase: "adaptive",
    branchTags: ["text", "history", "humanities"],
    style: "validation",
    type: "pairwise",
    prompt: "Co bys radši dělal celý semestr?",
    left: { label: "pečlivě číst texty a dohledávat, co přesně znamenají v kontextu", effects: { text_orientation: 0.76, language_sensitivity: 0.42, historical_interest: 0.3 } },
    right: { label: "skládat souvislosti mezi kulturou, médii a každodenním chováním", effects: { cultural_curiosity: 0.74, ambiguity_tolerance: 0.52, people_orientation: 0.3 } }
  },
  {
    id: "q12",
    phase: "adaptive",
    branchTags: ["systems", "humanities", "institutions"],
    style: "validation",
    type: "single",
    prompt: "Kdybys měl udělat semestrální projekt, co by tě bavilo nejvíc?",
    options: [
      { id: "a", label: "ověření, jak redesign procesu zvedne kvalitu služby", effects: { systematic_thinking: 0.62, optimization_drive: 0.46, practical_impact: 0.52, ethics_orientation: 0.36 } },
      { id: "b", label: "analýza rozhodnutí pod rizikem s jasně popsanými kritérii", effects: { risk_evaluation: 0.74, strategic_thinking: 0.52, financial_orientation: 0.34 } },
      { id: "c", label: "srovnání zdrojů o pravidlech, moci a legitimním postupu", effects: { institutional_interest: 0.56, argumentation: 0.5, theory_tolerance: 0.58, ethics_orientation: 0.34 } },
      { id: "d", label: "interpretace kulturního díla, média nebo jazykového jevu", effects: { cultural_curiosity: 0.72, text_orientation: 0.48, media_sensitivity: 0.3, language_sensitivity: 0.24 } }
    ]
  },
  {
    id: "q13",
    phase: "adaptive",
    branchTags: ["presentation", "people", "business", "language"],
    style: "discriminative",
    type: "single",
    prompt: "V jaké roli bys pravděpodobně působil nejpřesvědčivěji?",
    options: [
      { id: "a", label: "řečník nebo moderátor, který drží pozornost publika", effects: { presentation_energy: 0.86, argumentation: 0.46, people_orientation: 0.34 } },
      { id: "b", label: "autor metodiky, který nastaví funkční proces v pozadí", effects: { systematic_thinking: 0.62, structure_need: 0.46, optimization_drive: 0.2 } },
      { id: "c", label: "koordinátor, který skládá role lidí a hlídá průběh", effects: { organizational_drive: 0.74, people_orientation: 0.56, strategic_thinking: 0.26 } },
      { id: "d", label: "interpret textu nebo jazyka, který zpřesní význam", effects: { language_sensitivity: 0.76, text_orientation: 0.58, ambiguity_tolerance: 0.24 } }
    ]
  },
  {
    id: "q14",
    phase: "adaptive",
    branchTags: ["history", "culture", "global", "humanities"],
    style: "broad",
    type: "single",
    prompt: "Která vrstva souvislostí tě zajímá nejvíc?",
    options: [
      { id: "a", label: "jak se minulost skládá z pramenů, stop a přepisů významu", effects: { historical_interest: 0.88, text_orientation: 0.42, theory_tolerance: 0.26 } },
      { id: "b", label: "jak prostředí a kultura mění chování skupin i jednotlivců", effects: { cultural_curiosity: 0.76, people_orientation: 0.54, ambiguity_tolerance: 0.48, theory_tolerance: 0.38 } },
      { id: "c", label: "jak instituce a státy udržují řád nebo vytvářejí konflikt", effects: { global_orientation: 0.78, institutional_interest: 0.58, argumentation: 0.22 } },
      { id: "d", label: "jak se v nejistotě rozhoduje o hodnotě, riziku a prioritách", effects: { risk_evaluation: 0.68, strategic_thinking: 0.46, financial_orientation: 0.28 } }
    ]
  },
  {
    id: "q15",
    phase: "adaptive",
    branchTags: ["final_validation"],
    style: "confidence",
    type: "confidence",
    prompt: "Nakolik ti průběžně dává smysl, kam se kvíz profilově ubírá?",
    hint: "Použito pro finální confidence a případný warning o nízké jistotě."
  }
];
