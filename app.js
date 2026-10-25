/**
 * AMbinex Master Application Logic
 * Brand: AMbinex | Statement: Build your growth.
 * Verified Cadence: 3-Week Zero-to-Production | Baseline Cost Reduction: -12%
 */

document.addEventListener('DOMContentLoaded', () => {
  initTelemetryClock();
  initCliTerminal();
  initRoiCalculator();
  initBrandModal();
  initEngagementForm();
  initMobileNav();
  initScrollAnimations();
});

/* ==========================================================================
   1. Live Telemetry Clock & System Status
   ========================================================================== */
function initTelemetryClock() {
  const clockEl = document.getElementById('telemetry-clock');
  function updateTime() {
    const now = new Date();
    const utcString = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    if (clockEl) clockEl.textContent = utcString;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. Interactive CLI Terminal & Architecture Simulator
   ========================================================================== */
const CLI_SCRIPTS = {
  deploy: [
    { text: '$ AMbinex init --cluster prod --ai-eval=verified', type: 'cmd' },
    { text: '[00.12s] Connecting to distributed edge cluster [eu-west, us-east, ap-northeast]...', type: 'info' },
    { text: '[00.38s] Verifying schema migrations & zero-downtime replication... [OK]', type: 'ok' },
    { text: '[00.82s] Synthesizing autonomous agent tool-calling sandbox... [OK]', type: 'ok' },
    { text: '[01.15s] Embedding semantic cache layer (Redis + pgvector)... [OK]', type: 'ok' },
    { text: '[01.44s] Validating 3-Week Zero-to-Production cadence milestones...', type: 'info' },
    { text: '         -> Sprint Target: 21 Days [METRICS: 100% ON SCHEDULE]', type: 'ignition' },
    { text: '[01.89s] Production build verified. P99 latency: 68ms. SLA: 99.99%.', type: 'ok' }
  ],
  finops: [
    { text: '$ AMbinex finops --audit --baseline-reduction', type: 'cmd' },
    { text: '[00.08s] Scanning container footprints & reserved compute nodes...', type: 'info' },
    { text: '[00.29s] Applying speculative decoding & dynamic batching on LLM inference...', type: 'info' },
    { text: '[00.67s] Caching repeated semantic queries (hit rate: 93.8%)... [OK]', type: 'ok' },
    { text: '[00.95s] Calculating compute cost efficiency differential...', type: 'info' },
    { text: '         -> Baseline cost delta: -12.4% VERIFIED [ANNUAL RUN-RATE SAVINGS]', type: 'ignition' },
    { text: '[01.21s] Architectural FinOps report compiled and locked.', type: 'ok' }
  ],
  evals: [
    { text: '$ AMbinex evals --suite production-agents --guardrails', type: 'cmd' },
    { text: '[00.15s] Ingesting 2,400 synthetic adversarial prompts...', type: 'info' },
    { text: '[00.52s] Evaluating tool-call validation & schema conformance... 100%', type: 'ok' },
    { text: '[00.88s] Hallucination mitigation filter: 0.00% leakage detected', type: 'ok' },
    { text: '[01.05s] Deterministic fallback state machine verified.', type: 'ignition' },
    { text: '[01.32s] Autonomous Agent Ready for Production Deployment.', type: 'ok' }
  ],
  sla: [
    { text: '$ AMbinex healthcheck --multi-region-failover', type: 'cmd' },
    { text: '[00.10s] Pinging global edge nodes (34 PoPs active)...', type: 'info' },
    { text: '[00.32s] US-East: 12ms | EU-West: 18ms | AP-Southeast: 24ms', type: 'ok' },
    { text: '[00.58s] Simulating database master failover under 50k req/s load...', type: 'info' },
    { text: '[00.82s] Failover completed in 410ms with zero data loss.', type: 'ignition' },
    { text: '[01.00s] All systems nominal. SLA maintained at 99.99%.', type: 'ok' }
  ]
};

let currentCliInterval = null;

function initCliTerminal() {
  const screen = document.getElementById('cli-screen');
  const presetBtns = document.querySelectorAll('.cli-preset-btn');
  if (!screen) return;

  function runScript(scriptKey) {
    if (currentCliInterval) clearInterval(currentCliInterval);
    screen.innerHTML = '';

    const lines = CLI_SCRIPTS[scriptKey] || CLI_SCRIPTS.deploy;
    let lineIdx = 0;

    function addLine() {
      if (lineIdx >= lines.length) {
        const cursorLine = document.createElement('div');
        cursorLine.className = 'cli-line-prompt';
        cursorLine.innerHTML = `<span class="amb-telemetry-tag text-ash-400">AMbinex-sys:</span> <span class="cli-cursor"></span>`;
        screen.appendChild(cursorLine);
        screen.scrollTop = screen.scrollHeight;
        return;
      }

      const item = lines[lineIdx];
      const div = document.createElement('div');
      
      if (item.type === 'cmd') {
        div.className = 'cli-line-prompt';
        div.innerHTML = `<span class="amb-telemetry-tag" style="color: var(--amb-accent-ignition);">AMbinex-sys:</span> <span class="cli-cmd">${escapeHtml(item.text)}</span>`;
      } else if (item.type === 'ok') {
        div.innerHTML = `<span class="cli-status-ok">${escapeHtml(item.text)}</span>`;
      } else if (item.type === 'ignition') {
        div.innerHTML = `<span class="cli-status-ignition">${escapeHtml(item.text)}</span>`;
      } else {
        div.innerHTML = `<span class="text-ash-400">${escapeHtml(item.text)}</span>`;
      }

      screen.appendChild(div);
      screen.scrollTop = screen.scrollHeight;
      lineIdx++;
      currentCliInterval = setTimeout(addLine, 180);
    }

    addLine();
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const scriptKey = btn.dataset.script;
      runScript(scriptKey);
    });
  });

  // Run initial script
  runScript('deploy');
}

/* ==========================================================================
   3. Interactive ROI & Velocity Calculator
   ========================================================================== */
function initRoiCalculator() {
  const spendSlider = document.getElementById('calc-spend-slider');
  const spendDisplay = document.getElementById('calc-spend-val');
  const scopeBtns = document.querySelectorAll('[data-scope-val]');
  
  const resSavings = document.getElementById('roi-savings');
  const resCadence = document.getElementById('roi-cadence');
  const resHours = document.getElementById('roi-hours');
  const resLatency = document.getElementById('roi-latency');
  const applyCta = document.getElementById('calc-apply-brief');

  let currentScope = 'fullstack_ai';

  function calculate() {
    const monthlySpend = parseInt(spendSlider.value, 10);
    if (spendDisplay) spendDisplay.textContent = `$${monthlySpend.toLocaleString()}/mo`;

    // 12% Baseline verified reduction
    const annualSavings = Math.round(monthlySpend * 12 * 0.12);
    
    let hoursSaved = 580;
    let targetCadence = '3 Weeks';
    let latencyEst = '< 80ms';

    if (currentScope === 'ai_agents') {
      hoursSaved = 640;
      targetCadence = '3 Weeks';
      latencyEst = '< 65ms';
    } else if (currentScope === 'fullstack_ai') {
      hoursSaved = 820;
      targetCadence = '3 Weeks';
      latencyEst = '< 75ms';
    } else if (currentScope === 'infra_modern') {
      hoursSaved = 940;
      targetCadence = '4 Weeks';
      latencyEst = '< 50ms';
    }

    if (resSavings) resSavings.textContent = `$${annualSavings.toLocaleString()}`;
    if (resCadence) resCadence.textContent = targetCadence;
    if (resHours) resHours.textContent = `${hoursSaved} hrs`;
    if (resLatency) resLatency.textContent = latencyEst;
  }

  if (spendSlider) {
    spendSlider.addEventListener('input', calculate);
  }

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopeBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentScope = btn.dataset.scopeVal;
      calculate();
    });
  });

  if (applyCta) {
    applyCta.addEventListener('click', () => {
      const spend = spendSlider.value;
      const targetSec = document.getElementById('initiate');
      const notesField = document.getElementById('form-notes');
      const scopeField = document.getElementById('form-scope');
      
      if (scopeField) {
        if (currentScope === 'ai_agents') scopeField.value = 'AI Autonomous Agents & LLM Pipelines';
        else if (currentScope === 'fullstack_ai') scopeField.value = 'Custom Fullstack Architecture + AI';
        else scopeField.value = 'Infrastructure Modernization & FinOps';
      }

      if (notesField) {
        notesField.value = `[ROI Engine Telemetry]: Current monthly infra spend is $${parseInt(spend, 10).toLocaleString()}/mo. Target 3-week zero-to-prod execution cadence and verified 12% baseline cost reduction.`;
      }

      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('ROI metrics applied to engagement brief.');
    });
  }

  calculate();
}

/* ==========================================================================
   4. Brand Kit Generator & Lockups Modal
   ========================================================================== */
function initBrandModal() {
  const openBtns = document.querySelectorAll('.trigger-brand-modal');
  const closeBtn = document.getElementById('brand-modal-close');
  const modal = document.getElementById('brand-modal');
  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  // Initialize interactive SVG previews inside modal
  setupBrandLockups();
}

// Exact Apex Monolith geometric math from master brand specification
function getApexMonolithSVG(color, accentColor = '#FF2E00') {
  return `
    <g transform="translate(6.6, 4) scale(0.16) skewX(-22)">
      <!-- Core Structural Form -->
      <path d="M 0 100 L 40 0 L 62 0 L 71 45 L 80 0 L 102 0 L 102 72 L 86 100 L 80 100 L 71 70 L 62 100 L 40 100 L 40 55 L 22 100 Z" fill="${color}" />
      <!-- Precision Accent Notch -->
      <path d="M 105 72 L 89 100 L 105 100 Z" fill="${accentColor}" />
    </g>
  `;
}

const BRAND_LOCKUPS = {
  horizontal: (theme) => {
    const fg = theme === 'dark' ? '#F4F4F0' : '#090A0C';
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="100%" height="100%">
        <g transform="translate(14, 10) scale(1.1)">
          <svg viewBox="0 0 24 24" width="24" height="24">${getApexMonolithSVG(fg)}</svg>
        </g>
        <text x="58" y="34" font-family="'Sora', sans-serif" font-size="22" fill="${fg}" letter-spacing="-0.5">
          <tspan font-weight="700">AM</tspan><tspan font-weight="300">binex</tspan>
        </text>
      </svg>
    `;
  },
  stacked: (theme) => {
    const fg = theme === 'dark' ? '#F4F4F0' : '#090A0C';
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 110" width="100%" height="100%">
        <g transform="translate(48, 12) scale(1.65)">
          <svg viewBox="0 0 24 24" width="24" height="24">${getApexMonolithSVG(fg)}</svg>
        </g>
        <text x="70" y="88" font-family="'Sora', sans-serif" font-size="20" fill="${fg}" text-anchor="middle" letter-spacing="-0.5">
          <tspan font-weight="700">AM</tspan><tspan font-weight="300">binex</tspan>
        </text>
      </svg>
    `;
  },
  wordmark: (theme) => {
    const fg = theme === 'dark' ? '#F4F4F0' : '#090A0C';
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="100%" height="100%">
        <text x="80" y="34" font-family="'Sora', sans-serif" font-size="25" fill="${fg}" text-anchor="middle" letter-spacing="-0.5">
          <tspan font-weight="700">AM</tspan><tspan font-weight="300">binex</tspan>
        </text>
      </svg>
    `;
  },
  icon: (theme) => {
    const fg = theme === 'dark' ? '#F4F4F0' : '#090A0C';
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
        ${getApexMonolithSVG(fg)}
      </svg>
    `;
  }
};

const currentLockupThemes = {
  horizontal: 'dark',
  stacked: 'dark',
  wordmark: 'dark',
  icon: 'dark'
};

function setupBrandLockups() {
  ['horizontal', 'stacked', 'wordmark', 'icon'].forEach(id => {
    updateBrandPreview(id, 'dark');
  });
}

window.toggleLockupTheme = function(id, theme) {
  currentLockupThemes[id] = theme;
  const container = document.getElementById(`lockup-preview-${id}`);
  const btnDark = document.getElementById(`lockup-btn-dark-${id}`);
  const btnLight = document.getElementById(`lockup-btn-light-${id}`);

  if (container) {
    if (theme === 'light') {
      container.classList.add('light-theme');
    } else {
      container.classList.remove('light-theme');
    }
  }

  if (btnDark && btnLight) {
    if (theme === 'dark') {
      btnDark.classList.add('is-active');
      btnLight.classList.remove('is-active');
    } else {
      btnLight.classList.add('is-active');
      btnDark.classList.remove('is-active');
    }
  }

  updateBrandPreview(id, theme);
};

function updateBrandPreview(id, theme) {
  const previewBox = document.getElementById(`lockup-svg-wrap-${id}`);
  if (previewBox && BRAND_LOCKUPS[id]) {
    previewBox.innerHTML = BRAND_LOCKUPS[id](theme);
  }
}

window.exportLockupSVG = function(id) {
  const theme = currentLockupThemes[id];
  const svgStr = BRAND_LOCKUPS[id](theme);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AMbinex_${id}_${theme}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Exported AMbinex ${id} vector SVG (${theme})`);
};

/* ==========================================================================
   5. Engagement Form / "Initiate Execution"
   ========================================================================== */
function initEngagementForm() {
  const form = document.getElementById('engagement-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const scope = document.getElementById('form-scope').value;
    const notes = document.getElementById('form-notes').value;

    const summaryPayload = `
========================================
AMbinex EXECUTION ENGAGEMENT TELEMETRY
========================================
TARGET INBOX: aakashtadhani.ambinex@gmail.com
PARTNER: ${name} <${email}>
SYSTEM SCOPE: ${scope}
VERIFIED CADENCE: 3-Week Zero-to-Production
ARCHITECTURAL SPECIFICATION:
${notes || 'Standard 21-day execution pipeline requested.'}
TIMESTAMP: ${new Date().toISOString()}
========================================
    `.trim();

    // Copy to clipboard for instant client handoff
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryPayload).catch(() => {});
    }

    const subject = encodeURIComponent(`[AMbinex Execution Request] - ${name}`);
    const body = encodeURIComponent(
`Hi Aakash,

Here is my AMbinex execution brief:
----------------------------------------
Name & Title: ${name}
Work Email: ${email}
Architecture Scope: ${scope}
Timestamp: ${new Date().toISOString()}

System Objectives & Requirements:
${notes || 'Standard 21-day execution pipeline requested.'}
----------------------------------------`
    );

    // Direct mail client trigger to aakashtadhani.ambinex@gmail.com
    window.location.href = `mailto:aakashtadhani.ambinex@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
    showToast('Dispatched to aakashtadhani.ambinex@gmail.com. Brief copied to clipboard.');
  });
}

/* ==========================================================================
   6. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const links = document.querySelectorAll('.mobile-nav-item');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      drawer.classList.toggle('is-open');
    });

    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('is-open');
      });
    });
  }
}

/* ==========================================================================
   7. Card Mouse Glow & Micro-animations
   ========================================================================== */
function initScrollAnimations() {
  const bentoCards = document.querySelectorAll('.bento-cell, .case-card, .cadence-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   Utilities: Toast & Sanitization
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('amb-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'amb-toast';
    toast.className = 'amb-toast';
    toast.innerHTML = `
      <div class="amb-toast-mark"></div>
      <span id="amb-toast-text" style="font-family: var(--font-mono); font-size: 0.75rem;"></span>
    `;
    document.body.appendChild(toast);
  }

  const textEl = document.getElementById('amb-toast-text');
  if (textEl) textEl.textContent = message;

  toast.classList.add('is-visible');
  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 4000);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
