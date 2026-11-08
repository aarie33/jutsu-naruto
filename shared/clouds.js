// Awan kartun kecil yang berjalan sendiri di bagian atas layar (desain orisinal).
// Pakai: <script src="../shared/clouds.js"></script>  ·  tombol C = sembunyikan/tampilkan awan
(() => {
  const CFG = {
    count: 7,          // jumlah awan
    band: 0.22,        // awan berada di 22% bagian atas layar
    minW: 0.08,        // lebar awan terkecil (relatif lebar layar)
    maxW: 0.17,        // lebar awan terbesar
    speed: [12, 34],   // kecepatan (px/detik) awan jauh → dekat
  };
  const cv = document.createElement('canvas');
  Object.assign(cv.style, { position:'fixed', inset:'0', width:'100vw', height:'100vh', pointerEvents:'none', zIndex:'1' });
  document.body.appendChild(cv);
  const hud = document.getElementById('hud'); if (hud) hud.style.zIndex = '2';   // tulisan HUD tetap di atas awan
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, show = true;
  const resize = () => { W = innerWidth; H = innerHeight; cv.width = W; cv.height = H; };
  addEventListener('resize', resize); resize();
  addEventListener('keydown', e => { if (e.key.toLowerCase() === 'c') { show = !show; cv.style.display = show ? 'block' : 'none'; } });

  // satu awan = gumpalan bulat dengan dasar rata: tepi biru-abu, bayangan bawah, badan putih, kilau
  function makeSprite(seed) {
    let a = seed * 9973 | 0; const rnd = () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const w = 240, h = 120, base = h * 0.78, n = 4 + Math.floor(rnd() * 3), puffs = [];
    for (let i = 0; i < n; i++) { const x = w * (0.18 + 0.64 * i / (n - 1)) + (rnd() - 0.5) * 14, mid = 1 - Math.abs(i / (n - 1) - 0.5) * 1.4;
      const r = h * (0.24 + 0.24 * mid + rnd() * 0.06); puffs.push([x, base - r * 0.45, r]); }
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
    const pass = (sc, dy, col) => { x.fillStyle = col; x.beginPath(); for (const [px, py, r] of puffs) { x.moveTo(px + r * sc, py + dy); x.arc(px, py + dy, r * sc, 0, 7); }
      x.rect(puffs[0][0], base - h * 0.16 + dy, puffs[n - 1][0] - puffs[0][0], h * 0.16 * sc); x.fill(); };
    pass(1.08, 1, '#8fa3b8');   // tepi
    pass(1.0, 3, '#c9d6e3');    // bayangan bawah
    pass(0.94, -2, '#ffffff');  // badan
    // potong dasar supaya rata
    x.globalCompositeOperation = 'destination-out'; x.fillRect(0, base + 4, w, h);
    x.globalCompositeOperation = 'source-over'; x.fillStyle = '#8fa3b8'; x.fillRect(puffs[0][0] - 2, base + 1, puffs[n - 1][0] - puffs[0][0] + 4, 3);
    x.fillStyle = 'rgba(255,255,255,0.9)'; const [hx, hy, hr] = puffs[Math.floor(n / 2)]; x.beginPath(); x.arc(hx - hr * 0.3, hy - hr * 0.35, hr * 0.28, 0, 7); x.fill();
    return c;
  }
  const clouds = Array.from({ length: CFG.count }, (_, i) => {
    const depth = Math.random();   // 0 = jauh, 1 = dekat
    return { spr: makeSprite(i + 1), depth, x: Math.random() * 1.2 - 0.1, y: Math.random(),
      w: CFG.minW + (CFG.maxW - CFG.minW) * depth, v: CFG.speed[0] + (CFG.speed[1] - CFG.speed[0]) * depth, bob: Math.random() * 6 };
  }).sort((a, b) => a.depth - b.depth);

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    ctx.clearRect(0, 0, W, H);
    if (show) for (const c of clouds) {
      const cw = c.w * W, ch = cw * 0.5;
      c.x += c.v * dt / W; if (c.x * W > W + cw) { c.x = -cw / W - Math.random() * 0.2; c.y = Math.random(); }
      const y = c.y * (H * CFG.band - ch) + Math.sin(now / 1000 * 0.6 + c.bob) * 3;
      ctx.globalAlpha = 0.75 + 0.25 * c.depth; ctx.drawImage(c.spr, c.x * W, y, cw, ch);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
