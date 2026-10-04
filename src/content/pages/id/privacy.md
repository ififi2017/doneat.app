---
title: "Kebijakan privasi — DoneAt"
description: "Bagaimana DoneAt menyimpan data secara lokal secara bawaan, menawarkan sinkronisasi iCloud pribadi opsional di iPhone dan iPad, serta menangani analitik dan layanan pihak ketiga."
heading: "Kebijakan privasi"
intro: "Halaman ini menjelaskan bagaimana DoneAt menyimpan dan memproses informasi: situs resmi, timer web, dan aplikasi di iPhone, iPad, Mac, dan Windows."
updatedLabel: "Terakhir diperbarui"
updated: "6 September 2026"
---

## Data yang disimpan DoneAt

Informasi yang kamu masukkan disimpan secara lokal secara bawaan: di penyimpanan lokal browser pada timer web, dan di data aplikasi di iPhone, iPad, Mac, dan Windows. DoneAt tidak menyediakan akun produk dan tidak mengirim informasi ini ke server DoneAt.

Di iPhone dan iPad, kamu bisa memilih menyalakan sinkronisasi iCloud. Ia menyimpan jadwal, catatan, gaji, preferensi pengingat, tampilan, bahasa, profil hidup, dan data Fokus di basis data iCloud pribadimu di bawah Akun Apple. Otorisasi notifikasi, perlindungan biometrik, pengaturan Live Activity, timer kerja saat ini, dan status pengaturan awal tetap di masing-masing perangkat. Timer web, aplikasi Mac, dan aplikasi Windows tetap lokal dan bukan bagian dari sinkronisasi ini.

Hitung mundur, kemajuan, dan perkiraan penghasilan dihitung di perangkat kamu dari informasi ini.

Biasanya mencakup:

- Jam mulai dan jam selesai, hari kerja, serta pengaturan istirahat atau lembur
- Jumlah gaji, periode bayar, dan riwayat gaji karier
- Catatan kerja dan koreksi, tahap karier, serta tonggak hidup atau tanggal yang kamu pilih untuk dimasukkan
- Judul tugas Fokus, rencana, sesi, dan pengaturan istirahat
- Preferensi notifikasi dan pengingat
- Bahasa dan tampilan

## Sinkronisasi iCloud opsional

Sinkronisasi mati secara bawaan. Saat kamu mengaktifkannya di iPhone atau iPad, layanan CloudKit milik Apple menyimpan data yang dijelaskan di atas di basis data pribadi yang terkait dengan Akun Apple-mu. DoneAt tidak menerima salinan di servernya sendiri. Perangkat yang memakai Akun Apple yang sama bisa memulihkan dan menyinkronkan data itu; ini membutuhkan akun iCloud yang tersedia dan koneksi jaringan.

Mengaktifkan sinkronisasi membutuhkan DoneAt Plus. Sinkronisasi yang sudah aktif berlanjut setelah langganan berakhir. Mematikannya menghentikan sinkronisasi di perangkat itu dan mempertahankan baik salinan lokal saat ini maupun salinan iCloud yang ada. Mematikannya tidak menghapus salah satu salinan.

## Ekspor cadangan

Di iPhone dan iPad, ekspor cadangan hanya dibuat saat kamu memilih Ekspor. Cadangan lengkap mencakup catatan, pengaturan yang disinkronkan, gaji dan riwayat gaji karier, profil hidup, serta tugas dan sesi Fokus. Kamu juga bisa mengekspor tanpa profil hidup; opsi itu tetap mencakup gaji dan riwayat karier. Lembar berbagi sistem lalu membiarkan kamu memilih tempat menyimpan atau membagikan berkas.

Ekspor adalah berkas JSON yang bisa dibaca, bukan arsip yang dilindungi kata sandi. Pilih lokasi penyimpanan dan penerima yang sesuai dengan informasi di dalamnya. Berkas yang kamu simpan atau bagikan adalah salinan terpisah; menghapus data di DoneAt tidak menghapus berkas itu.

## Pembelian Plus

Di iPhone dan iPad, Apple menangani langganan Plus dan pembelian seumur hidup melalui App Store. DoneAt memakai StoreKit untuk memverifikasi status pembelian dan memulihkan akses, serta menyimpan catatan lokal atas hak yang terverifikasi dan tanggal kedaluwarsa jika ada. DoneAt tidak menerima detail kartu pembayaran dan tidak mengirim status pembelian ke server akun DoneAt. Apple memproses informasi pembelian menurut kebijakannya sendiri.

Langganan yang berakhir tidak menghapus catatan yang sudah ada. Ekspor dan penghapusan tetap tersedia tanpa langganan aktif.

## Situs resmi

[doneat.app](https://doneat.app) adalah situs statis. Situs ini tidak mengumpulkan sif atau gaji kamu. Membuka akar situs, atau jalur pendek seperti `/privacy` atau `/download`, mengikuti bahasa browser dan mengarahkanmu ke aula itu atau ke halaman dukungan bahasa Inggris atau Tionghoa Sederhana. Bahasa tetap ada di URL halaman; situs ini tidak memasang cookie bahasa.

Untuk meng-host halaman, Vercel dapat memproses informasi koneksi biasa seperti alamat IP dan pengenal browser menurut kebijakan privasinya sendiri. Proyek ini tidak menyimpan informasi itu atau memakainya untuk membuat profil tentangmu.

Situs resmi memakai analitik tanpa cookie dari Vercel untuk mengukur tampilan halaman dan kinerja pemuatan, serta sekelompok kecil penghitung agregat untuk melihat pintu masuk mana yang dipakai orang. Peristiwa berasal dari daftar tetap yang publik — misalnya `hall_view`, `download_view`, `download_from_web`, `web_timer_open`, atau `app_store_open` — dan bertambah per hari. Permintaan hanya membawa nama peristiwa. Ia tidak mencakup pengenal pengguna, sesi, bahasa, jadwal, atau gaji, dan tidak bisa dipakai untuk mengidentifikasi atau melacak seseorang.

Daftar peristiwa lengkap ada di repositori ini di [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Analitik timer web

Timer web di [off.rainif.com](https://off.rainif.com) juga memakai analitik tanpa cookie dari Vercel untuk mengukur tampilan halaman dan kinerja pemuatan. Ia memakai kumpulan penghitung agregat yang terpisah dan terbatas untuk memahami pemakaian fitur secara keseluruhan.

Peristiwa produk berasal dari daftar tetap publik yang lain, seperti `share_open` atau `countdown_start`, dan diagregasi per hari. Mereka tidak berisi pengenal pengguna, informasi sesi, jadwal, atau data gaji, dan tidak bisa dipakai untuk mengidentifikasi atau melacak seseorang.

Daftar peristiwa produk lengkap tersedia di repositori sumber terbuka produk. Penyedia hosting dan analitik dapat memproses informasi koneksi standar menurut kebijakan privasi masing-masing. Proyek ini tidak menyimpan informasi itu secara terpisah atau memakainya untuk membuat profil pengguna.

## Cookie

Timer web memakai cookie bernama `i18nextLng` untuk menyimpan kode bahasa agar kunjungan berikutnya bisa terbuka dalam bahasa yang kamu pilih. Cookie itu dipasang pada kunjungan pertama dari bahasa yang sedang ditampilkan, diperbarui saat kamu mengganti bahasa, kedaluwarsa setelah satu tahun, dan bisa dihapus di browser.

Baik situs resmi maupun timer web tidak memakai cookie iklan atau pelacakan lintas situs. Analitik yang dijelaskan di atas tidak bergantung pada cookie.

## Berbagi hitung mundur

URL tautan berbagi hanya berisi jam mulai dan jam selesai. Ia tidak berisi informasi gaji. Orang yang membuka tautan hanya bisa melihat jam sif. Gambar berbagi hitung mundur juga tidak memuat gaji. Ekspor cadangan berbeda: ia bisa berisi gaji dan data pribadi lain yang tercantum di atas.

Jika kamu memilih berbagi lewat layanan sosial pihak ketiga, kebijakan privasi layanan itu yang berlaku.

## Aplikasi di ponsel dan komputer

Aplikasi iPhone, iPad, Mac, dan Windows tidak mengumpulkan analitik pemakaian.

Build desktop yang dipasang dari GitHub memeriksa rilis yang lebih baru saat dimulai. Permintaan itu tidak berisi akun, gaji, atau data pemakaian, dan pemasang hanya diunduh setelah kamu mengonfirmasi pembaruan. Jika GitHub tidak bisa dijangkau langsung, kamu bisa memilih mencoba lagi lewat cermin pihak ketiga. Pembaruan yang diunduh lewat saluran mana pun diperiksa tanda tangannya sebelum dipasang.

Build yang dipasang dari Microsoft Store tidak memulai pemeriksaan pembaruan. Pembaruan disediakan oleh Microsoft Store.

Pengingat dijadwalkan dan ditampilkan secara lokal oleh sistem operasi. Aplikasi juga mengakses jaringan saat kamu membuka tautan eksternal atau memilih berbagi lewat layanan pihak ketiga.

## Widget, Live Activity, dan perlindungan perangkat

Widget dan Live Activity memakai informasi yang dibutuhkan untuk menampilkan timer dan kemajuan, termasuk informasi Fokus bila berlaku. Mereka tidak mencakup gaji. Notifikasi lokal juga tidak memuat gaji. Permukaan ini mungkin terlihat di Layar Utama atau Layar Terkunci; kamu bisa mengatur visibilitas dan izin notifikasi di aplikasi dan pengaturan sistem.

Saat DoneAt meminta kamu mengautentikasi untuk melindungi penghasilan atau catatan, autentikasi ditangani perangkat lewat Face ID, Touch ID, atau kode sandinya. DoneAt menerima hasil autentikasi, bukan data biometrik atau kode sandimu. Perlindungan ini diatur terpisah di setiap perangkat.

## Layanan pihak ketiga

DoneAt memakai layanan berikut untuk meng-host halaman, mengukur situs resmi dan timer web, mendistribusikan aplikasi, dan membuka tautan yang kamu pilih:

- Vercel — hosting situs resmi dan timer web; pengukuran tampilan halaman dan kinerja di keduanya
- Upstash — penyimpanan jumlah peristiwa agregat harian untuk situs resmi dan timer web
- GitHub — kode sumber, informasi rilis, dan pemeriksaan pembaruan untuk build desktop yang didistribusikan lewat GitHub
- Apple — distribusi aplikasi, pembayaran Plus, dan verifikasi pembelian lewat App Store dan StoreKit, serta sinkronisasi iCloud pribadi saat kamu memilih mengaktifkannya di iPhone atau iPad
- Microsoft — distribusi dan pembaruan untuk cantuman Microsoft Store yang kamu buka
- Cermin unduhan pihak ketiga, dipakai hanya saat kamu memilihnya dari build desktop yang didistribusikan lewat GitHub
- Layanan sosial pihak ketiga yang kamu pilih saat berbagi hitung mundur

## Menghapus data

Di timer web, hapus data situs ini di browser, termasuk penyimpanan lokal dan cookie bahasa. Di Mac atau Windows, copot pemasangan aplikasi dan hapus datanya.

Di iPhone dan iPad, mencopot pemasangan menghapus data yang tersimpan di perangkat itu. Jika kamu mengaktifkan sinkronisasi iCloud, salinan iCloud pribadi tetap tersedia bagi perangkat lainmu. Hapus dari iCloud di pengaturan Catatan & Data DoneAt menghapus salinan iCloud dan membersihkan catatan tersinkron yang terkait di perangkat yang masuk ke Akun Apple itu saat mereka menyinkron berikutnya. Menghapus catatan hanya dari perangkat ini meninggalkan salinan iCloud yang bisa dipulihkan. Berkas cadangan yang pernah kamu ekspor harus dihapus terpisah dari tempat kamu menyimpan atau membagikannya.

DoneAt tidak bisa mengakses Akun Apple-mu atau menghapus data iCloud pribadinya atas namamu. DoneAt juga tidak bisa mengakses atau menghapus data lokalmu dari sebuah server.

## Perubahan kebijakan ini

Saat kebijakan ini diperbarui, tanggal terakhir diperbarui di bagian atas halaman juga akan direvisi. Perubahan material akan dicantumkan di catatan rilis, dan versi sebelumnya tersedia di riwayat commit repositori sumber terbuka.

## Hubungi kami

Pertanyaan tentang kebijakan ini, atau tentang cara informasi ditangani, dikirim ke [hello@doneat.app](mailto:hello@doneat.app). Masalah produk dan saran juga bisa dikirim lewat [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).

Jika kamu menemukan perbedaan antara kebijakan ini dan perilaku produk yang sebenarnya, tulis ke alamat itu atau buka sebuah issue.
