// Shared header/footer + small interactions for every page.
const REUNION_START = new Date('2027-07-16T16:00:00'); // ← change the reunion date here

const SEAL = `
<svg class="seal" viewBox="0 0 100 100" aria-hidden="true">
  <defs><path id="sealCircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
  <circle cx="50" cy="50" r="49" fill="#1F3A2E"/>
  <g class="seal-spin">
    <text font-family="Hanken Grotesk" font-size="9.2" font-weight="700" letter-spacing="3.1" fill="#D9A441">
      <textPath href="#sealCircle">GREGGS • JOHNSON • BROWN • FAMILY •</textPath>
    </text>
  </g>
  <circle cx="50" cy="50" r="26" fill="none" stroke="#D9A441" stroke-width=".8" opacity=".6"/>
  <text x="50" y="58" text-anchor="middle" font-family="Fraunces" font-style="italic" font-size="23" fill="#F6EFE3">gjb</text>
</svg>`;

const ARROW = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const PAGES = [
  ['index.html', 'Home'],
  ['story.html', 'Our Story'],
  ['gallery.html', 'Gallery'],
  ['events.html', 'Reunion & Events'],
];

function renderHeader() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const links = PAGES.map(([href, label]) =>
    `<a class="nav-link" href="${href}" ${href === here ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  const el = document.getElementById('site-header');
  if (!el) return;
  el.className = 'site-header';
  el.innerHTML = `
    <div class="wrap" style="position:relative">
      <nav class="nav" aria-label="Main">
        <a class="brand" href="index.html" aria-label="Greggs Johnson Brown Family Reunion — home">
          ${SEAL}
          <span class="brand-name">Greggs · Johnson · Brown<small>Family Reunion</small></span>
        </a>
        <div class="nav-links">${links}</div>
        <div style="display:flex;gap:.5rem;align-items:center">
          <a class="btn btn-clay" href="events.html#rsvp" style="display:none" data-desktop>RSVP ${ARROW}</a>
          <button class="icon-btn menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 14h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </nav>
      <div class="mobile-menu" id="mobile-menu">${links}<a class="btn btn-clay" href="events.html#rsvp" style="justify-content:center;margin-top:.5rem">RSVP for the reunion</a></div>
    </div>`;
  const mq = matchMedia('(min-width: 900px)');
  const rsvp = el.querySelector('[data-desktop]');
  const sync = () => (rsvp.style.display = mq.matches ? 'inline-flex' : 'none');
  sync(); mq.addEventListener('change', sync);
  const toggle = el.querySelector('.menu-toggle');
  const menu = el.querySelector('#mobile-menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.className = 'site-footer';
  el.innerHTML = `
    <div class="quilt quilt-thin"></div>
    <div class="wrap" style="padding-block:var(--s-7) var(--s-5)">
      <div style="display:grid;gap:var(--s-6);grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">
        <div style="max-width:22rem">
          <div class="brand" style="color:var(--paper)">${SEAL}<span class="brand-name">Greggs · Johnson · Brown<small style="color:var(--gold)">Family Reunion</small></span></div>
          <p style="margin-top:var(--s-3);font-size:.95rem">Three family lines, one table. Rooted long before the records began — still growing.</p>
        </div>
        <div>
          <p class="eyebrow" style="color:var(--gold)">Explore</p>
          <ul style="list-style:none;padding:0;margin:var(--s-3) 0 0;display:grid;gap:.5rem">
            ${PAGES.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <p class="eyebrow" style="color:var(--gold)">Stay in touch</p>
          <ul style="list-style:none;padding:0;margin:var(--s-3) 0 0;display:grid;gap:.5rem">
            <li><a href="mailto:reunion@example.com">reunion@example.com</a></li>
            <li><a href="#">Family Facebook Group</a></li>
            <li><a href="story.html#share">Share a family story</a></li>
          </ul>
        </div>
      </div>
      <div style="margin-top:var(--s-6);padding-top:var(--s-4);border-top:1px solid rgba(246,239,227,.12);display:flex;flex-wrap:wrap;gap:var(--s-2);justify-content:space-between;font-size:.85rem">
        <span>© ${new Date().getFullYear()} Greggs · Johnson · Brown Family</span>
        <span style="font-family:Fraunces,serif;font-style:italic">“We are what they grew — and we’re still growing.”</span>
      </div>
    </div>`;
}

function startCountdown() {
  const nodes = document.querySelectorAll('[data-count]');
  if (!nodes.length) return;
  const tick = () => {
    let diff = Math.max(0, REUNION_START - new Date());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    const v = { d, h, m, s };
    nodes.forEach(n => (n.textContent = String(v[n.dataset.count]).padStart(2, '0')));
  };
  tick(); setInterval(tick, 1000);
}

function startReveal() {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

renderHeader();
renderFooter();
startCountdown();
startReveal();
