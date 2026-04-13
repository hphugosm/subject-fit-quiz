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

export async function exportResultsToPdf({ rankedSubjects, narrative, clusters, whyNot, state, mode, ui = {} }) {
  if (!window.jspdf?.jsPDF) {
    alert('PDF knihovna není načtená.');
    return;
  }

  const t = {
    exportTitle: ui.exportTitle || 'Výsledky quizu',
    interpretationLabel: ui.interpretationLabel || 'Vysvětlení',
    clustersTitle: ui.clustersTitle || 'Silné skupiny',
    conflictTitle: ui.conflictTitle || 'Rozpory a jistota',
    whyNotTitle: ui.whyNotTitle || 'Proč ne jiné směry',
    confidenceLabel: ui.confidenceLabel || 'Míra jistoty'
  };

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const subjectsChartCanvas = document.getElementById('subjectsPieChart');
  const traitsChartCanvas = document.getElementById('traitsPieChart');
  const subjectsChartImage = subjectsChartCanvas?.toDataURL('image/png');
  const traitsChartImage = traitsChartCanvas?.toDataURL('image/png');

  doc.setFillColor(245, 243, 243);
  doc.rect(24, 24, 548, 794, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(t.exportTitle, 44, 60);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${t.interpretationLabel}: ${mode}`, 44, 78);

  const top = rankedSubjects.slice(0, 5);
  doc.setFont('helvetica', 'bold');
  doc.text('Top 5', 44, 110);
  doc.setFont('helvetica', 'normal');
  top.forEach((subject, index) => {
    doc.text(`${index + 1}. ${subject.name} (${subject.scores.final})`, 44, 130 + index * 16);
  });

  if (subjectsChartImage) doc.addImage(subjectsChartImage, 'PNG', 320, 98, 220, 180);
  if (traitsChartImage) doc.addImage(traitsChartImage, 'PNG', 320, 292, 220, 180);

  doc.setFont('helvetica', 'bold');
  doc.text(t.interpretationLabel, 44, 240);
  doc.setFont('helvetica', 'normal');
  doc.text(doc.splitTextToSize(narrative.title, 250), 44, 258);
  const paragraphText = narrative.paragraphs.join(' ');
  doc.text(doc.splitTextToSize(paragraphText, 250), 44, 288);

  doc.setFont('helvetica', 'bold');
  doc.text(t.clustersTitle, 44, 500);
  doc.setFont('helvetica', 'normal');
  clusters.forEach((cluster, index) => {
    doc.text(`${cluster.cluster}: ${cluster.items.join(', ')}`, 44, 520 + index * 16);
  });

  doc.addPage();
  doc.setFillColor(245, 243, 243);
  doc.rect(24, 24, 548, 794, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(t.conflictTitle, 44, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);

  if (state.contradictions.length) {
    state.contradictions.forEach((item, index) => {
      doc.text(`- ${item.label}`, 44, 84 + index * 16);
    });
  } else {
    doc.text('Bez výrazných rozporů.', 44, 84);
  }

  doc.text(`${t.confidenceLabel}: ${state.confidenceSignals.length ? state.confidenceSignals.map((n) => Math.round(n * 100)).join(', ') : 'žádné'}`, 44, 140);

  doc.setFont('helvetica', 'bold');
  doc.text(t.whyNotTitle, 44, 184);
  doc.setFont('helvetica', 'normal');
  whyNot.forEach((item, index) => {
    doc.text(doc.splitTextToSize(`${item.name}: ${item.whyNot}`, 500), 44, 206 + index * 54);
  });

  doc.save('subject-fit-results.pdf');
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
