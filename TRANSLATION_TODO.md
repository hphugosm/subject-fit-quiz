# Texty k prekladu (CS -> EN)

Dopln sloupec EN a potom to vratim do kodu.

## UI

| Klic | CS | EN |
|---|---|---|
| brandEyebrow | Academic Vanguard |  |
| restart | Restart |  |
| heroBadge | Pruvodce vyberem predmetu |  |
| heroTitle | Najdi predmety, ktere ti sednou profilem i stylem prace. |  |
| heroSubtitle | Kratky adaptivni quiz vytahne tvoje dominantni preference a doporuci nejlepsi smery. |  |
| features[0] | 24 dimenzi profilu |  |
| features[1] | vice typu otazek: single, ranked, pairwise, aversion, confidence |  |
| features[2] | adaptivni vyber dalsi otazky podle informacni hodnoty |  |
| features[3] | podslozky vysledku: interest, aptitude, motivation, work-style |  |
| features[4] | penalizace rozporu a anti-fit faktoru |  |
| features[5] | confidence scoring a narativni vysvetleni |  |
| start | Zacit quiz |  |
| durationNote | Zabere cca 5 minut |  |
| pullQuote | "Nejde o zavazne rozhodnuti, ale o doporuceni pro tvuj dalsi rozvoj." |  |
| resultsEyebrow | Vysledek |  |
| resultsTitle | Tvoje nejsilnejsi doporuceni |  |
| resultModeLabel | Rezim |  |
| modeBalanced | Balanced fit |  |
| modeInterest | Interest fit |  |
| modeStrength | Strength fit |  |
| modeCareer | Career utility fit |  |
| debugTitle | Debug / diagnostika |  |
| back | Zpet |  |
| next | Pokracovat |  |
| chooseAnswerAlert | Nejdriv vyber odpoved. |  |
| questionPrefix | Otazka |  |
| interpretationLabel | Interpretace |  |
| clustersTitle | Silne clustery |  |
| conflictTitle | Konflikty a jistota |  |
| noContradictions | Bez vyraznych rozporu. |  |
| confidenceSignals | Confidence signaly |  |
| noSignals | zadne |  |
| profileTitle | Dominantni profil |  |
| whyNotTitle | Proc ne jine smery |  |
| debugAnswered | Odpovezeno |  |
| debugTopTraits | Top traits |  |
| debugTopRanking | Top ranking |  |
| metricInterest | Interest fit |  |
| metricAptitude | Aptitude fit |  |
| metricWorkStyle | Work-style fit |  |
| metricMotivation | Motivation fit |  |
| confidenceLabel | Confidence |  |

## Otazky

### q1

- prompt: Co tě v dlouhodobém projektu přirozeně táhne nejvíc?
- hint: Vyber variantu, kterou bys nejspíš chtěl držet jako svoji hlavní roli.
- options:
  - a: zlepšit systém nebo proces, aby fungoval efektivněji
  - b: vymyslet strategii, jak dosáhnout co nejlepšího výsledku
  - c: vyjednat směr, obhájit názor a pracovat s pravidly
  - d: vytvořit originální koncept, sdělení nebo styl

### q2

- prompt: Seřaď podle toho, co je pro tebe při studiu nejdůležitější.
- hint: Nahoře = nejvíc, dole = nejméně.
- options:
  - a: praktický dopad a použitelnost
  - b: intelektuální hloubka a porozumění
  - c: strategie, výsledek a rozhodování
  - d: vyjádření, styl a originalita

### q3

- prompt: Co by tě méně frustrovalo?
- hint: Posuvník určuje, ke které straně máš blíž.
- left: jasně strukturovaný problém s jedním dobrým řešením
- right: otevřený problém s více obhajitelnými interpretacemi

### q4

- prompt: Který typ výstupu by tě dlouhodobě bavil nejvíc?
- options:
  - a: návrh systému, procesu nebo nástroje
  - b: rozbor investice, rizika nebo hodnoty
  - c: obhajoba názoru na pravidla, moc nebo společnost
  - d: vlastní kreativní nebo interpretační výstup

### q5

- prompt: Když narazíš na komplikovaný problém, co je ti nejbližší?
- options:
  - a: rozložit ho na části a najít funkční architekturu
  - b: vybrat nejlepší strategii a ohlídat výsledek
  - c: zvážit, co je správné, obhajitelné a legitimní
  - d: hledat nové úhly, významy a interpretace

### q6

- prompt: Co by tě nejspíš vyčerpávalo nejvíc?
- options:
  - a: dlouhé nejasné interpretace bez jasného výstupu
  - b: technické nebo systémové detaily
  - c: časté veřejné vystupování a obhajoba před lidmi
  - d: rozhodování podle hodnoty, rizika a výsledku

### q7

- prompt: Co tě tematicky táhne nejvíc?
- options:
  - a: technologie, systémy a jejich fungování
  - b: trh, hodnota, růst a rozhodování
  - c: moc, pravidla, stát a světové dění
  - d: kultura, jazyk, média a význam

### q8

- prompt: Nakolik si zatím věříš, že odpovídáš podle sebe a ne podle toho, co zní dobře?
- hint: Tohle ovlivní confidence skóre, ne samotný obsah profilu.

### q9

- prompt: Co tě láká víc?
- left: navrhnout lepší systém nebo informační řešení
- right: udělat lepší rozhodnutí s vyšší hodnotou nebo výnosem

### q10

- prompt: Co zní přirozeněji jako tvoje silná stránka?
- options:
  - a: rozumět pravidlům, institucím a jejich dopadu
  - b: vyhodnotit příležitost, strategii a výsledek
  - c: pochopit chování lidí a motivaci skupin
  - d: pracovat s významem, jazykem nebo interpretací

### q11

- prompt: Co bys radši dělal celý semestr?
- left: přesné čtení textů, argumentů a pravidel
- right: otevřenou interpretaci významu, kultury a souvislostí

### q12

- prompt: Kdybys měl udělat semestrální projekt, co by tě bavilo nejvíc?
- options:
  - a: model zlepšení procesu nebo systému
  - b: case study rozhodnutí, hodnoty nebo investice
  - c: analýza pravidel, institucí nebo moci
  - d: kulturní nebo mediální interpretace

### q13

- prompt: V jaké roli bys pravděpodobně působil nejpřesvědčivěji?
- options:
  - a: prezentující a obhajující řešení před lidmi
  - b: architekt systému nebo procesu v pozadí
  - c: strateg, který vyhodnocuje varianty a riziko
  - d: interpret, který dává věcem význam a rámec

### q14

- prompt: Která vrstva souvislostí tě zajímá nejvíc?
- options:
  - a: historický vývoj a dlouhé dějiny
  - b: kultury, identity a významy
  - c: státy, instituce a mezinárodní svět
  - d: trhy, hodnota a reálné rozhodování

### q15

- prompt: Nakolik ti průběžně dává smysl, kam se quiz profilově ubírá?
- hint: Použito pro finální confidence a případný warning o nízké jistotě.

