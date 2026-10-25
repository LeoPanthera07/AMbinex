/**
 * AMbinex Master Application Logic
 * Brand: AMbinex | Statement: Build your growth.
 * Verified Cadence: 3-Week Zero-to-Production | Baseline Cost Reduction: -12%
 */

document.addEventListener('DOMContentLoaded', () => {
  initTelemetryClock();
  initHeroCanvas();
  initScrollReveals();
  initAnimatedCounters();
  initRoiCalculator();
  initBrandModal();
  initEngagementForm();
  initMobileNav();
  initScrollAnimations();
  initAmbientCursor();
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
   2. Ambient Architectural Constellation Canvas
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let mouse = { x: -1000, y: -1000, active: false };

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 18000), 45);
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1,
      isAccent: Math.random() < 0.25
    });
  }

  const pulses = [];
  function spawnPulse() {
    if (nodes.length < 2 || pulses.length > 5) return;
    const a = Math.floor(Math.random() * nodes.length);
    let nearest = -1;
    let minDist = 140;
    for (let j = 0; j < nodes.length; j++) {
      if (a === j) continue;
      const dx = nodes[a].x - nodes[j].x;
      const dy = nodes[a].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        nearest = j;
      }
    }
    if (nearest !== -1) {
      pulses.push({
        from: a,
        to: nearest,
        progress: 0,
        speed: 0.015 + Math.random() * 0.015
      });
    }
  }
  setInterval(spawnPulse, 1200);

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      if (mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          n.x += (dx / dist) * force * 0.5;
          n.y += (dy / dist) * force * 0.5;
        }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.isAccent ? '#FF2E00' : 'rgba(244, 244, 240, 0.45)';
      ctx.fill();
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(34, 38, 46, ${alpha * 2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    for (let p = pulses.length - 1; p >= 0; p--) {
      const pulse = pulses[p];
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        pulses.splice(p, 1);
        continue;
      }
      const n1 = nodes[pulse.from];
      const n2 = nodes[pulse.to];
      if (!n1 || !n2) continue;
      const px = n1.x + (n2.x - n1.x) * pulse.progress;
      const py = n1.y + (n2.y - n1.y) * pulse.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FF2E00';
      ctx.shadowColor = '#FF2E00';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   Scroll Reveal & Number Counters
   ========================================================================== */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isNegative = el.dataset.negative === 'true';
  const isDecimal = el.dataset.counter.includes('.');
  const duration = 1200;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.abs(target) * ease;
    const formatted = isDecimal ? current.toFixed(2) : Math.round(current);
    const sign = isNegative ? '-' : '';

    el.textContent = `${prefix}${sign}${formatted}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const finalFormatted = isDecimal ? target.toFixed(2) : target;
      el.textContent = `${prefix}${finalFormatted}${suffix}`;
    }
  }

  requestAnimationFrame(update);
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
    showToast('Execution brief compiled. Executive dispatch opened in your mail client.');
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
  const interactiveCards = document.querySelectorAll(
    '.bento-cell, .case-card, .cadence-card, .roi-calculator-box, .system-monitor-card, .roi-results-card'
  );
  interactiveCards.forEach(card => {
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
   8. Ambient Cursor Illumination Follower
   ========================================================================== */
function initAmbientCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'ambient-cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      glow.style.opacity = '1';
    }
  });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    isVisible = false;
  });

  function render() {
    currentX += (mouseX - currentX) * 0.14;
    currentY += (mouseY - currentY) * 0.14;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  render();
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
