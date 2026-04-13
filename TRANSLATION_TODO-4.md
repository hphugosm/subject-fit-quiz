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

Tyhle otazky jsou prepsane tak, aby se v nich prubezne stridaly vsechny skupiny predmetu a aby nebylo na prvni pohled jasne, ktery predmet zrovna podporuji. Jsou konkretnejsi, ale porad dost skryte.

### q1

- prompt_cs: Kdyz dostanes volnejsi skolni ukol, co by ti prislo nejprirozenejsi udelat jako prvni?
- prompt_en: When you get a more open school assignment, what would feel most natural to do first?
- options:
  - a_cs: rozkreslit, jak cela vec funguje, a najit misto, kde se da zlepsit
  - a_en: map out how the whole thing works and find the place where it can be improved
  - b_cs: porovnat moznosti a vybrat tu, ktera dava nejlepsi smysl do budoucna
  - b_en: compare the options and choose the one that makes the best sense for the future
  - c_cs: zjistit, jaka pravidla, vztahy nebo zajmy v tom hraji roli
  - c_en: find out which rules, relationships, or interests play a role in it
  - d_cs: pojmout to vlastnim zpusobem a dat tomu vyraznou podobu
  - d_en: approach it in your own way and give it a distinctive form

### q2

- prompt_cs: Ktera skupina skolnich predmetu ti byva nejblizsi zpusobem prace, i kdyz tema neni vzdy uplne tvoje oblibene?
- prompt_en: Which group of school subjects usually feels closest to you because of the way you work in them, even when the topic itself is not always your favourite?
- options:
  - a_cs: matematika, informatika, fyzika, technicke ukoly
  - a_en: maths, computer science, physics, technical tasks
  - b_cs: ekonomika, zemepis, zaklady spolecenskych ved, prace s pripady
  - b_en: economics, geography, social studies, case-based work
  - c_cs: dejepis, obcanka, prace s texty a argumenty
  - c_en: history, civics, work with texts and arguments
  - d_cs: jazyky, literatura, media, hudba nebo vytvarna tvorba
  - d_en: languages, literature, media, music, or visual creation

### q3

- prompt_cs: Kdyz narazis na delsi text, co te v nem nejspis udrzi?
- prompt_en: When you come across a longer text, what is most likely to keep you engaged?
- options:
  - a_cs: kdyz presne vysvetluje, jak neco funguje nebo proc se to deje
  - a_en: when it clearly explains how something works or why it happens
  - b_cs: kdyz porovnava varianty, vyhody, naklady nebo rizika
  - b_en: when it compares options, benefits, costs, or risks
  - c_cs: kdyz stavi proti sobe nazory, postoje nebo pravidla
  - c_en: when it puts opinions, positions, or rules against each other
  - d_cs: kdyz otevira vyznam, styl, kulturu nebo vice vykladu
  - d_en: when it opens up meaning, style, culture, or multiple interpretations

### q4

- prompt_cs: Trida pripravuje spolecnou akci a ty si muzes vybrat roli. Co by ti sedelo nejvic?
- prompt_en: Your class is preparing a shared event and you can choose your role. What would suit you best?
- options:
  - a_cs: navrhnout system, harmonogram a celkove fungovani
  - a_en: design the system, timeline, and overall way it will work
  - b_cs: hlidat rozpocet, moznosti a co se opravdu vyplati
  - b_en: keep track of the budget, options, and what is really worth it
  - c_cs: resit domluvu, role lidi a to, aby tym fungoval
  - c_en: handle coordination, people’s roles, and make sure the team works
  - d_cs: vymyslet styl, atmosferu, obsah nebo prezentaci cele akce
  - d_en: come up with the style, atmosphere, content, or presentation of the whole event

### q5

- prompt_cs: Ktera z techto veci by te dokazala bavit i delsi dobu, kdybys ji mel delat poradne?
- prompt_en: Which of these things could keep you interested for a longer time if you had to do it properly?
- options:
  - a_cs: zkoumat, proc se lide rozhoduji tak, jak se rozhoduji
  - a_en: studying why people make the decisions they make
  - b_cs: sledovat, jak funguje skupina, spolecnost nebo kultura
  - b_en: observing how a group, society, or culture works
  - c_cs: porovnavat, jak ziji lide v ruznych prostredich a zvycich
  - c_en: comparing how people live in different environments and customs
  - d_cs: vybirat lidi, rozdelovat role a zlepsovat spolupraci
  - d_en: selecting people, assigning roles, and improving cooperation

### q6

- prompt_cs: Kdybys mel pripravit skolni vystup o minulosti, co by ti prislo nejzajimavejsi?
- prompt_en: If you had to prepare a school project about the past, what would seem most interesting to you?
- options:
  - a_cs: stare civilizace, anticky svet a puvodni prameny
  - a_en: ancient civilisations, the classical world, and original sources
  - b_cs: vyvoj statu, konfliktu a velkych svetovych udalosti
  - b_en: the development of states, conflicts, and major world events
  - c_cs: kazdodenni zivot, zvyky a zmeny kultur v case
  - c_en: everyday life, customs, and changes in cultures over time
  - d_cs: promeny umeni, staveb a toho, jak lide vnimali prostor
  - d_en: changes in art, buildings, and the way people understood space

### q7

- prompt_cs: Ktera cinnost ti zni nejvic jako neco, v cem bys mohl byt opravdu silny?
- prompt_en: Which activity sounds most like something you could be truly strong at?
- options:
  - a_cs: najit vzorec nebo pravidelnost v datech, cislech nebo modelech
  - a_en: finding a pattern or regularity in data, numbers, or models
  - b_cs: odhadnout hodnotu, riziko nebo dlouhodobou vyhodnost rozhodnuti
  - b_en: judging the value, risk, or long-term advantage of a decision
  - c_cs: pochopit, jak nastavit proces tak, aby fungoval co nejlip
  - c_en: understanding how to set up a process so it works as well as possible
  - d_cs: spojit vice informaci do prehledneho systemu nebo reseni
  - d_en: combining several pieces of information into a clear system or solution

### q8

- prompt_cs: Kdyz sledujes zpravy nebo verejne deni, co te obvykle zajima jako prvni?
- prompt_en: When you follow the news or public affairs, what usually interests you first?
- options:
  - a_cs: co je podle pravidel, kdo za co odpovida a jak se to da obhajit
  - a_en: what follows the rules, who is responsible for what, and how it can be defended
  - b_cs: kdo ma moc, zajmy a jak se mezi sebou stretavaji skupiny nebo staty
  - b_en: who has power and interests, and how groups or states clash with one another
  - c_cs: jake hlubsi myslenky o spolecnosti nebo spravedlnosti za tim jsou
  - c_en: what deeper ideas about society or justice are behind it
  - d_cs: jak se to projevuje v beznem zivote lidi a ve spolecnosti
  - d_en: how it shows up in ordinary people’s lives and in society

### q9

- prompt_cs: Kdybys prijel do cizi zeme, ceho by sis vsiml jako prvniho?
- prompt_en: If you arrived in a foreign country, what would you notice first?
- options:
  - a_cs: jak lide mluvi, jaka slova pouzivaji a co se spatne prevadi do jine reci
  - a_en: how people speak, what words they use, and what is hard to carry over into another language
  - b_cs: jak jazyk sam funguje, co se opakuje a jak je postaveny
  - b_en: how the language itself works, what repeats, and how it is structured
  - c_cs: jake pribehy, knihy nebo texty maji pro tu zemi velkou hodnotu
  - c_en: which stories, books, or texts have great value in that country
  - d_cs: co o te zemi vypovidaji filmy, media a obraz, ktery o sobe vytvari
  - d_en: what films, media, and the image the country creates say about it

### q10

- prompt_cs: Ktera cast kulturniho sveta te pritahuje nejvic, i kdyz ji sam nemusis aktivne delat?
- prompt_en: Which part of the cultural world attracts you the most, even if you do not actively do it yourself?
- options:
  - a_cs: hudba, zvuk a jak atmosfera meni dojem
  - a_en: music, sound, and how atmosphere changes the impression
  - b_cs: film, serialy a to, jak media ovlivnuji lidi
  - b_en: film, series, and how media influence people
  - c_cs: obrazy, budovy, prostor a vizualni styl
  - c_en: images, buildings, space, and visual style
  - d_cs: knihy, pribehy a svet vytvoreny jazykem
  - d_en: books, stories, and a world created through language

### q11

- prompt_cs: Kdyby ses mel ucit neco noveho opravdu dopodrobna, co by ti sedelo nejvic?
- prompt_en: If you had to learn something new really thoroughly, what would suit you best?
- options:
  - a_cs: pochopit presna pravidla, pojmy a to, jak do sebe vse zapada
  - a_en: understanding exact rules, terms, and how everything fits together
  - b_cs: naucit se system rozhodovani z pripadu, cisel a srovnani
  - b_en: learning a system of decision-making from cases, numbers, and comparisons
  - c_cs: rozebirat texty, vyznamy a to, co vse se v nich da cist
  - c_en: analysing texts, meanings, and what can be read into them
  - d_cs: sledovat lidi, situace a postupne v nich nachazet vzorce
  - d_en: observing people and situations and gradually finding patterns in them

### q12

- prompt_cs: Co by te pri dlouhodobem studiu nejspis unavilo nejvic?
- prompt_en: What would most likely tire you the most in long-term study?
- options:
  - a_cs: hodne tabulek, presnych cisel a formalnich vypoctu
  - a_en: lots of tables, exact numbers, and formal calculations
  - b_cs: hodne cteni a vykladani textu bez jasneho vystupu
  - b_en: a lot of reading and interpreting texts without a clear output
  - c_cs: caste reseni vztahu, vystupovani a domlouvani mezi lidmi
  - c_en: frequent relationship handling, presenting, and coordinating between people
  - d_cs: technicke detaily, nastavovani systemu a presne postupy
  - d_en: technical details, system setup, and precise procedures

### q13

- prompt_cs: Kdybys mel na vysledku dostat pochvalu, za co by te tesila nejvic?
- prompt_en: If you were praised for a result, what would please you the most?
- options:
  - a_cs: ze jsi presne vystihl smysl, ton nebo preklad tak, jak mel pusobit
  - a_en: that you captured the meaning, tone, or translation exactly as it should come across
  - b_cs: ze jsi udelal chytre rozhodnuti a dobre odhadl dalsi vyvoj
  - b_en: that you made a smart decision and judged the future development well
  - c_cs: ze jsi vytvoril neco puvodniho, silneho nebo dobre podaneho
  - c_en: that you created something original, powerful, or well presented
  - d_cs: ze to bylo presne vystavene, funkcni a drzelo to pohromade
  - d_en: that it was precisely structured, functional, and held together well

### q14

- prompt_cs: Ktery typ semestralniho vystupu by te nejspis bavil nejvic?
- prompt_en: Which type of semester output would most likely interest you the most?
- options:
  - a_cs: navrh reseni pro system, technologii nebo fungovani nejake veci
  - a_en: a proposal for improving a system, technology, or the way something works
  - b_cs: pripad o trhu, investici, firme, hodnote nebo nemovitosti
  - b_en: a case study about a market, investment, company, value, or real estate
  - c_cs: analyza spolecnosti, statu, pravidel nebo mezinarodni situace
  - c_en: an analysis of society, the state, rules, or an international situation
  - d_cs: prace s jazykem, kulturou, medii nebo umeleckym vyznamem
  - d_en: work with language, culture, media, or artistic meaning

### q15

- prompt_cs: Ktery typ uspechu by pro tebe mel nejvetsi cenu?
- prompt_en: Which type of success would have the greatest value for you?
- options:
  - a_cs: vytvorit neco, co bude mit silny kulturni, jazykovy nebo tvurci dopad
  - a_en: creating something with a strong cultural, linguistic, or creative impact
  - b_cs: prijit na reseni, ktere bude dlouhodobe fungovat a zlepsovat realne veci
  - b_en: finding a solution that will work in the long run and improve real things
  - c_cs: dobre rozpoznat, co ma hodnotu, kde je riziko a jak se rozhodnout
  - c_en: correctly recognising what has value, where the risk is, and how to decide
  - d_cs: dokazat presne a presvedcive pojmenovat, co plati a proc
  - d_en: being able to state clearly and convincingly what holds true and why
