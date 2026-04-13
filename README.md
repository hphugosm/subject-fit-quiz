# Subject Fit Engine – komplexní funkční kostra

Tohle je čistě frontendová prototypová kostra pro doporučovací quiz nad školními předměty.

## Co obsahuje

- adaptivní výběr otázek
- 24 trait dimenzí
- více typů otázek
- scoring ve 4 režimech
- contradiction rules
- confidence scoring
- explainable output
- debug panel pro ladění

## Jak to spustit

Nejjednodušší varianta:

1. rozbal zip
2. otevři `index.html`

Lepší varianta přes lokální server:

```bash
python3 -m http.server 8080
```

Pak otevři lokální adresu v prohlížeči.

## Rychlý smoke check

Po změnách layoutu nebo logiky můžeš rychle ověřit integritu:

```bash
node tests/smoke-checks.mjs
```

Skript kontroluje unikátnost klíčových DOM ID a základní průchod 12 otázkami bez opakování.

## Struktura

- `src/data/traits.js` – definice dimenzí
- `src/data/questions.js` – otázky a jejich efekty
- `src/data/subjects.js` – modely předmětů
- `src/data/rules.js` – scoring modes a contradiction rules
- `src/engine/scoring.js` – výpočet profilu, score a confidence
- `src/engine/adaptive.js` – adaptivní výběr další otázky
- `src/engine/narrative.js` – generování interpretace
- `src/ui/render.js` – render otázky a výsledků
- `src/app.js` – orchestrace aplikace

## Co je hotové

- end-to-end prototyp funguje
- otázky se vybírají adaptivně po core bloku
- výsledek ukazuje Top 5, clustery, dominantní traits a why-not

## Co bych dělal dál

- převést do React / Next.js
- oddělit scoring do testovatelné service vrstvy
- doplnit databázi a admin rozhraní pro úpravu vah
- přidat analytics na kalibraci otázek
- přidat session persistence a export výsledku
- doladit psychometriku: IRT-inspired discrimination a lepší information gain
