# Jutsu Kamera

Efek jutsu yang jalan langsung di browser lewat webcam: deteksi tangan dan wajah pakai MediaPipe, efek digambar dengan Canvas. Tanpa server, tanpa instalasi.

| Jutsu | Gerakan |
|---|---|
| Rasengan | Buka telapak, putar tangan satunya di depan telapak, lalu dorong ke kamera |
| Kage Bunshin | Telunjuk + jari tengah kedua tangan lurus, disilangkan, tahan |
| Kuchiyose | Tepuk telapak ke bawah; tahan telapak terbuka untuk memulangkan |
| Susanoo | Satu tangan, telunjuk + jari tengah ke atas, tahan |
| Bola Api | Segel dua jari → kepalan beradu → telapak menyatu, lalu buka mulut |
| Mata Segi Delapan | Gabungkan kedua tangan, dua jari ke atas, tahan |

## Menjalankan

Halaman butuh HTTPS atau `localhost` supaya kamera bisa dipakai.

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

Di GitHub Pages, push isi folder ini ke repo dan aktifkan Pages dari branch utama (root).

## Struktur

```
index.html          halaman depan
shared/             layar pembuka bersama (start.css, start.js) + awan latar (clouds.js)
<jutsu>/index.html  satu halaman per jutsu
kuchiyose/assets/   gambar katak
```

## Privasi

Video kamera diproses di perangkat pengunjung dan tidak dikirim ke mana pun. Yang diunduh hanya model MediaPipe dan font dari CDN.

## Catatan

Proyek fan-made untuk hiburan, tidak berafiliasi dengan pemilik franchise Naruto. Semua efek, desain makhluk, dan suara dibuat sendiri.
