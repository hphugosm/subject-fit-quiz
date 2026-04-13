import { TRAIT_LABELS } from "../data/traits.js";

export function buildNarrative(state, rankedSubjects) {
  const topTraits = Object.entries(state.traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, value]) => ({ key, label: TRAIT_LABELS[key] || key, value }));

  const primary = rankedSubjects[0];
  const secondary = rankedSubjects[1];
  const tertiary = rankedSubjects[2];

  const dominantSummary = dominantStyleLine(topTraits);
  const motiveSummary = motiveLine(state.traits);
  const tensionSummary = state.contradictions.length
    ? `V profilu se ale ukazuje i napětí: ${state.contradictions.map((c) => c.label).join(" ")}`
    : "Profil je relativně konzistentní bez výrazných vnitřních rozporů.";

  return {
    title: `${primary.name} vychází nejvýš`,
    paragraphs: [
      `${dominantSummary} ${motiveSummary}`,
      `Proto se nahoře drží hlavně ${primary.name}, ${secondary?.name ?? "druhý obor"} a ${tertiary?.name ?? "třetí obor"}. Nejde jen o tematický zájem, ale o kombinaci kognitivního stylu, motivace a typu práce, který ti nejspíš sedí.`,
      tensionSummary
    ],
    topTraits
  };
}

function dominantStyleLine(topTraits) {
  const names = topTraits.slice(0, 3).map((t) => t.label.toLowerCase());
  return `Nejsilněji se u tebe skládá osa ${names.join(", ")}.`;
}

function motiveLine(traits) {
  if (traits.practical_impact > 0.72 && traits.financial_orientation > 0.62) {
    return "Z odpovědí je vidět tah na výsledek, použitelnost a hodnotu, ne jen na zajímavost tématu.";
  }
  if (traits.creative_expression > 0.75 && traits.language_sensitivity > 0.6) {
    return "Silně se u tebe objevuje potřeba vyjádření, formy a práce s významem.";
  }
  if (traits.institutional_interest > 0.72 && traits.argumentation > 0.7) {
    return "Výrazně se ukazuje zájem o pravidla, moc, institucionální rámce a obhajobu názoru.";
  }
  return "Profil působí jako mix preferencí, ale s jasnými dominantními směry.";
}

export function buildWhyNot(rankedSubjects) {
  return rankedSubjects.slice(-3).reverse().map((s) => ({ name: s.name, whyNot: s.whyNot }));
}

export function buildClusters(rankedSubjects) {
  const top6 = rankedSubjects.slice(0, 6);
  const map = new Map();
  top6.forEach((item) => {
    if (!map.has(item.cluster)) map.set(item.cluster, []);
    map.get(item.cluster).push(item.name);
  });
  return Array.from(map.entries()).map(([cluster, items]) => ({ cluster, items }));
}
