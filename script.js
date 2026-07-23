/* ═══════════════════════════════════════════════════════════════════
   펜타 마케팅 — 사이트 인터랙션
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

      // 개인정보 처리방침 동의 체크
      var agree = form.querySelector('input[name="동의"]');
      if (agree && !agree.checked) {
        alert('개인정보 처리방침에 동의해 주세요.');
        agree.focus();
        return;
      }

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

  // 5) 헤더 스크롤 시 그림자 + Sticky CTA 노출
  var header = document.querySelector('.site-header');
  var stickyCta = document.getElementById('stickyCta');
  var heroSection = document.querySelector('.hero');
  function onScroll() {
    if (header) {
      if (window.scrollY > 4) {
        header.style.boxShadow = '0 2px 12px rgba(15,36,86,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
    // Sticky CTA: Hero 지나면 보이게, 푸터 위에서는 숨김
    if (stickyCta && heroSection) {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      var footer = document.querySelector('.site-footer');
      var nearFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 80;
      if (heroBottom < 80 && !nearFooter) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 6) 서비스 캐러셀 좌우 화살표
  var svcTrack = document.getElementById('svcTrack');
  var svcPrev = document.getElementById('svcPrev');
  var svcNext = document.getElementById('svcNext');
  if (svcTrack && svcPrev && svcNext) {
    var step = 380; // 카드 너비 + gap
    svcPrev.addEventListener('click', function () {
      svcTrack.scrollBy({ left: -step, behavior: 'smooth' });
    });
    svcNext.addEventListener('click', function () {
      svcTrack.scrollBy({ left: step, behavior: 'smooth' });
    });
  }
})();
