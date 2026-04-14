import { QUESTIONS } from "../data/questions.js";
import { SUBJECTS } from "../data/subjects.js";

function collectSignals() {
  const signals = [];

  QUESTIONS.forEach((question) => {
    if (question.type === "single" || question.type === "ranked") {
      question.options.forEach((option) => {
        signals.push({
          questionId: question.id,
          signalId: `${question.id}:${option.id}`,
          effects: option.effects || {}
        });
      });
    }

    if (question.type === "pairwise") {
      signals.push({ questionId: question.id, signalId: `${question.id}:left`, effects: question.left.effects || {} });
      signals.push({ questionId: question.id, signalId: `${question.id}:right`, effects: question.right.effects || {} });
    }
  });

  return signals;
}

function matchScore(effects, ideal) {
  return Object.entries(effects).reduce((sum, [trait, value]) => {
    if (value <= 0) return sum;
    return sum + (ideal[trait] || 0) * value;
  }, 0);
}

export function buildCoverageAudit() {
  const signals = collectSignals();
  const byQuestion = signals.reduce((acc, signal) => {
    if (!acc.has(signal.questionId)) acc.set(signal.questionId, []);
    acc.get(signal.questionId).push(signal);
    return acc;
  }, new Map());

  const table = new Map(
    SUBJECTS.map((subject) => [subject.id, { subject, primary: 0, secondary: 0, confusion: new Map() }])
  );

  byQuestion.forEach((questionSignals) => {
    const primarySet = new Set();
    const secondarySet = new Set();

    questionSignals.forEach((signal) => {
      const ranked = SUBJECTS.map((subject) => ({
        subject,
        score: matchScore(signal.effects, subject.ideal)
      })).sort((a, b) => b.score - a.score);

      const top = ranked[0];
      if (!top || top.score <= 0) return;

      const primaryBand = ranked.filter((entry) => entry.score >= top.score * 0.78 && entry.score > 0.12).slice(0, 3);
      const secondaryBand = ranked
        .filter((entry) => entry.score < top.score * 0.82 && entry.score >= top.score * 0.5 && entry.score > 0.08)
        .slice(0, 5);

      primaryBand.forEach((entry) => {
        primarySet.add(entry.subject.id);
      });

      const main = primaryBand[0] || top;
      secondaryBand.forEach((entry) => {
        secondarySet.add(entry.subject.id);
        const current = table.get(main.subject.id).confusion.get(entry.subject.name) || 0;
        table.get(main.subject.id).confusion.set(entry.subject.name, current + 1);
      });
    });

    primarySet.forEach((subjectId) => {
      table.get(subjectId).primary += 1;
    });

    secondarySet.forEach((subjectId) => {
      table.get(subjectId).secondary += 1;
    });
  });

  return SUBJECTS.map((subject) => {
    const row = table.get(subject.id);
    const confusion = Array.from(row.confusion.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => `${name} (${count})`);

    return {
      id: subject.id,
      name: subject.name,
      primary: row.primary,
      secondary: row.secondary,
      confusion
    };
  }).sort((a, b) => a.name.localeCompare(b.name, "cs"));
}

export function buildCoverageAuditSummaryLines() {
  return buildCoverageAudit().map((item) => {
    const confusion = item.confusion.length ? item.confusion.join(", ") : "-";
    return `${item.name}: hlavni=${item.primary}, vedlejsi=${item.secondary}, zamena=${confusion}`;
  });
}
