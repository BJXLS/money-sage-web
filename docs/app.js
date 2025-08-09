// moneySage landing interactions
(function () {
  const year = new Date().getFullYear();
  const y = document.getElementById('y');
  if (y) y.textContent = String(year);

  // Smooth scroll for same-page anchors
  document.addEventListener('click', function (e) {
    const t = e.target;
    if (t && t.matches && t.matches('a[href^="#"]')) {
      const id = t.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
    }
  });

  // Carousel - auto ping-pong + controls
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.querySelector('.carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (viewport && track && slides.length > 0) {
    let index = 0;
    let dir = 1; // 1 forward, -1 backward
    const update = () => {
      track.style.transform = `translateX(${-index * 100}%)`;
      // adjust viewport height to current slide image height
      const current = slides[index];
      if (!current) return;
      const img = current.querySelector('img');
      if (img) {
        const h = img.naturalWidth ? (img.clientWidth * img.naturalHeight / img.naturalWidth) : img.clientHeight;
        if (h) viewport.style.height = h + 'px';
      }
    };

    const go = (i) => {
      index = (i + slides.length) % slides.length;
      update();
    };

    const goNext = () => go(index + 1);
    const goPrev = () => go(index - 1);

    let timer = null;
    const start = () => {
      stop();
      timer = setInterval(() => {
        if (index === slides.length - 1) dir = -1;
        else if (index === 0) dir = 1;
        go(index + dir);
      }, 3000);
    };
    const stop = () => timer && (clearInterval(timer), timer = null);

    nextBtn && nextBtn.addEventListener('click', () => { goNext(); start(); });
    prevBtn && prevBtn.addEventListener('click', () => { goPrev(); start(); });

    // pause on hover
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);

    // resize: ensure each slide width equals viewport width (flex 100% already handles it visually)
    window.addEventListener('resize', update);
    // ensure height after images load
    slides.forEach(s => {
      const img = s.querySelector('img');
      if (img) {
        if (img.complete) {
          // already loaded
        } else {
          img.addEventListener('load', () => { if (s === slides[index]) update(); });
        }
      }
    });

    update();
    start();
  }

  // Lightbox preview for slides
  const lb = document.querySelector('.lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const lbPrev = document.querySelector('.lightbox-btn.prev');
  const lbNext = document.querySelector('.lightbox-btn.next');
  const lbClose = document.querySelector('.lightbox-btn.close');

  let lbIndex = 0;
  const openLightbox = (i) => {
    lbIndex = i;
    const img = slides[lbIndex].querySelector('img');
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lb.removeAttribute('hidden');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    lb.setAttribute('hidden', '');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const lbGo = (i) => {
    lbIndex = (i + slides.length) % slides.length;
    const img = slides[lbIndex].querySelector('img');
    if (img) { lbImg.src = img.src; lbImg.alt = img.alt || ''; }
  };

  if (slides.length && lb && lbImg) {
    slides.forEach((s, i) => {
      const im = s.querySelector('img');
      if (im) {
        im.style.cursor = 'zoom-in';
        im.addEventListener('click', () => openLightbox(i));
      }
    });
    lbPrev && lbPrev.addEventListener('click', () => lbGo(lbIndex - 1));
    lbNext && lbNext.addEventListener('click', () => lbGo(lbIndex + 1));
    lbClose && lbClose.addEventListener('click', closeLightbox);
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hasAttribute('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbGo(lbIndex - 1);
      if (e.key === 'ArrowRight') lbGo(lbIndex + 1);
    });
  }
})();


