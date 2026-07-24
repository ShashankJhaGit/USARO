/* ---- EMAILJS CONFIG ----
   Fill these in from your EmailJS dashboard (emailjs.com):
   - PUBLIC_KEY  → Account → General
   - SERVICE_ID  → Email Services (connect the usaresearcholympiad@gmail.com Gmail account)
   - TEMPLATE_ID → Email Templates (template body should just be {{message}})

   IMPORTANT: Open your template (template_uyzlyx8) in the EmailJS dashboard,
   go to the "Settings" tab, and make sure the "To Email" field is set to
   {{to_email}} (or hardcoded to usaresearcholympiad@gmail.com). If that field
   is blank, EmailJS will silently reject every send even though your JS
   config is correct — that's the #1 cause of "form submits but no email
   arrives."
*/
const EMAILJS_PUBLIC_KEY  = "V3khoC3_IkM7n_4yP";
const EMAILJS_SERVICE_ID  = "service_cp86y6q";
const EMAILJS_TEMPLATE_ID = "template_2jygyqg";
const USARO_CONTACT_EMAIL = "usaresearcholympiad@gmail.com";

if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---- CUSTOM CURSOR ---- */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  if (cursor && ring) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });
    const animRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();

    // Hover state on interactive elements
    const hoverEls = document.querySelectorAll('a,button,.pub-card,.news-card,.officer-card,.event-card,.t-card,.r-card,.vp-card,.president-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ---- NAV SCROLL STATE ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    const checkScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- MOBILE MENU ---- */
  const burger = document.getElementById('hamburger');
  const mMenu  = document.getElementById('mobile-menu');
  if (burger && mMenu) {
    burger.addEventListener('click', () => {
      const open = mMenu.classList.toggle('open');
      burger.innerHTML = open ? '✕' : '☰';
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mMenu.classList.remove('open');
      document.body.style.overflow = '';
      burger.innerHTML = '☰';
    }));
  }

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* ---- HERO STAGGER ---- */
  document.querySelectorAll('.hero-animate').forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(24px);animation:heroFadeUp 0.75s cubic-bezier(0.4,0,0.2,1) ${0.1 + i*0.14}s both;`;
  });

  /* ---- PARALLAX HERO BG ---- */
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }, { passive: true });
  }

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('.count-up');
  if (counters.length) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        if (!target) return;
        const dur = 1600;
        const start = performance.now();
        const tick = now => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          el.textContent = Math.round(ease * target) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---- FILTER ---- */
  const filterBtns  = document.querySelectorAll('[data-filter]');
  const filterCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      filterCards.forEach(card => {
        const show = f === 'all' || card.dataset.category === f;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.opacity = '0'; card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.38s ease,transform 0.38s ease';
            card.style.opacity = '1'; card.style.transform = 'translateY(0)';
          });
        }
      });
    }));
  }

  /* ---- TABS ---- */
  const tabBtns   = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('[data-panel]');
  if (tabBtns.length) {
    tabBtns.forEach(btn => btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== btn.dataset.tab));
    }));
  }

  /* ---- FORMS ---- */
  const regForm = document.getElementById('reg-form');
  if (regForm) {
    regForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = regForm.querySelector('[type=submit]');
      const orig = btn.textContent;

      const getVal = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      const firstName = getVal('reg-first');
      const lastName  = getVal('reg-last');
      const email     = getVal('reg-email');
      const school    = getVal('reg-school');
      const eventName = getVal('reg-event');
      const research  = getVal('reg-research') || 'N/A';
      const notes     = getVal('reg-notes') || 'N/A';

      const message =
`Name: ${lastName}, ${firstName}
Email: ${email}
School: ${school}
Event: ${eventName}
Research Area: ${research}
Additional Notes: ${notes}`;

      btn.textContent = 'Submitting…'; btn.disabled = true;

      if (!window.emailjs) {
        console.error('EmailJS library not loaded. Make sure the EmailJS <script> tag is included in your HTML before this file, e.g.:\n<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>');
        showToast(`Something went wrong. Please email ${USARO_CONTACT_EMAIL} directly.`);
        btn.textContent = orig; btn.disabled = false;
        return;
      }

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: USARO_CONTACT_EMAIL,
        subject: 'New USARO Event Registration',
        message: message
      }).then(() => {
        showToast('Registration submitted! Confirmation incoming.');
        regForm.reset();
      }).catch(err => {
        console.error('EmailJS error status:', err && err.status);
        console.error('EmailJS error text:', err && err.text);
        console.error('EmailJS error (full):', err);
        showToast(`Something went wrong. Please email ${USARO_CONTACT_EMAIL} directly.`);
      }).finally(() => {
        btn.textContent = orig; btn.disabled = false;
      });
    });
  }
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = contactForm.querySelector('[type=submit]');
      const orig = btn.textContent;

      const getVal = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      const name    = getVal('contact-name');
      const email   = getVal('contact-email');
      const subject = getVal('contact-subject') || 'Website Contact Form';
      const body    = getVal('contact-message');

      btn.textContent = 'Sending…'; btn.disabled = true;

      if (!window.emailjs) {
        console.error('EmailJS library not loaded. Make sure the EmailJS <script> tag is included in your HTML before this file, e.g.:\n<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>');
        showToast(`Something went wrong. Please email ${USARO_CONTACT_EMAIL} directly.`);
        btn.textContent = orig; btn.disabled = false;
        return;
      }

      const message =
`Name: ${name}
Email: ${email}
Subject: ${subject}

${body}`;

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: USARO_CONTACT_EMAIL,
        subject: `USARO Contact Form: ${subject}`,
        message: message
      }).then(() => {
        showToast("Message sent! We'll respond within 48 hours.");
        contactForm.reset();
      }).catch(err => {
        console.error('EmailJS error status:', err && err.status);
        console.error('EmailJS error text:', err && err.text);
        console.error('EmailJS error (full):', err);
        showToast(`Something went wrong. Please email ${USARO_CONTACT_EMAIL} directly.`);
      }).finally(() => {
        btn.textContent = orig; btn.disabled = false;
      });
    });
  }

  /* ---- TOAST ---- */
  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = `position:fixed;bottom:2.5rem;right:2.5rem;z-index:99990;background:var(--gold);color:#080808;padding:1rem 1.6rem;border-radius:2px;font-family:'DM Sans',sans-serif;font-size:0.8rem;font-weight:500;letter-spacing:0.06em;box-shadow:0 8px 40px rgba(0,0,0,0.5),0 0 30px rgba(212,175,55,0.3);max-width:320px;transform:translateY(20px);opacity:0;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);`;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.transform = 'translateY(0)'; t.style.opacity = '1'; });
    setTimeout(() => { t.style.transform = 'translateY(20px)'; t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 4000);
  }

  /* ---- PDF DOWNLOAD placeholder ---- */
  document.querySelectorAll('.pdf-download').forEach(el => el.addEventListener('click', e => { e.preventDefault(); showToast('Link your PDF file here — placeholder for now.'); }));

  /* ---- READ MORE ---- */
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const exp = target.classList.toggle('expanded');
      btn.textContent = exp ? 'Read less ↑' : 'Read more →';
    });
  });

  /* ---- MARQUEE: items are pre-duplicated in HTML, no JS cloning needed ---- */

  /* ---- INJECT KEYFRAMES ---- */
  const s = document.createElement('style');
  s.textContent = `
    @keyframes heroFadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes marqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .marquee { overflow: hidden; white-space: nowrap; }
    .marquee-inner { display: inline-block; animation: marqueeScroll 30s linear infinite; }
    .marquee-inner:hover { animation-play-state: paused; }
    .line-reveal { overflow: hidden; }
    .line-reveal span { display: block; transform: translateY(100%); transition: transform 0.8s cubic-bezier(0.4,0,0.2,1); }
    .line-reveal.visible span { transform: translateY(0); }
  `;
  document.head.appendChild(s);

  /* ---- LINE REVEAL ---- */
  const lineRevs = document.querySelectorAll('.line-reveal');
  if (lineRevs.length) {
    const lro = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          lro.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    lineRevs.forEach(el => lro.observe(el));
  }

  /* ---- NEWSLETTER ---- */
  document.querySelectorAll('.newsletter-submit').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      btn.textContent = 'Subscribed ✓';
      btn.style.background = 'var(--gold-dark)';
      btn.disabled = true;
    });
  });
});