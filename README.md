# Academic Vanguard — subject-fit-quiz

Adaptivní kvíz, který studentům doporučí předměty a studijní směry podle profilu a stylu práce. Frontendová funkční kostra brandu **Academic Vanguard** („Najdi předměty, které ti sedí obsahem i stylem práce.").

## Cíl

Pomoct studentům vybrat si předměty informovaně: krátký chytrý kvíz → profil ve 24 dimenzích (zájmy, silné stránky, motivace, styl práce) → vysvětlitelné doporučení, ne černá skříňka.

## Jak to funguje

- **Adaptivní výběr otázek** — další otázka se vybírá podle informační hodnoty (co nejrychlejší zpřesnění profilu)
- **Více typů otázek**: výběr, ranking, pairwise porovnání, aversion (co nevyhovuje), confidence (míra jistoty)
- **Scoring ve 4 režimech**: Balanced / Interest / Strength / Career utility fit
- **Contradiction rules** — penalizace rozporů a anti-fit faktorů
- **Explainable output** — narativní vysvětlení výsledku + debug panel s diagnostikou skóre

Čistý frontend bez backendu — vše běží v prohlížeči (`index.html` + `src/`).

## Použité nástroje

Vanilla JS · CSS · testy v `tests/`

## Výsledky

- Funkční prototyp celého enginu (24 trait dimenzí, adaptivní flow, 4 scoring módy)
- Probíhá i18n: CS → EN překlad UI stringů

## Lessons learned

- Adaptivní dotazování výrazně zkracuje kvíz oproti pevné sadě otázek při stejné kvalitě profilu.
- Vysvětlitelnost („proč mi tohle vyšlo") je pro důvěru uživatele důležitější než přesnost skóre.
