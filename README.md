# Lab Notes — Catatan Prosedur Kerja

Aplikasi web statis untuk prosedur laboratorium dan kalkulator analisis.

## Fitur
- Dashboard: Kadar Air, FFA, Kadar Lemak, AV, Alkali, Kalkulator, Pengaturan
- Kalkulator otomatis (tanpa tombol `=`)
- Standar FFA dapat diubah
- Normalitas tersimpan sebagai default
- Area prosedur kerja dan preview foto
- Deploy ke GitHub Pages melalui workflow YAML

## Upload ke GitHub
1. Ekstrak ZIP.
2. Buat repository GitHub baru.
3. Upload seluruh isi folder ini ke repository (pastikan `index.html` berada di root).
4. Pastikan branch utama bernama `main`.
5. Buka Settings → Pages dan pilih GitHub Actions jika diminta.
6. Tunggu workflow selesai, lalu buka URL Pages.

## Catatan
Prosedur dan gambar yang ditambahkan melalui halaman saat ini hanya tampil selama sesi browser; fitur penyimpanan permanen prosedur/foto akan ditambahkan pada versi berikutnya. Pengaturan standar FFA dan normalitas tersimpan di browser.


## Install sebagai aplikasi (PWA)
File manifest dan service worker sudah ditambahkan. Deploy seluruh isi folder ke GitHub Pages, lalu buka URL di Chrome Android dan gunakan menu **Install app** atau **Add to Home screen**.
