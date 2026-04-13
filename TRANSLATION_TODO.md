# Texty k překladu (CS -> EN)

Doplnil jsem jednodušší české formulace a hned i anglický překlad.

## UI

| Klíč | CS | EN |
|---|---|---|
| brandEyebrow | Academic Vanguard | Academic Vanguard |
| restart | Restart | Restart |
| heroBadge | Průvodce výběrem předmětů | Subject selection guide |
| heroTitle | Najdi předměty, které ti sedí obsahem i stylem práce. | Find subjects that match both your interests and your way of working. |
| heroSubtitle | Krátký chytrý quiz ukáže, co tě nejvíc vystihuje, a doporučí vhodné směry. | A short smart quiz shows what fits you best and recommends suitable directions. |
| features[0] | 24 oblasti tvého profilu | 24 parts of your profile |
| features[1] | více typů otázek: výběr, řazení, porovnání, co ti nesedí, míra jistoty | multiple question types: choice, ranking, comparison, what does not suit you, confidence level |
| features[2] | další otázka se vybírá podle toho, co nejvíc pomůže zpřesnit výsledek | the next question is chosen based on what helps refine the result the most |
| features[3] | výsledek ukazuje zájem, silné stránky, motivaci a styl práce | the result shows your interests, strengths, motivation, and work style |
| features[4] | zohlednění rozporů a směrů, které se k tobě moc nehodí | considers contradictions and directions that do not fit you well |
| features[5] | míra jistoty a slovní vysvětlení | confidence level and written explanation |
| start | Začít quiz | Start quiz |
| durationNote | Zabere asi 5 minut | Takes about 5 minutes |
| pullQuote | "Nejde o konečné rozhodnutí, ale o doporučení pro tvůj další rozvoj." | "This is not a final decision, but a recommendation for your next step." |
| resultsEyebrow | Výsledek | Result |
| resultsTitle | Tvoje nejsilnější doporučení | Your strongest recommendations |
| resultModeLabel | Režim | Mode |
| modeBalanced | Vyvážený výběr | Balanced fit |
| modeInterest | Podle zájmů | Interest fit |
| modeStrength | Podle silných stránek | Strength fit |
| modeCareer | Podle praktického využití | Career utility fit |
| debugTitle | Debug / diagnostika | Debug / diagnostics |
| back | Zpět | Back |
| next | Pokračovat | Continue |
| chooseAnswerAlert | Nejdřív vyber odpověď. | Choose an answer first. |
| questionPrefix | Otázka | Question |
| interpretationLabel | Vysvětlení | Interpretation |
| clustersTitle | Silné skupiny | Strong clusters |
| conflictTitle | Rozpory a jistota | Conflicts and confidence |
| noContradictions | Bez výrazných rozporů. | No major contradictions. |
| confidenceSignals | Signály jistoty | Confidence signals |
| noSignals | žádné | none |
| profileTitle | Hlavní profil | Main profile |
| whyNotTitle | Proč ne jiné směry | Why not other directions |
| debugAnswered | Odpovězeno | Answered |
| debugTopTraits | Nejsilnější rysy | Top traits |
| debugTopRanking | Nejvyšší pořadí | Top ranking |
| metricInterest | Shoda podle zájmů | Interest fit |
| metricAptitude | Shoda podle předpokladů | Aptitude fit |
| metricWorkStyle | Shoda podle stylu práce | Work-style fit |
| metricMotivation | Shoda podle motivace | Motivation fit |
| confidenceLabel | Míra jistoty | Confidence |

## Otázky

### q1

- prompt_cs: Co tě na dlouhodobém projektu přitahuje nejvíc?
- prompt_en: What attracts you most in a long-term project?
- hint_cs: Vyber možnost, kterou bys nejspíš chtěl mít jako svou hlavní roli.
- hint_en: Choose the option you would most likely want as your main role.
- options:
  - a_cs: zlepšit systém nebo postup, aby fungoval líp
  - a_en: improve a system or process so it works better
  - b_cs: vymyslet strategii pro co nejlepší výsledek
  - b_en: come up with a strategy for the best possible result
  - c_cs: obhájit směr, názor nebo pravidla
  - c_en: defend a direction, opinion, or set of rules
  - d_cs: vytvořit vlastní nápad, sdělení nebo styl
  - d_en: create your own concept, message, or style

### q2

- prompt_cs: Seřaď podle toho, co je pro tebe při studiu nejdůležitější.
- prompt_en: Rank these by what matters most to you in studying.
- hint_cs: Nahoře = nejvíc, dole = nejméně.
- hint_en: Top = most important, bottom = least important.
- options:
  - a_cs: praktické využití
  - a_en: practical use
  - b_cs: hloubka a porozumění
  - b_en: depth and understanding
  - c_cs: strategie, výsledek a rozhodování
  - c_en: strategy, results, and decision-making
  - d_cs: vyjádření, styl a originalita
  - d_en: expression, style, and originality

### q3

- prompt_cs: Co by tě štvalo míň?
- prompt_en: What would frustrate you less?
- hint_cs: Posuvník ukazuje, ke které straně máš blíž.
- hint_en: The slider shows which side feels closer to you.
- left_cs: jasný problém s jedním dobrým řešením
- left_en: a clear problem with one good solution
- right_cs: otevřený problém s více možnostmi výkladu
- right_en: an open problem with several valid interpretations

### q4

- prompt_cs: Který typ výstupu by tě dlouhodobě bavil nejvíc?
- prompt_en: Which type of output would keep you interested the longest?
- options:
  - a_cs: návrh systému, postupu nebo nástroje
  - a_en: designing a system, process, or tool
  - b_cs: rozbor investice, rizika nebo hodnoty
  - b_en: analysing an investment, risk, or value
  - c_cs: obhajoba názoru na pravidla, moc nebo společnost
  - c_en: defending an opinion about rules, power, or society
  - d_cs: vlastní tvorba nebo výklad
  - d_en: your own creative or interpretive output

### q5

- prompt_cs: Když narazíš na složitý problém, co je ti nejbližší?
- prompt_en: When you face a complex problem, what feels most natural to you?
- options:
  - a_cs: rozdělit ho na části a poskládat funkční řešení
  - a_en: break it into parts and build a workable solution
  - b_cs: vybrat nejlepší strategii a hlídat výsledek
  - b_en: choose the best strategy and keep an eye on the result
  - c_cs: zvážit, co je správné a co jde dobře obhájit
  - c_en: consider what is right and what can be defended well
  - d_cs: hledat nové pohledy, významy a výklady
  - d_en: look for new angles, meanings, and interpretations

### q6

- prompt_cs: Co by tě nejspíš vyčerpávalo nejvíc?
- prompt_en: What would most likely drain you the most?
- options:
  - a_cs: dlouhé nejasné výklady bez jasného výsledku
  - a_en: long unclear interpretations without a clear outcome
  - b_cs: technické nebo systémové detaily
  - b_en: technical or system details
  - c_cs: časté veřejné mluvení a obhajování před lidmi
  - c_en: frequent public speaking and defending your view in front of people
  - d_cs: rozhodování podle hodnoty, rizika a výsledku
  - d_en: making decisions based on value, risk, and outcomes

### q7

- prompt_cs: Které téma tě přitahuje nejvíc?
- prompt_en: Which topic attracts you the most?
- options:
  - a_cs: technologie, systémy a jak fungují
  - a_en: technology, systems, and how they work
  - b_cs: trh, hodnota, růst a rozhodování
  - b_en: market, value, growth, and decision-making
  - c_cs: moc, pravidla, stát a dění ve světě
  - c_en: power, rules, the state, and world affairs
  - d_cs: kultura, jazyk, média a význam
  - d_en: culture, language, media, and meaning

### q8

- prompt_cs: Jak moc máš pocit, že odpovídáš podle sebe a ne podle toho, co zní dobře?
- prompt_en: How much do you feel you are answering honestly rather than choosing what sounds good?
- hint_cs: To ovlivní míru jistoty, ne samotný obsah profilu.
- hint_en: This affects the confidence level, not the profile content itself.

### q9

- prompt_cs: Co tě láká víc?
- prompt_en: What attracts you more?
- left_cs: navrhnout lepší systém nebo informační řešení
- left_en: design a better system or information solution
- right_cs: udělat lepší rozhodnutí s vyšší hodnotou nebo výnosem
- right_en: make a better decision with higher value or return

### q10

- prompt_cs: Co zní přirozeněji jako tvoje silná stránka?
- prompt_en: Which sounds more naturally like your strength?
- options:
  - a_cs: rozumět pravidlům, institucím a jejich dopadu
  - a_en: understanding rules, institutions, and their impact
  - b_cs: vyhodnotit příležitost, strategii a výsledek
  - b_en: evaluating an opportunity, strategy, and result
  - c_cs: chápat chování lidí a motivaci skupin
  - c_en: understanding people's behavior and group motivation
  - d_cs: pracovat s významem, jazykem nebo výkladem
  - d_en: working with meaning, language, or interpretation

### q11

- prompt_cs: Co bys radši dělal celý semestr?
- prompt_en: What would you rather do for a whole semester?
- left_cs: přesně číst texty, argumenty a pravidla
- left_en: closely read texts, arguments, and rules
- right_cs: volněji vykládat význam, kulturu a souvislosti
- right_en: more freely interpret meaning, culture, and context

### q12

- prompt_cs: Kdybys měl dělat semestrální projekt, co by tě bavilo nejvíc?
- prompt_en: If you had to do a semester project, what would interest you the most?
- options:
  - a_cs: návrh, jak zlepšit proces nebo systém
  - a_en: a proposal for improving a process or system
  - b_cs: případová studie rozhodnutí, hodnoty nebo investice
  - b_en: a case study of a decision, value, or investment
  - c_cs: analýza pravidel, institucí nebo moci
  - c_en: an analysis of rules, institutions, or power
  - d_cs: kulturní nebo mediální výklad
  - d_en: a cultural or media interpretation

### q13

- prompt_cs: V jaké roli bys asi působil nejpřesvědčivěji?
- prompt_en: In which role would you probably come across as the most convincing?
- options:
  - a_cs: ten, kdo prezentuje a obhajuje řešení před lidmi
  - a_en: the person presenting and defending a solution in front of people
  - b_cs: ten, kdo v pozadí navrhuje systém nebo postup
  - b_en: the person in the background designing a system or process
  - c_cs: ten, kdo volí strategii a hlídá rizika
  - c_en: the person choosing the strategy and watching the risks
  - d_cs: ten, kdo dává věcem význam a kontext
  - d_en: the person giving things meaning and context

### q14

- prompt_cs: Která vrstva souvislostí tě zajímá nejvíc?
- prompt_en: Which layer of context interests you the most?
- options:
  - a_cs: historický vývoj a dlouhé dějiny
  - a_en: historical development and long-term history
  - b_cs: kultury, identity a významy
  - b_en: cultures, identities, and meanings
  - c_cs: státy, instituce a mezinárodní svět
  - c_en: states, institutions, and the international world
  - d_cs: trhy, hodnota a reálná rozhodnutí
  - d_en: markets, value, and real-world decisions

### q15

- prompt_cs: Jak moc ti zatím dává smysl, kam se quiz profilově ubírá?
- prompt_en: How much does the direction of your quiz profile make sense to you so far?
- hint_cs: Používá se pro finální míru jistoty a případné upozornění na nižší jistotu.
- hint_en: This is used for the final confidence level and a possible low-confidence warning.
