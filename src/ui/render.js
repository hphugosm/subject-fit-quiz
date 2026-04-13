import { TRAIT_LABELS } from "../data/traits.js";

let chartInstances = [];

function destroyCharts() {
  chartInstances.forEach((chart) => chart.destroy());
  chartInstances = [];
}

function buildChartPalette(count) {
  const palette = [
    '#991136',
    '#bb2e4c',
    '#d04e69',
    '#8d2b00',
    '#3c6a00',
    '#5c8f1b',
    '#6f4f56',
    '#8c7072'
  ];
  return Array.from({ length: count }, (_, index) => palette[index % palette.length]);
}

function renderCharts(rankedSubjects, state, ui) {
  destroyCharts();

  if (typeof window.Chart === 'undefined') return;

  const subjectsCanvas = document.getElementById('subjectsPieChart');
  const traitsCanvas = document.getElementById('traitsPieChart');
  if (!subjectsCanvas || !traitsCanvas) return;

  const topSubjects = rankedSubjects.slice(0, 5);
  const topTraits = Object.entries(state.traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const subjectChart = new window.Chart(subjectsCanvas, {
    type: 'pie',
    data: {
      labels: topSubjects.map((s) => s.name),
      datasets: [
        {
          data: topSubjects.map((s) => Number(s.scores.final)),
          backgroundColor: buildChartPalette(topSubjects.length)
        }
      ]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}`
          }
        }
      }
    }
  });

  const traitChart = new window.Chart(traitsCanvas, {
    type: 'doughnut',
    data: {
      labels: topTraits.map(([key]) => TRAIT_LABELS[key] || key),
      datasets: [
        {
          data: topTraits.map(([, value]) => Math.round(value * 100)),
          backgroundColor: buildChartPalette(topTraits.length)
        }
      ]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}`
          }
        }
      }
    }
  });

  chartInstances.push(subjectChart, traitChart);
}

export function setActiveView(viewId) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  document.body.dataset.activeView = viewId;
}

export function renderQuestion(question, state, index, total, ui = {}) {
  const questionPrefix = ui.questionPrefix || 'Otazka';
  document.getElementById('questionMeta').textContent = `${questionPrefix} ${index}/${total}`;
  document.getElementById('questionTitle').textContent = question.prompt;
  document.getElementById('questionHint').textContent = question.hint || '';
  document.getElementById('progressText').textContent = `${Math.round((index - 1) / total * 100)} %`;
  document.getElementById('progressBar').style.width = `${Math.round((index - 1) / total * 100)}%`;

  const body = document.getElementById('questionBody');
  body.innerHTML = '';

  if (question.type === 'single') {
    const wrap = document.createElement('div');
    wrap.className = 'option-list';
    const preselected = state.answers[question.id]?.optionId;
    if (preselected) wrap.dataset.selected = preselected;
    question.options.forEach((option) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'option-card';
      if (state.answers[question.id]?.optionId === option.id) card.classList.add('selected');
      card.innerHTML = `<strong>${option.label}</strong>`;
      card.onclick = () => {
        wrap.querySelectorAll('.option-card').forEach((n) => n.classList.remove('selected'));
        card.classList.add('selected');
        wrap.dataset.selected = option.id;
      };
      wrap.appendChild(card);
    });
    body.appendChild(wrap);
  }

  if (question.type === 'ranked') {
    const order = state.answers[question.id]?.order?.slice() || question.options.map((o) => o.id);
    const wrap = document.createElement('div');
    wrap.className = 'ranked-list';

    function redraw() {
      wrap.innerHTML = '';
      order.forEach((id, idx) => {
        const option = question.options.find((o) => o.id === id);
        const row = document.createElement('div');
        row.className = 'option-card ranked-item';
        row.innerHTML = `<div><span class="badge">#${idx + 1}</span></div><div><strong>${option.label}</strong></div>`;
        const controls = document.createElement('div');
        controls.className = 'rank-controls';
        const up = document.createElement('button');
        up.type = 'button';
        up.className = 'ghost';
        up.textContent = '↑';
        up.disabled = idx === 0;
        up.onclick = () => {
          [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
          redraw();
        };
        const down = document.createElement('button');
        down.type = 'button';
        down.className = 'ghost';
        down.textContent = '↓';
        down.disabled = idx === order.length - 1;
        down.onclick = () => {
          [order[idx + 1], order[idx]] = [order[idx], order[idx + 1]];
          redraw();
        };
        controls.append(up, down);
        row.appendChild(controls);
        wrap.appendChild(row);
      });
      wrap.dataset.order = JSON.stringify(order);
    }
    redraw();
    body.appendChild(wrap);
  }

  if (question.type === 'pairwise') {
    const initial = state.answers[question.id]?.value ?? 50;
    const wrap = document.createElement('div');
    wrap.className = 'pair-grid';
    wrap.innerHTML = `
      <button class="option-card" data-side="left"><strong>${question.left.label}</strong></button>
      <div class="pair-center">vs</div>
      <button class="option-card" data-side="right"><strong>${question.right.label}</strong></button>
    `;
    const scale = document.createElement('div');
    scale.className = 'scale-row';
    scale.innerHTML = `
      <div class="small-note">0 = úplně vlevo, 100 = úplně vpravo</div>
      <input type="range" min="0" max="100" value="${initial}" />
      <div class="muted">Aktuální pozice: <span class="mono">${initial}</span></div>
    `;
    const input = scale.querySelector('input');
    const valueBox = scale.querySelector('.mono');
    input.oninput = () => {
      valueBox.textContent = input.value;
      scale.dataset.value = input.value;
    };
    scale.dataset.value = String(initial);
    body.append(wrap, scale);
  }

  if (question.type === 'confidence') {
    const initial = state.answers[question.id]?.value ?? 70;
    const scale = document.createElement('div');
    scale.className = 'scale-row';
    scale.innerHTML = `
      <input type="range" min="0" max="100" value="${initial}" />
      <div class="muted">Jistota: <span class="mono">${initial}</span>/100</div>
    `;
    const input = scale.querySelector('input');
    const valueBox = scale.querySelector('.mono');
    input.oninput = () => {
      valueBox.textContent = input.value;
      scale.dataset.value = input.value;
    };
    scale.dataset.value = String(initial);
    body.appendChild(scale);
  }
}

export function collectQuestionAnswer(question) {
  const body = document.getElementById('questionBody');
  if (question.type === 'single') {
    const selected = body.querySelector('.option-list')?.dataset.selected;
    if (!selected) return null;
    return { optionId: selected };
  }
  if (question.type === 'ranked') {
    const order = body.querySelector('.ranked-list')?.dataset.order;
    return order ? { order: JSON.parse(order) } : null;
  }
  if (question.type === 'pairwise') {
    const value = body.querySelector('.scale-row')?.dataset.value;
    return value ? { value: Number(value) } : null;
  }
  if (question.type === 'confidence') {
    const value = body.querySelector('.scale-row')?.dataset.value;
    return value ? { value: Number(value) } : null;
  }
  return null;
}

export function renderResults({ rankedSubjects, narrative, clusters, whyNot, state, mode, ui = {} }) {
  const t = {
    interpretationLabel: ui.interpretationLabel || 'Interpretace',
    clustersTitle: ui.clustersTitle || 'Silne clustery',
    conflictTitle: ui.conflictTitle || 'Konflikty a jistota',
    noContradictions: ui.noContradictions || 'Bez vyraznych rozporu.',
    confidenceSignals: ui.confidenceSignals || 'Confidence signaly',
    noSignals: ui.noSignals || 'zadne',
    profileTitle: ui.profileTitle || 'Dominantni profil',
    whyNotTitle: ui.whyNotTitle || 'Proc ne jine smery',
    metricInterest: ui.metricInterest || 'Interest fit',
    metricAptitude: ui.metricAptitude || 'Aptitude fit',
    metricWorkStyle: ui.metricWorkStyle || 'Work-style fit',
    metricMotivation: ui.metricMotivation || 'Motivation fit',
    confidenceLabel: ui.confidenceLabel || 'Confidence',
    chartSubjectsTitle: ui.chartSubjectsTitle || 'Rozložení Top 5',
    chartTraitsTitle: ui.chartTraitsTitle || 'Rozložení hlavních rysů'
  };

  const subjectsChartTitle = document.getElementById('chartSubjectsTitle');
  if (subjectsChartTitle) subjectsChartTitle.textContent = t.chartSubjectsTitle;
  const traitsChartTitle = document.getElementById('chartTraitsTitle');
  if (traitsChartTitle) traitsChartTitle.textContent = t.chartTraitsTitle;

  const topResults = document.getElementById('topResults');
  topResults.innerHTML = '';
  rankedSubjects.slice(0, 5).forEach((subject, idx) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <p class="eyebrow">#${idx + 1} · ${subject.cluster}</p>
      <h3>${subject.name}</h3>
      <div class="score">${subject.scores.final}</div>
      <p class="muted">${t.confidenceLabel}: ${subject.confidence}</p>
      <table class="metric-table">
        <tr><td>${t.metricInterest}</td><td>${subject.scores.interestFit}</td></tr>
        <tr><td>${t.metricAptitude}</td><td>${subject.scores.aptitudeFit}</td></tr>
        <tr><td>${t.metricWorkStyle}</td><td>${subject.scores.workStyleFit}</td></tr>
        <tr><td>${t.metricMotivation}</td><td>${subject.scores.motivationFit}</td></tr>
      </table>
    `;
    topResults.appendChild(card);
  });

  document.getElementById('narrativeBlock').innerHTML = `
    <p class="eyebrow">${t.interpretationLabel} · ${mode}</p>
    <h3>${narrative.title}</h3>
    ${narrative.paragraphs.map((p) => `<p>${p}</p>`).join('')}
  `;

  document.getElementById('clusterBlock').innerHTML = `
    <h3>${t.clustersTitle}</h3>
    ${clusters.map((c) => `<p><strong>${c.cluster}</strong><br>${c.items.join(', ')}</p>`).join('')}
  `;

  document.getElementById('conflictBlock').innerHTML = `
    <h3>${t.conflictTitle}</h3>
    ${state.contradictions.length
      ? `<ul class="simple-list">${state.contradictions.map((c) => `<li class="warning">${c.label}</li>`).join('')}</ul>`
      : `<p>${t.noContradictions}</p>`}
    <p class="muted">${t.confidenceSignals}: ${state.confidenceSignals.length ? state.confidenceSignals.map((n) => Math.round(n * 100)).join(', ') : t.noSignals}</p>
  `;

  const sortedTraits = Object.entries(state.traits).sort((a, b) => b[1] - a[1]).slice(0, 8);
  document.getElementById('profileBlock').innerHTML = `
    <h3>${t.profileTitle}</h3>
    <ul class="simple-list">
      ${sortedTraits.map(([k, v]) => `<li>${TRAIT_LABELS[k] || k}: ${Math.round(v * 100)}</li>`).join('')}
    </ul>
  `;

  document.getElementById('whyNotBlock').innerHTML = `
    <h3>${t.whyNotTitle}</h3>
    ${whyNot.map((item) => `<p><strong>${item.name}</strong><br>${item.whyNot}</p>`).join('')}
  `;

  renderCharts(rankedSubjects, state, t);
}

function dataUrlToUint8Array(dataUrl) {
  const base64 = dataUrl.split(',')[1] || '';
  const binary = window.atob(base64);
  const length = binary.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function buildModeLabel(mode, uiStrings) {
  if (mode === 'interest') return uiStrings.modeInterest || mode;
  if (mode === 'strength') return uiStrings.modeStrength || mode;
  if (mode === 'career') return uiStrings.modeCareer || mode;
  return uiStrings.modeBalanced || mode;
}

export async function exportResultsToDocx({ rankedSubjects, narrative, clusters, whyNot, state, mode, ui = {}, uiCs = {}, uiEn = {} }) {
  if (!window.docx?.Document || typeof window.saveAs !== 'function') {
    alert(ui.exportUnavailableAlert || 'DOCX knihovna není načtená.');
    return;
  }

  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    ImageRun
  } = window.docx;

  const topSubjects = rankedSubjects.slice(0, 5);
  const topTraits = Object.entries(state.traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const titleCs = uiCs.exportTitle || 'Vysledky quizu';
  const titleEn = uiEn.exportTitle || 'Quiz results';
  const modeCs = buildModeLabel(mode, uiCs);
  const modeEn = buildModeLabel(mode, uiEn);

  const paragraphs = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      children: [new TextRun({ text: `${titleCs} / ${titleEn}`, bold: true })]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${uiCs.resultModeLabel || 'Rezim'}: ${modeCs}`, bold: true }),
        new TextRun({ text: ' | ' }),
        new TextRun({ text: `${uiEn.resultModeLabel || 'Mode'}: ${modeEn}`, bold: true })
      ]
    }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: `Top 5 ${uiCs.resultsTitle || 'doporuceni'} / Top 5 ${uiEn.resultsTitle || 'recommendations'}`, heading: HeadingLevel.HEADING_2 })
  ];

  topSubjects.forEach((subject, index) => {
    paragraphs.push(
      new Paragraph({
        text: `${index + 1}. ${subject.name} (${subject.scores.final}) - ${uiCs.confidenceLabel || 'Mira jistoty'}: ${subject.confidence}% | ${uiEn.confidenceLabel || 'Confidence'}: ${subject.confidence}%`,
        bullet: { level: 0 }
      })
    );
  });

  paragraphs.push(
    new Paragraph({ text: '' }),
    new Paragraph({ text: `${uiCs.interpretationLabel || 'Vysvetleni'} / ${uiEn.interpretationLabel || 'Interpretation'}`, heading: HeadingLevel.HEADING_2 }),
    new Paragraph({ text: narrative.title }),
    ...narrative.paragraphs.map((text) => new Paragraph({ text })),
    new Paragraph({ text: '' }),
    new Paragraph({ text: `${uiCs.clustersTitle || 'Silne skupiny'} / ${uiEn.clustersTitle || 'Strong clusters'}`, heading: HeadingLevel.HEADING_2 })
  );

  clusters.forEach((cluster) => {
    paragraphs.push(new Paragraph({ text: `${cluster.cluster}: ${cluster.items.join(', ')}`, bullet: { level: 0 } }));
  });

  paragraphs.push(
    new Paragraph({ text: '' }),
    new Paragraph({ text: `${uiCs.conflictTitle || 'Rozpory a jistota'} / ${uiEn.conflictTitle || 'Conflicts and confidence'}`, heading: HeadingLevel.HEADING_2 })
  );

  if (state.contradictions.length) {
    state.contradictions.forEach((item) => {
      paragraphs.push(new Paragraph({ text: item.label, bullet: { level: 0 } }));
    });
  } else {
    paragraphs.push(new Paragraph({ text: `${uiCs.noContradictions || 'Bez vyraznych rozporu.'} / ${uiEn.noContradictions || 'No major contradictions.'}` }));
  }

  const signals = state.confidenceSignals.length
    ? state.confidenceSignals.map((value) => Math.round(value * 100)).join(', ')
    : `${uiCs.noSignals || 'zadne'} / ${uiEn.noSignals || 'none'}`;
  paragraphs.push(
    new Paragraph({ text: `${uiCs.confidenceSignals || 'Signaly jistoty'}: ${signals}` }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: `${uiCs.profileTitle || 'Hlavni profil'} / ${uiEn.profileTitle || 'Main profile'}`, heading: HeadingLevel.HEADING_2 })
  );

  topTraits.forEach(([key, value]) => {
    paragraphs.push(new Paragraph({ text: `${TRAIT_LABELS[key] || key}: ${Math.round(value * 100)}`, bullet: { level: 0 } }));
  });

  paragraphs.push(
    new Paragraph({ text: '' }),
    new Paragraph({ text: `${uiCs.whyNotTitle || 'Proc ne jine smery'} / ${uiEn.whyNotTitle || 'Why not other directions'}`, heading: HeadingLevel.HEADING_2 })
  );

  whyNot.forEach((item) => {
    paragraphs.push(new Paragraph({ text: `${item.name}: ${item.whyNot}`, bullet: { level: 0 } }));
  });

  const subjectsChartImage = document.getElementById('subjectsPieChart')?.toDataURL('image/png');
  const traitsChartImage = document.getElementById('traitsPieChart')?.toDataURL('image/png');

  if (subjectsChartImage) {
    paragraphs.push(
      new Paragraph({ text: '' }),
      new Paragraph({ text: `${uiCs.chartSubjectsTitle || 'Rozlozeni Top 5'} / ${uiEn.chartSubjectsTitle || 'Top 5 distribution'}`, heading: HeadingLevel.HEADING_2 }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: dataUrlToUint8Array(subjectsChartImage),
            transformation: { width: 420, height: 260 }
          })
        ]
      })
    );
  }

  if (traitsChartImage) {
    paragraphs.push(
      new Paragraph({ text: '' }),
      new Paragraph({ text: `${uiCs.chartTraitsTitle || 'Rozlozeni hlavnich rysu'} / ${uiEn.chartTraitsTitle || 'Main traits distribution'}`, heading: HeadingLevel.HEADING_2 }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new ImageRun({
            data: dataUrlToUint8Array(traitsChartImage),
            transformation: { width: 420, height: 260 }
          })
        ]
      })
    );
  }

  const doc = new Document({ sections: [{ children: paragraphs }] });
  const blob = await Packer.toBlob(doc);
  window.saveAs(blob, ui.exportFileName || 'subject-fit-results.docx');
}

export function renderDebug(state, rankedSubjects, ui = {}) {
  const t = {
    debugAnswered: ui.debugAnswered || 'Odpovezeno',
    debugTopTraits: ui.debugTopTraits || 'Top traits',
    debugTopRanking: ui.debugTopRanking || 'Top ranking'
  };

  const debug = document.getElementById('debugPanel');
  const traits = Object.entries(state.traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([k, v]) => `<li>${TRAIT_LABELS[k] || k}: ${Math.round(v * 100)}</li>`)
    .join('');

  debug.innerHTML = `
    <div class="debug-block">
      <strong>${t.debugAnswered}</strong>
      <p class="mono">${state.selectedQuestionIds.join(', ') || '-'}</p>
    </div>
    <div class="debug-block">
      <strong>${t.debugTopTraits}</strong>
      <ul class="simple-list mono">${traits}</ul>
    </div>
    <div class="debug-block">
      <strong>${t.debugTopRanking}</strong>
      <ol class="simple-list mono">
        ${rankedSubjects.slice(0, 5).map((s) => `<li>${s.name}: ${s.scores.final}</li>`).join('')}
      </ol>
    </div>
  `;
}
