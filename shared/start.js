// Status tombol "Mulai kamera": loading saat kamera & model disiapkan, kembali normal kalau gagal.
(() => {
  const go = document.getElementById('go'), err = document.getElementById('err');
  if (!go) return;
  const label = go.querySelector('.st-label'), idle = label ? label.textContent : '';
  const done = () => { go.classList.remove('is-loading'); go.disabled = false; go.removeAttribute('aria-busy'); if (label) label.textContent = idle; };
  go.addEventListener('click', () => {
    go.classList.add('is-loading'); go.setAttribute('aria-busy', 'true'); if (label) label.textContent = 'Menyiapkan kamera…';
    setTimeout(() => { go.disabled = true; }, 0);   // setelah handler halaman ikut terpanggil
  });
  if (err) new MutationObserver(() => { if (err.textContent.trim()) done(); }).observe(err, { childList: true, characterData: true, subtree: true });
})();
