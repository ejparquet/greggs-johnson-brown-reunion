// Family tree: builds relationships from assets/ancestors.js, renders each
// line by generation with parent → children connectors, and powers the
// person detail panel and search. Exposes window.FamilyTree.showTree(key).
(() => {
  const TREES = window.FAMILY_TREES || {};
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const arr = v => (v == null || v === '' ? [] : Array.isArray(v) ? v : [v]);
  const uniq = a => [...new Set(a)];
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const ARROW = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // ---------- Index everyone and their relationships ----------
  const P = new Map();
  for (const [line, fam] of Object.entries(TREES)) {
    for (const p of fam.people || []) {
      if (!p.id) { console.warn('[family tree] person without id:', p.name); continue; }
      if (P.has(p.id)) console.warn('[family tree] duplicate id:', p.id);
      P.set(p.id, { ...p, line });
    }
  }
  const spouses = new Map(), kids = new Map();
  for (const id of P.keys()) { spouses.set(id, new Set()); kids.set(id, []); }
  for (const p of P.values()) {
    for (const s of arr(p.spouse)) {
      if (!P.has(s)) { console.warn(`[family tree] ${p.id}: unknown spouse "${s}"`); continue; }
      spouses.get(p.id).add(s); spouses.get(s).add(p.id);
    }
    p.parents = arr(p.parents).filter(id => P.has(id) || (console.warn(`[family tree] ${p.id}: unknown parent "${id}"`), false));
    for (const par of p.parents) kids.get(par).push(p.id);
  }
  const spousesOf = id => [...spouses.get(id)];
  const childrenOf = id => kids.get(id) || [];
  const grandchildrenOf = id => uniq(childrenOf(id).flatMap(childrenOf));
  const siblingsOf = id => uniq(P.get(id).parents.flatMap(childrenOf)).filter(x => x !== id);

  // Generation depth: one below the deepest parent; people who married in take their spouse's generation.
  const genCache = new Map();
  const gen = (id, seen = new Set()) => {
    if (genCache.has(id)) return genCache.get(id);
    if (seen.has(id)) return 0;
    seen.add(id);
    const p = P.get(id);
    let g = 0;
    if (p.parents.length) g = Math.max(...p.parents.map(x => gen(x, seen))) + 1;
    else {
      const born = spousesOf(id).filter(s => P.get(s).parents.length);
      if (born.length) g = Math.max(...born.map(s => gen(s, seen)));
    }
    genCache.set(id, g);
    return g;
  };

  const lineIds = key => (TREES[key]?.people || []).map(p => p.id).filter(id => P.has(id));
  const lineMinGen = key => Math.min(...lineIds(key).map(id => gen(id)));
  const relGen = id => gen(id) - lineMinGen(P.get(id).line);
  const genLabel = (key, g) => {
    const note = TREES[key].generationNames?.[g];
    return `Generation ${ROMAN[g] || g + 1}${note ? ' · ' + note : ''}`;
  };

  // ---------- Small helpers ----------
  const initials = n => n.replace(/[\[\]]/g, '').split(/\s+/).filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
  const photoSrc = (p, w = 360, h = 450) => {
    const color = TREES[p.line].color, bg = color.slice(1), fg = color === '#D9A441' ? '1F3A2E' : 'F6EFE3';
    return p.photo || `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(initials(p.name))}&font=playfair-display`;
  };
  const nameLines = n => { const w = n.trim().split(/\s+/); return w.length > 1 ? [w.slice(0, -1).join(' '), w[w.length - 1]] : w; };
  const years = p => (p.died ? `${p.born || '?'} – ${p.died}` : `b. ${p.born || '?'}`);
  const lifeText = p => (p.died ? `${p.born || '?'} – ${p.died}` : `born ${p.born || '?'}, living`);
  const lineName = key => TREES[key].name.replace(/^The /, '').replace(/s$/, '');

  // ---------- Tree rendering ----------
  const personCard = (p, viewLine) => `
    <article class="person" data-person="${esc(p.id)}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="${esc(p.name)}, ${esc(lifeText(p))}. View details">
      <img src="${esc(photoSrc(p))}" alt="">
      ${p.line !== viewLine ? `<span class="person-line">${esc(lineName(p.line))} line</span>` : ''}
      <p class="person-name" aria-hidden="true">${nameLines(p.name).map(l => `<span>${esc(l)}</span>`).join('')}</p>
      <span class="person-kebab" aria-hidden="true"><svg width="4" height="18" viewBox="0 0 4 18" fill="currentColor"><circle cx="2" cy="2" r="2"/><circle cx="2" cy="9" r="2"/><circle cx="2" cy="16" r="2"/></svg></span>
    </article>`;
  const unitHTML = (unit, viewLine) => `<div class="unit${unit.length > 2 ? ' unit-multi' : ''}">${unit.map(id => personCard(P.get(id), viewLine)).join('<div class="bond" aria-hidden="true"><span></span></div>')}</div>`;

  // Group a line into generations → sibling clusters (children of the same parents) → units (person + spouses).
  const layout = key => {
    const ids = lineIds(key), inLine = new Set(ids);
    const minG = lineMinGen(key);
    const byGen = [];
    ids.forEach((id, i) => { const g = gen(id) - minG; (byGen[g] ||= []).push({ id, i }); });
    const placed = new Set(), order = new Map();
    let n = 0;
    return byGen.map((members = [], g) => {
      const clusters = new Map();
      const keyOf = id => P.get(id).parents.map(x => order.get(x) ?? Infinity);
      members
        .map(m => ({ ...m, k: Math.min(Infinity, ...keyOf(m.id)) }))
        .sort((a, b) => a.k - b.k || a.i - b.i)
        .forEach(({ id }) => {
          if (placed.has(id)) return;
          const p = P.get(id);
          // Married-in spouses are drawn beside the partner who was born into the line.
          if (!p.parents.length && spousesOf(id).some(s => P.get(s).parents.length && inLine.has(s) && !placed.has(s) && gen(s) - minG === g)) return;
          const sp = spousesOf(id).filter(s => !placed.has(s));
          const unit = sp.length >= 2 ? [sp[0], id, ...sp.slice(1)] : [id, ...sp];
          unit.forEach(u => { placed.add(u); order.set(u, n++); });
          const ck = [...p.parents].sort().join('|');
          if (!clusters.has(ck)) clusters.set(ck, { parents: p.parents, units: [] });
          clusters.get(ck).units.push(unit);
        });
      return { g, clusters: [...clusters.values()] };
    });
  };

  const clusterLabel = parents => {
    const names = parents.map(id => P.get(id).name);
    return `Children of ${esc(names.join(' & '))}`;
  };

  const tree = document.getElementById('tree');
  const pick = document.getElementById('family-pick');
  let currentLine = null, ro = null;

  const showTree = (key, scroll = true) => {
    const fam = TREES[key]; if (!fam) return;
    currentLine = key;
    pick.querySelectorAll('.family-card').forEach(b => b.setAttribute('aria-pressed', b.dataset.family === key));
    const rows = layout(key);
    tree.innerHTML = `
      <div class="tree-in">
        <svg class="tree-lines" aria-hidden="true"></svg>
        <div class="flex flex-wrap items-end justify-between gap-4 tree-head">
          <div>
            <p class="eyebrow">Family tree</p>
            <h3 style="font-size:clamp(2rem,4.5vw,3rem);margin-top:var(--s-2)">${esc(fam.name)} <em>line</em></h3>
          </div>
          <a class="link" href="story.html">Read their story ${ARROW}</a>
        </div>
        ${rows.map(r => `
          <section class="gen" aria-label="${esc(genLabel(key, r.g))}">
            <p class="gen-label">${esc(genLabel(key, r.g))}</p>
            <div class="gen-row">
              ${r.clusters.map(c => `
                <div class="cluster${c.parents.length ? '' : ' cluster-root'}" data-parents="${esc(c.parents.join('|'))}">
                  ${c.parents.length ? `<p class="cluster-label">${clusterLabel(c.parents)}</p>` : ''}
                  <div class="cluster-units">${c.units.map(u => unitHTML(u, key)).join('')}</div>
                </div>`).join('')}
            </div>
          </section>`).join('')}
      </div>`;
    tree.hidden = false;
    history.replaceState(null, '', '#ancestors-' + key);
    const inner = tree.querySelector('.tree-in');
    ro?.disconnect();
    ro = new ResizeObserver(() => drawLines(inner));
    ro.observe(inner);
    document.fonts?.ready.then(() => drawLines(inner));
    if (scroll) tree.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  // Elbow connectors from each couple down to their children's cluster.
  const drawLines = inner => {
    const svg = inner.querySelector('.tree-lines'); if (!svg) return;
    const box = inner.getBoundingClientRect();
    svg.setAttribute('width', 0); svg.setAttribute('height', 0); // measure without the old layer
    svg.setAttribute('width', inner.clientWidth); svg.setAttribute('height', inner.scrollHeight);
    const paths = [];
    inner.querySelectorAll('.cluster[data-parents]:not(.cluster-root)').forEach(cl => {
      const parentIds = cl.dataset.parents.split('|');
      const cards = parentIds.map(id => inner.querySelector(`.person[data-person="${CSS.escape(id)}"]`)).filter(Boolean);
      if (!cards.length) return; // parents live in another family line
      const unit = cards[0].closest('.unit');
      const sameUnit = cards.filter(c => c.closest('.unit') === unit);
      const rs = sameUnit.map(c => c.getBoundingClientRect());
      const x1 = rs.reduce((s, r) => s + r.left + r.width / 2, 0) / rs.length - box.left;
      const y1 = unit.getBoundingClientRect().bottom - box.top;
      const cr = cl.getBoundingClientRect();
      const x2 = cr.left + cr.width / 2 - box.left, y2 = cr.top - box.top;
      if (y2 <= y1) return;
      const ym = Math.max(y1 + 12, y2 - 18);
      const r = Math.min(10, Math.abs(x2 - x1) / 2, (ym - y1) / 2);
      const dir = Math.sign(x2 - x1);
      const d = dir === 0
        ? `M${x1},${y1} V${y2}`
        : `M${x1},${y1} V${ym - r} Q${x1},${ym} ${x1 + dir * r},${ym} H${x2 - dir * r} Q${x2},${ym} ${x2},${ym + r} V${y2}`;
      paths.push(`<path d="${d}"/><circle cx="${x1}" cy="${y1 + 2}" r="3.5"/>`);
    });
    svg.innerHTML = paths.join('');
  };

  // ---------- Family picker ----------
  pick.innerHTML = Object.entries(TREES).map(([key, fam]) => {
    const ids = lineIds(key), gens = ids.length ? Math.max(...ids.map(relGen)) + 1 : 0;
    return `
      <button class="family-card card" data-family="${key}" aria-pressed="false" aria-controls="tree" style="--fam:${fam.color}">
        <span class="mono"${fam.color === '#D9A441' ? ' style="color:var(--leaf)"' : ''}>${esc(fam.letter)}</span>
        <h3 style="font-size:2rem;margin-top:var(--s-4)">${esc(fam.name)}</h3>
        <p style="margin-top:var(--s-2);color:var(--ink-soft);font-size:.95rem">${esc(fam.blurb)}</p>
        <p style="margin-top:var(--s-3);font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--clay)">${gens} generations · ${ids.length} people</p>
        <span class="go">View the family tree
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v10m-4-4 4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button>`;
  }).join('');
  pick.addEventListener('click', e => { const b = e.target.closest('[data-family]'); if (b) showTree(b.dataset.family); });

  // ---------- Person detail panel ----------
  const dialog = document.getElementById('person-dialog');
  const pdContent = document.getElementById('pd-content');
  let history_ = [], currentId = null;

  const relChip = id => {
    const p = P.get(id);
    return `<button class="rel" data-open="${esc(p.id)}">
      <img src="${esc(photoSrc(p, 88, 88))}" alt="">
      <span class="rel-text"><b>${esc(p.name)}</b><span>${esc(years(p))}${p.line !== currentLineOf() ? ` · ${esc(lineName(p.line))} line` : ''}</span></span>
      ${ARROW}
    </button>`;
  };
  const currentLineOf = () => P.get(currentId)?.line;
  const relGroup = (title, ids, empty) => {
    if (!ids.length && !empty) return '';
    return `<div class="rel-group">
      <h4>${title}${ids.length > 1 ? ` <span>${ids.length}</span>` : ''}</h4>
      ${ids.length ? `<div class="rel-list">${ids.map(relChip).join('')}</div>` : `<p class="rel-empty">${empty}</p>`}
    </div>`;
  };

  const openPerson = (id, { push = false } = {}) => {
    const p = P.get(id); if (!p) return;
    if (push && currentId && currentId !== id) history_.push(currentId);
    currentId = id;
    const first = p.name.replace(/[\[\]]/g, '').split(/\s+/)[0];
    const life = p.died ? `${esc(p.born) || '?'} – ${esc(p.died)}` : `Born ${esc(p.born) || '?'} · Living`;
    const bio = p.bio
      ? `<div class="pd-bio">${p.bio.split(/\n\n+/).map(par => `<p>${esc(par)}</p>`).join('')}</div>`
      : `<div class="pd-bio empty"><p>We haven’t written ${esc(first)}’s story yet. Know where they lived, the work they did, or a memory of them? <a class="link" href="story.html#share">Share it with the family historian</a> and we’ll add it here.</p></div>`;
    const back = history_.length ? P.get(history_[history_.length - 1]) : null;
    pdContent.innerHTML = `
      <div class="photo pd-photo"><img src="${esc(photoSrc(p, 640, 800))}" alt="${p.photo ? 'Portrait of ' + esc(p.name) : ''}"></div>
      <div class="pd-body">
        ${back ? `<button class="pd-back" data-back><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3m4-4L3 8l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Back to ${esc(back.name)}</button>` : ''}
        <p class="eyebrow">${esc(TREES[p.line].name)} · Generation ${ROMAN[relGen(id)] || relGen(id) + 1}</p>
        <h3 class="pd-name" id="pd-name">${esc(p.name)}</h3>
        <p class="pd-life">${life}</p>
        <dl class="pd-facts">
          <div><dt>Born</dt><dd>${esc(p.born) || '—'}</dd></div>
          <div><dt>${p.died ? 'Died' : 'Status'}</dt><dd>${p.died ? esc(p.died) : '<span class="living">Living</span>'}</dd></div>
          ${p.place ? `<div><dt>Lived in</dt><dd>${esc(p.place)}</dd></div>` : ''}
        </dl>
        ${bio}
        <div class="pd-family">
          <p class="eyebrow" style="margin-bottom:var(--s-2)">Family</p>
          ${relGroup('Parents', p.parents)}
          ${relGroup(spousesOf(id).length > 1 ? 'Spouses' : 'Married to', spousesOf(id))}
          ${relGroup('Children', childrenOf(id), 'No children recorded yet.')}
          ${relGroup('Grandchildren', grandchildrenOf(id))}
          ${relGroup('Brothers & sisters', siblingsOf(id))}
        </div>
        <p style="margin-top:var(--s-4);font-size:.9rem;color:var(--ink-soft)">Missing someone, or have a photo or correction? <a class="link" href="story.html#share">Tell us</a></p>
      </div>`;
    if (!dialog.open) dialog.showModal();
    pdContent.scrollTop = 0;
    pdContent.querySelector('.pd-body').scrollTop = 0;
  };

  dialog.addEventListener('click', e => {
    if (e.target === dialog || e.target.closest('[data-close]')) return dialog.close();
    if (e.target.closest('[data-back]')) return openPerson(history_.pop());
    const s = e.target.closest('[data-open]'); if (s) openPerson(s.dataset.open, { push: true });
  });
  dialog.addEventListener('close', () => { history_ = []; currentId = null; });

  tree.addEventListener('click', e => { const b = e.target.closest('[data-person]'); if (b) { history_ = []; openPerson(b.dataset.person); } });
  tree.addEventListener('keydown', e => {
    const b = e.target.closest('[data-person]');
    if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); history_ = []; openPerson(b.dataset.person); }
  });

  // ---------- Search ----------
  const input = document.getElementById('person-search');
  const results = document.getElementById('search-results');
  if (input && results) {
    const all = [...P.values()];
    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.hidden = true; results.innerHTML = ''; return; }
      const hits = all.filter(p => `${p.name} ${p.place || ''}`.toLowerCase().includes(q)).slice(0, 8);
      results.hidden = false;
      results.innerHTML = hits.length
        ? hits.map(p => `<button class="rel" data-search="${esc(p.id)}"><img src="${esc(photoSrc(p, 88, 88))}" alt=""><span class="rel-text"><b>${esc(p.name)}</b><span>${esc(years(p))} · ${esc(lineName(p.line))} line</span></span>${ARROW}</button>`).join('')
        : `<p class="rel-empty" style="padding:var(--s-2) var(--s-3)">No one by that name yet. <a class="link" href="story.html#share">Tell us about them</a></p>`;
    };
    input.addEventListener('input', render);
    results.addEventListener('click', e => {
      const b = e.target.closest('[data-search]'); if (!b) return;
      history_ = []; openPerson(b.dataset.search);
    });
  }

  window.FamilyTree = { showTree };
})();
