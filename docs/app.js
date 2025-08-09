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
})();


