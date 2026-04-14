export const SUBJECTS = [
  {
    id: "anthropology",
    name: "Antropologie",
    cluster: "Society / Culture",
    ideal: { cultural_curiosity: 0.95, people_orientation: 0.82, ambiguity_tolerance: 0.76, historical_interest: 0.55, theory_tolerance: 0.64, ethics_orientation: 0.5, text_orientation: 0.55 },
    antiFit: { structure_need: 0.35, financial_orientation: 0.25 },
    explanations: ["sedí lidem, kteří umí číst kulturní vzorce v chování lidí i institucí", "silná je tam, kde tě baví terén, kontext a práce s více vrstvami významu"],
    whyNot: "Bývá níž, pokud tě dlouhodobě naplňuje hlavně formální modelování, číselná optimalizace nebo striktně technický provoz."
  },
  {
    id: "art_architecture",
    name: "Umění & architektura",
    cluster: "Creative / Visual",
    ideal: { aesthetic_sensitivity: 0.96, creative_expression: 0.82, historical_interest: 0.48, ambiguity_tolerance: 0.66, cultural_curiosity: 0.6 },
    antiFit: { financial_orientation: 0.18, quant_reasoning: 0.14 },
    explanations: ["táhne lidi s vizuálním a estetickým cítěním", "potřebuje vyšší cit pro interpretaci a formu"],
    whyNot: "Klesá u profilů zaměřených víc na optimalizaci, jasný výkon a systémovost než na vizuální a estetickou práci."
  },
  {
    id: "classical_studies",
    name: "Starověké a klasické studie",
    cluster: "Humanities / History",
    ideal: { historical_interest: 0.95, theory_tolerance: 0.72, text_orientation: 0.67, cultural_curiosity: 0.62, language_sensitivity: 0.36 },
    antiFit: { practical_impact: 0.3, financial_orientation: 0.28 },
    explanations: ["silný fit pro profily, které skládají minulost z pramenů, pojmů a souvislostí", "odměňuje přesnou textovou práci i cit pro historický kontext"],
    whyNot: "Mívá slabší prioritu, pokud potřebuješ hlavně okamžitý operativní dopad a minimum dlouhé textové analýzy."
  },
  {
    id: "creative_writing",
    name: "Tvůrčí psaní",
    cluster: "Creative / Language",
    ideal: { creative_expression: 0.98, text_orientation: 0.9, language_sensitivity: 0.78, ambiguity_tolerance: 0.68, presentation_energy: 0.3 },
    antiFit: { structure_need: 0.38, quant_reasoning: 0.24 },
    explanations: ["potřebuje silnou potřebu sebevyjádření a práci s jazykem"],
    whyNot: "Bývá slabší volba pro lidi, kteří chtějí hlavně strukturu, systém a funkční optimalizaci."
  },
  {
    id: "economics_finance",
    name: "Ekonomie, finance & ekonometrie",
    cluster: "Business / Quant",
    ideal: { quant_reasoning: 0.95, financial_orientation: 0.96, risk_evaluation: 0.74, strategic_thinking: 0.72, theory_tolerance: 0.55, practical_impact: 0.58 },
    antiFit: { ambiguity_tolerance: 0.12, aesthetic_sensitivity: 0.1 },
    explanations: ["sedí profilům s kvantitativním a investičním uvažováním", "odměňuje práci s modely a rozhodováním"],
    whyNot: "Může být slabší pro někoho, koho nebaví kvantitativní modelování a převažuje u něj čistě slovní nebo kreativní styl."
  },
  {
    id: "environment_engineering",
    name: "Environmentální inženýrství",
    cluster: "Systems / Applied",
    ideal: { systematic_thinking: 0.86, practical_impact: 0.82, quant_reasoning: 0.65, ethics_orientation: 0.58, optimization_drive: 0.72, theory_tolerance: 0.4 },
    antiFit: { text_orientation: 0.1 },
    explanations: ["kombinuje technické myšlení s aplikovaným dopadem"],
    whyNot: "Klesá, pokud profil nechce řešit systémy nebo technické kompromisy."
  },
  {
    id: "film_media",
    name: "Film a média",
    cluster: "Creative / Media",
    ideal: { media_sensitivity: 0.97, creative_expression: 0.76, cultural_curiosity: 0.63, presentation_energy: 0.45, ambiguity_tolerance: 0.61, text_orientation: 0.45 },
    antiFit: { structure_need: 0.22, quant_reasoning: 0.24 },
    explanations: ["hodí se pro vizuálně-mediální a interpretační profil"],
    whyNot: "Není ideální pro někoho, kdo chce hlavně formalizované problémy a rozhodování přes systém nebo čísla."
  },
  {
    id: "language_linguistics",
    name: "Řeč a jazykověda",
    cluster: "Language / Analysis",
    ideal: { language_sensitivity: 0.97, text_orientation: 0.84, systematic_thinking: 0.46, theory_tolerance: 0.58, cultural_curiosity: 0.5 },
    antiFit: { financial_orientation: 0.12 },
    explanations: ["spojuje detailní jazykový cit s analytickou prací nad strukturou řeči", "vyhovuje, když tě baví hledat pravidelnosti v tom, jak jazyk skutečně funguje"],
    whyNot: "Může klesat, pokud nechceš pracovat s jazykovým detailem a preferuješ převážně rychlá rozhodnutí bez textu."
  },
  {
    id: "world_literature",
    name: "Světová literatura",
    cluster: "Humanities / Language",
    ideal: { text_orientation: 0.97, cultural_curiosity: 0.82, ambiguity_tolerance: 0.72, language_sensitivity: 0.66, historical_interest: 0.38 },
    antiFit: { practical_impact: 0.34, structure_need: 0.26 },
    explanations: ["silný fit pro dlouhodobé čtení textů v kulturním a historickém kontextu", "těží z citu pro nuance významu, hlasu autora a interpretační vrstvy"],
    whyNot: "Mívá nižší prioritu, pokud tě dlouhodobě drží hlavně procesní optimalizace a minimální práce s textem."
  },
  {
    id: "law",
    name: "Právo",
    cluster: "Institutions / Argumentation",
    ideal: { argumentation: 0.96, institutional_interest: 0.92, structure_need: 0.74, text_orientation: 0.7, ethics_orientation: 0.56, practical_impact: 0.5, strategic_thinking: 0.4 },
    antiFit: { ambiguity_tolerance: 0.22, creative_expression: 0.14 },
    explanations: ["sedí lidem s argumentační silou a zájmem o pravidla a instituce"],
    whyNot: "Může ztrácet, pokud profil nesnáší textovou práci, přesnost a práci s pravidly."
  },
  {
    id: "management_business",
    name: "Řízení a podnikání",
    cluster: "Business / Applied Decision",
    ideal: { strategic_thinking: 0.93, practical_impact: 0.86, organizational_drive: 0.88, financial_orientation: 0.66, presentation_energy: 0.48, people_orientation: 0.46, risk_evaluation: 0.52 },
    antiFit: { theory_tolerance: 0.08 },
    explanations: ["vyhovuje lidem se strategií, řízením a orientací na výsledek"],
    whyNot: "Slábne, pokud člověk nechce rozhodovat, organizovat a tlačit věci do praxe."
  },
  {
    id: "human_resources",
    name: "Lidské zdroje a řízení organizace",
    cluster: "People / Organization",
    ideal: { people_orientation: 0.9, organizational_drive: 0.78, presentation_energy: 0.6, argumentation: 0.42, ethics_orientation: 0.48 },
    antiFit: { quant_reasoning: 0.06, systematic_thinking: 0.05 },
    explanations: ["stojí na práci s lidmi, motivací a nastavováním fungující organizační spolupráce"],
    whyNot: "Není ideální pro profil, který chce spíš systémy, technologie a méně sociálního vyjednávání."
  },
  {
    id: "music",
    name: "Hudba",
    cluster: "Creative / Performance",
    ideal: { creative_expression: 0.94, aesthetic_sensitivity: 0.91, presentation_energy: 0.55, ambiguity_tolerance: 0.52 },
    antiFit: { practical_impact: 0.16, financial_orientation: 0.12 },
    explanations: ["sedí profilům s hudební představivostí, rytmickým citem a potřebou výrazu", "není to doplněk, ale plnohodnotná dráha pro práci s formou, pozorností a interpretací"],
    whyNot: "Bývá níž u profilů, které dlouhodobě preferují hlavně procesní kontrolu, formální modely a minimální estetickou složku práce."
  },
  {
    id: "philosophy",
    name: "Filosofie",
    cluster: "Ideas / Theory",
    ideal: { theory_tolerance: 0.97, argumentation: 0.78, ambiguity_tolerance: 0.85, ethics_orientation: 0.75, text_orientation: 0.62 },
    antiFit: { practical_impact: 0.46, financial_orientation: 0.36 },
    explanations: ["sedí lidem s vysokou tolerancí abstrakce, argumentace a otevřených problémů"],
    whyNot: "Často ztrácí u profilů, které chtějí rychlou aplikaci, jasný výkon a přímý užitek."
  },
  {
    id: "political_social_theory",
    name: "Státní politika a společenskovědní teorie",
    cluster: "Politics / Theory",
    ideal: { institutional_interest: 0.84, argumentation: 0.74, theory_tolerance: 0.82, ethics_orientation: 0.58, ambiguity_tolerance: 0.62, global_orientation: 0.35 },
    antiFit: { financial_orientation: 0.18 },
    explanations: ["kombinuje zájem o moc, společnost a teoretický rámec"],
    whyNot: "Bývá méně vhodný pro profil, který chce spíš tvrdě aplikovaný nebo technický výstup."
  },
  {
    id: "politics_ir",
    name: "Politika a mezinárodní vztahy",
    cluster: "Politics / Institutions",
    ideal: { institutional_interest: 0.88, global_orientation: 0.94, argumentation: 0.68, presentation_energy: 0.5, strategic_thinking: 0.46, text_orientation: 0.48 },
    antiFit: { quant_reasoning: 0.08 },
    explanations: ["sedí lidem se zájmem o moc, stát, světové dění a vliv"],
    whyNot: "Může být slabší, pokud člověk nechce instituce, geopolitiku a argumentační rámce."
  },
  {
    id: "psychology_cognitive",
    name: "Psychologie a poznávací vědy",
    cluster: "Mind / Analysis",
    ideal: { people_orientation: 0.76, systematic_thinking: 0.56, theory_tolerance: 0.62, ethics_orientation: 0.44, text_orientation: 0.46, quant_reasoning: 0.34 },
    antiFit: { financial_orientation: 0.08 },
    explanations: ["kombinuje práci s lidským chováním, hypotézami a analytickým ověřováním", "silný fit, pokud tě zajímá, jak mysl a prostředí formují rozhodování"],
    whyNot: "Klesá, pokud nechceš systematicky sledovat chování lidí ani pracovat s interpretací dat a vzorců."
  },
  {
    id: "public_speaking",
    name: "Řečnictví",
    cluster: "Communication / Performance",
    ideal: { presentation_energy: 0.97, argumentation: 0.66, people_orientation: 0.48, creative_expression: 0.4 },
    antiFit: { text_orientation: 0.14, ambiguity_tolerance: 0.08 },
    explanations: ["hodně stojí na verbálním výkonu a komfortu s publikem"],
    whyNot: "Klesá, pokud člověk nechce stát před lidmi nebo ho víc baví systémy než veřejné vystupování."
  },
  {
    id: "real_estate_investment",
    name: "Nemovitosti a investice",
    cluster: "Business / Asset Decision",
    ideal: { financial_orientation: 0.97, risk_evaluation: 0.86, strategic_thinking: 0.72, practical_impact: 0.7, organizational_drive: 0.38, quant_reasoning: 0.42 },
    antiFit: { ambiguity_tolerance: 0.12, aesthetic_sensitivity: 0.06 },
    explanations: ["hodí se pro hodnotové, investiční a rozhodovací myšlení"],
    whyNot: "Méně sedí těm, kdo nemají vztah k hodnotě, riziku a finančnímu rozhodování."
  },
  {
    id: "sociology_cultural",
    name: "Sociologie a kulturní studie",
    cluster: "Society / Culture",
    ideal: { people_orientation: 0.76, cultural_curiosity: 0.88, ambiguity_tolerance: 0.75, theory_tolerance: 0.65, text_orientation: 0.54 },
    antiFit: { practical_impact: 0.22, financial_orientation: 0.22 },
    explanations: ["silný fit pro analýzu společnosti, norem a kulturních změn", "opírá se o schopnost propojovat text, terén i širší společenský rámec"],
    whyNot: "Mívá nižší prioritu, pokud chceš pracovat téměř výhradně s technickým řešením a minimem sociálního kontextu."
  },
  {
    id: "technology_information_systems",
    name: "Technika a informační soustavy",
    cluster: "Systems / Technology",
    ideal: { systematic_thinking: 0.98, optimization_drive: 0.95, practical_impact: 0.77, strategic_thinking: 0.54, quant_reasoning: 0.58, structure_need: 0.45 },
    antiFit: { creative_expression: 0.18, text_orientation: 0.1 },
    explanations: ["silný fit pro systémové, technické a optimalizační profily", "odměňuje práci s funkčností a zlepšováním řešení"],
    whyNot: "Slábne, pokud člověk potřebuje hlavně sebevyjádření, textovou interpretaci nebo práci s kulturou."
  },
  {
    id: "translation_interpretation",
    name: "Tlumočení a překlad",
    cluster: "Language / Communication",
    ideal: { language_sensitivity: 0.98, text_orientation: 0.82, people_orientation: 0.35, cultural_curiosity: 0.58, presentation_energy: 0.34 },
    antiFit: { financial_orientation: 0.1, optimization_drive: 0.08 },
    explanations: ["stojí na přesném převodu významu, tónu a kulturního kontextu", "je to náročná analytická disciplína, ne náhradní volba"],
    whyNot: "Mívá nižší prioritu, pokud tě dlouhodobě víc nabíjí čistě procesní optimalizace nebo finanční rozhodování bez jazykové práce."
  }
];
