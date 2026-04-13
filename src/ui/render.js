import { TRAIT_LABELS } from "../data/traits.js";

export function setActiveView(viewId) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  document.body.dataset.activeView = viewId;
}

export function renderQuestion(question, state, index, total) {
  document.getElementById('questionMeta').textContent = `Otázka ${index}/${total}`;
  document.getElementById('questionTitle').textContent = question.prompt;
  document.getElementById('questionHint').textContent = question.hint || '';
  document.getElementById('progressText').textContent = `${Math.round((index - 1) / total * 100)} %`;
  document.getElementById('progressBar').style.width = `${Math.round((index - 1) / total * 100)}%`;

  const body = document.getElementById('questionBody');
  body.innerHTML = '';

  if (question.type === 'single') {
    const wrap = document.createElement('div');
    wrap.className = 'option-list';
    question.options.forEach((option) => {
      const card = document.createElement('button');
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
        up.className = 'ghost';
        up.textContent = '↑';
        up.disabled = idx === 0;
        up.onclick = () => {
          [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
          redraw();
        };
        const down = document.createElement('button');
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

export function renderResults({ rankedSubjects, narrative, clusters, whyNot, state, mode }) {
  const topResults = document.getElementById('topResults');
  topResults.innerHTML = '';
  rankedSubjects.slice(0, 5).forEach((subject, idx) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <p class="eyebrow">#${idx + 1} · ${subject.cluster}</p>
      <h3>${subject.name}</h3>
      <div class="score">${subject.scores.final}</div>
      <p class="muted">Confidence: ${subject.confidence}</p>
      <table class="metric-table">
        <tr><td>Interest fit</td><td>${subject.scores.interestFit}</td></tr>
        <tr><td>Aptitude fit</td><td>${subject.scores.aptitudeFit}</td></tr>
        <tr><td>Work-style fit</td><td>${subject.scores.workStyleFit}</td></tr>
        <tr><td>Motivation fit</td><td>${subject.scores.motivationFit}</td></tr>
      </table>
    `;
    topResults.appendChild(card);
  });

  document.getElementById('narrativeBlock').innerHTML = `
    <p class="eyebrow">Interpretace · ${mode}</p>
    <h3>${narrative.title}</h3>
    ${narrative.paragraphs.map((p) => `<p>${p}</p>`).join('')}
  `;

  document.getElementById('clusterBlock').innerHTML = `
    <h3>Silné clustery</h3>
    ${clusters.map((c) => `<p><strong>${c.cluster}</strong><br>${c.items.join(', ')}</p>`).join('')}
  `;

  document.getElementById('conflictBlock').innerHTML = `
    <h3>Konflikty a jistota</h3>
    ${state.contradictions.length
      ? `<ul class="simple-list">${state.contradictions.map((c) => `<li class="warning">${c.label}</li>`).join('')}</ul>`
      : '<p>Bez výrazných rozporů.</p>'}
    <p class="muted">Confidence signály: ${state.confidenceSignals.length ? state.confidenceSignals.map((n) => Math.round(n * 100)).join(', ') : 'žádné'}</p>
  `;

  const sortedTraits = Object.entries(state.traits).sort((a, b) => b[1] - a[1]).slice(0, 8);
  document.getElementById('profileBlock').innerHTML = `
    <h3>Dominantní profil</h3>
    <ul class="simple-list">
      ${sortedTraits.map(([k, v]) => `<li>${TRAIT_LABELS[k] || k}: ${Math.round(v * 100)}</li>`).join('')}
    </ul>
  `;

  document.getElementById('whyNotBlock').innerHTML = `
    <h3>Proč ne jiné směry</h3>
    ${whyNot.map((item) => `<p><strong>${item.name}</strong><br>${item.whyNot}</p>`).join('')}
  `;
}

export function renderDebug(state, rankedSubjects) {
  const debug = document.getElementById('debugPanel');
  const traits = Object.entries(state.traits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([k, v]) => `<li>${TRAIT_LABELS[k] || k}: ${Math.round(v * 100)}</li>`)
    .join('');

  debug.innerHTML = `
    <div class="debug-block">
      <strong>Odpovězeno</strong>
      <p class="mono">${state.selectedQuestionIds.join(', ') || '-'}</p>
    </div>
    <div class="debug-block">
      <strong>Top traits</strong>
      <ul class="simple-list mono">${traits}</ul>
    </div>
    <div class="debug-block">
      <strong>Top ranking</strong>
      <ol class="simple-list mono">
        ${rankedSubjects.slice(0, 5).map((s) => `<li>${s.name}: ${s.scores.final}</li>`).join('')}
      </ol>
    </div>
  `;
}
