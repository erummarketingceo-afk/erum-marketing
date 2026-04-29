/* ═══════════════════════════════════════════════════════════════════
   이룸 마케팅 — 사이트 인터랙션
   ─────────────────────────────────────────────────────────────────── */

(function () {
  // 1) Lucide 아이콘 렌더
  if (window.lucide) window.lucide.createIcons();

  // 2) 모바일 메뉴 토글
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('is-open');
      document.body.style.overflow = menu.classList.contains('is-open') ? 'hidden' : '';
    });
    menu.querySelectorAll('[data-close]').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3) 부드러운 앵커 스크롤 (헤더 높이 보정)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 60;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // 4) Contact 폼 — Formspree AJAX 제출
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = '전송 중…';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          success.classList.add('is-active');
          if (window.gtag) gtag('event', 'lead_submit', { event_category: 'contact' });
        } else {
          alert('전송에 실패했습니다. 잠시 후 다시 시도하시거나, 전화로 연락 부탁드립니다. (02-1234-5678)');
          btn.textContent = origText;
          btn.disabled = false;
        }
      }).catch(function () {
        alert('네트워크 오류가 발생했습니다. 전화로 연락 부탁드립니다. (02-1234-5678)');
        btn.textContent = origText;
        btn.disabled = false;
      });
    });
  }

  // 5) 헤더 스크롤 시 그림자
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 4) {
      header.style.boxShadow = '0 2px 12px rgba(15,36,86,0.06)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
