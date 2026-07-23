/* ═══════════════════════════════════════════════════════════════════
   펜타마케팅 — Tweaks Panel
   ─────────────────────────────────────────────────────────────────── */

(function () {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "mood": "trust",
    "accent": "navy"
  }/*EDITMODE-END*/;

  // ── Mood preset: 헤딩 굵기 / 자간 / 카드 라운드 / 그림자 한꺼번에 ──
  const MOODS = {
    trust: {
      label: '신뢰',
      desc: '현재 — 정직하고 단단한 인상',
      vars: {
        '--tw-h-weight': '800',
        '--tw-h-track': '-0.025em',
        '--tw-radius': '16px',
        '--tw-radius-lg': '20px',
        '--tw-radius-pill': '10px',
        '--tw-shadow': '0 16px 40px rgba(15,36,86,0.10), 0 4px 8px rgba(15,36,86,0.04)',
        '--tw-cta-shadow': '0 8px 20px rgba(31,79,207,0.28)',
        '--tw-card-pad': '28px',
      }
    },
    bold: {
      label: '대담',
      desc: '굵고 각진 — 강한 자신감의 톤',
      vars: {
        '--tw-h-weight': '900',
        '--tw-h-track': '-0.045em',
        '--tw-radius': '6px',
        '--tw-radius-lg': '10px',
        '--tw-radius-pill': '6px',
        '--tw-shadow': '0 24px 56px rgba(15,36,86,0.18), 0 6px 14px rgba(15,36,86,0.08)',
        '--tw-cta-shadow': '0 12px 28px rgba(31,79,207,0.42)',
        '--tw-card-pad': '32px',
      }
    },
    soft: {
      label: '부드러움',
      desc: '둥글고 가벼운 — 친근한 파트너 톤',
      vars: {
        '--tw-h-weight': '700',
        '--tw-h-track': '-0.01em',
        '--tw-radius': '24px',
        '--tw-radius-lg': '32px',
        '--tw-radius-pill': '18px',
        '--tw-shadow': '0 10px 28px rgba(15,36,86,0.06), 0 2px 6px rgba(15,36,86,0.03)',
        '--tw-cta-shadow': '0 6px 16px rgba(31,79,207,0.18)',
        '--tw-card-pad': '32px',
      }
    },
  };

  // ── Accent: 브랜드 컬러 톤 전환 ──
  const ACCENTS = {
    navy: {
      label: '네이비 블루',
      swatch: ['#0A1B3D', '#2D63E5'],
      vars: {
        '--erum-navy-900': '#0A1B3D',
        '--erum-navy-800': '#0F2456',
        '--erum-navy-700': '#173474',
        '--erum-blue-600': '#1F4FCF',
        '--erum-blue-500': '#2D63E5',
        '--erum-blue-400': '#4A7BFF',
        '--erum-blue-300': '#8AAEFF',
        '--erum-blue-100': '#E6EEFF',
        '--erum-blue-50':  '#F4F7FF',
      }
    },
    indigo: {
      label: '인디고',
      swatch: ['#1E1B4B', '#6366F1'],
      vars: {
        '--erum-navy-900': '#1E1B4B',
        '--erum-navy-800': '#312E81',
        '--erum-navy-700': '#4338CA',
        '--erum-blue-600': '#4F46E5',
        '--erum-blue-500': '#6366F1',
        '--erum-blue-400': '#818CF8',
        '--erum-blue-300': '#A5B4FC',
        '--erum-blue-100': '#E0E7FF',
        '--erum-blue-50':  '#EEF2FF',
      }
    },
    slate: {
      label: '차콜 슬레이트',
      swatch: ['#0F172A', '#475569'],
      vars: {
        '--erum-navy-900': '#0F172A',
        '--erum-navy-800': '#1E293B',
        '--erum-navy-700': '#334155',
        '--erum-blue-600': '#334155',
        '--erum-blue-500': '#475569',
        '--erum-blue-400': '#64748B',
        '--erum-blue-300': '#94A3B8',
        '--erum-blue-100': '#E2E8F0',
        '--erum-blue-50':  '#F1F5F9',
      }
    },
  };

  let state = { ...DEFAULTS };

  function applyTweaks() {
    const mood = MOODS[state.mood] || MOODS.trust;
    const accent = ACCENTS[state.accent] || ACCENTS.navy;
    const root = document.documentElement;
    Object.entries({ ...mood.vars, ...accent.vars }).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
    // Mood가 영향을 주는 핵심 요소들 — CSS 변수가 적용되도록 override 스타일 주입
    ensureOverrideStyle();
  }

  function ensureOverrideStyle() {
    if (document.getElementById('__tweak-runtime-css')) return;
    const s = document.createElement('style');
    s.id = '__tweak-runtime-css';
    s.textContent = `
      .h2, .stats-title, .closing h2, .contact h2,
      .hero h1, .svc-big h3, .case-title, .column-card h3, .step h3 {
        font-weight: var(--tw-h-weight, 800) !important;
        letter-spacing: var(--tw-h-track, -0.025em) !important;
      }
      .btn-primary, .btn-secondary, .btn-ghost {
        border-radius: var(--tw-radius-pill, 10px) !important;
      }
      .btn-primary { box-shadow: var(--tw-cta-shadow, 0 8px 20px rgba(31,79,207,0.28)) !important; }
      .case-card, .svc-big, .column-card, .step, .contact-form, .closing-body, .filter-btn:not(:hover):not(.active) {
        border-radius: var(--tw-radius, 16px) !important;
      }
      .case-card:hover, .svc-big:hover, .column-card:hover {
        box-shadow: var(--tw-shadow, 0 16px 40px rgba(15,36,86,0.10)) !important;
      }
      .sticky-cta { border-radius: 999px !important; }
    `;
    document.head.appendChild(s);
  }

  function persist() {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { ...state } }, '*');
    } catch (e) {}
  }

  // ── 패널 UI ──
  function buildPanel() {
    const panel = document.createElement('div');
    panel.id = '__tweak-panel';
    panel.innerHTML = `
      <style>
        #__tweak-panel {
          position: fixed; top: 88px; right: 20px;
          width: 280px; z-index: 1000;
          background: #fff;
          border: 1px solid #DDE1E8;
          border-radius: 14px;
          box-shadow: 0 20px 60px rgba(15,36,86,0.15), 0 4px 12px rgba(15,36,86,0.06);
          font-family: 'Pretendard', sans-serif;
          display: none;
          overflow: hidden;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }
        #__tweak-panel.is-open { display: block; }
        .tw-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; border-bottom: 1px solid #EEF0F4;
          background: linear-gradient(180deg, #0A1B3D, #0F2456);
          color: #fff;
        }
        .tw-head-title { font-size: 14px; font-weight: 800; letter-spacing: 0.04em; }
        .tw-head-close {
          background: rgba(255,255,255,0.1); border: 0; color: #fff;
          width: 26px; height: 26px; border-radius: 50%;
          cursor: pointer; font-size: 16px; line-height: 1;
          display: flex; align-items: center; justify-content: center;
        }
        .tw-head-close:hover { background: rgba(255,255,255,0.2); }
        .tw-body { padding: 18px; }
        .tw-section { margin-bottom: 20px; }
        .tw-section:last-child { margin-bottom: 0; }
        .tw-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #6B7382;
          margin-bottom: 10px;
        }
        .tw-mood-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;
        }
        .tw-mood-opt {
          background: #F7F8FA; border: 1.5px solid transparent;
          padding: 10px 6px; border-radius: 8px;
          cursor: pointer; transition: all 160ms ease;
          text-align: center;
        }
        .tw-mood-opt:hover { background: #EEF0F4; }
        .tw-mood-opt.is-active {
          background: #fff; border-color: #2D63E5;
          box-shadow: 0 0 0 3px rgba(45,99,229,0.12);
        }
        .tw-mood-label {
          font-size: 13px; font-weight: 700; color: #0A1B3D;
        }
        .tw-mood-desc {
          font-size: 12px; line-height: 1.5; color: #6B7382;
          margin-top: 10px; padding: 10px 12px;
          background: #F7F8FA; border-radius: 8px;
        }
        .tw-accent-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
        }
        .tw-accent-opt {
          padding: 10px 8px; border-radius: 10px;
          cursor: pointer; transition: all 160ms ease;
          border: 1.5px solid transparent;
          background: #F7F8FA;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .tw-accent-opt:hover { background: #EEF0F4; }
        .tw-accent-opt.is-active {
          background: #fff; border-color: #2D63E5;
          box-shadow: 0 0 0 3px rgba(45,99,229,0.12);
        }
        .tw-swatch {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; overflow: hidden;
        }
        .tw-swatch span { flex: 1; }
        .tw-accent-name { font-size: 11px; font-weight: 600; color: #2E3340; }
      </style>
      <div class="tw-head">
        <div class="tw-head-title">Tweaks</div>
        <button class="tw-head-close" id="__tw-close" aria-label="닫기">×</button>
      </div>
      <div class="tw-body">
        <div class="tw-section">
          <div class="tw-label">Brand Mood</div>
          <div class="tw-mood-grid" id="__tw-mood"></div>
          <div class="tw-mood-desc" id="__tw-mood-desc"></div>
        </div>
        <div class="tw-section">
          <div class="tw-label">Accent</div>
          <div class="tw-accent-grid" id="__tw-accent"></div>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    const moodGrid = panel.querySelector('#__tw-mood');
    Object.entries(MOODS).forEach(([key, mood]) => {
      const b = document.createElement('button');
      b.className = 'tw-mood-opt' + (state.mood === key ? ' is-active' : '');
      b.dataset.key = key;
      b.innerHTML = `<div class="tw-mood-label">${mood.label}</div>`;
      b.addEventListener('click', () => {
        state.mood = key;
        applyTweaks();
        updateActives();
        persist();
      });
      moodGrid.appendChild(b);
    });

    const accentGrid = panel.querySelector('#__tw-accent');
    Object.entries(ACCENTS).forEach(([key, ac]) => {
      const b = document.createElement('button');
      b.className = 'tw-accent-opt' + (state.accent === key ? ' is-active' : '');
      b.dataset.key = key;
      b.innerHTML = `
        <div class="tw-swatch">${ac.swatch.map(c => `<span style="background:${c}"></span>`).join('')}</div>
        <div class="tw-accent-name">${ac.label}</div>
      `;
      b.addEventListener('click', () => {
        state.accent = key;
        applyTweaks();
        updateActives();
        persist();
      });
      accentGrid.appendChild(b);
    });

    function updateActives() {
      moodGrid.querySelectorAll('.tw-mood-opt').forEach(el => {
        el.classList.toggle('is-active', el.dataset.key === state.mood);
      });
      accentGrid.querySelectorAll('.tw-accent-opt').forEach(el => {
        el.classList.toggle('is-active', el.dataset.key === state.accent);
      });
      panel.querySelector('#__tw-mood-desc').textContent = MOODS[state.mood].desc;
    }
    updateActives();

    panel.querySelector('#__tw-close').addEventListener('click', () => {
      panel.classList.remove('is-open');
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
    });

    return panel;
  }

  let panel;
  function ensurePanel() {
    if (!panel) panel = buildPanel();
    return panel;
  }

  // ── 호스트 protocol ──
  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || !d.type) return;
    if (d.type === '__activate_edit_mode') {
      ensurePanel().classList.add('is-open');
    } else if (d.type === '__deactivate_edit_mode') {
      if (panel) panel.classList.remove('is-open');
    }
  });

  // 초기 적용 (패널 안 열려도 저장된 값은 반영)
  applyTweaks();

  // 호스트에 사용 가능 신호
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();
