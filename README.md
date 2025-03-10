# Fullstack Engineer Assessment Test

Aplikasi Todo List berbasis web yang mengimplementasikan fitur autentikasi, manajemen role (Lead & Team), CRUD task, dan penugasan task. Aplikasi ini dibangun menggunakan Next.js (App Router) dengan TypeScript, Tailwind CSS, dan PostgreSQL (menggunakan query native melalui Drizzle ORM). Selain itu, aplikasi sudah terintegrasi dengan Docker Compose untuk memudahkan deployment ke produksi.

## Fitur Utama

- **Next.js & TypeScript**: Struktur aplikasi menggunakan App Router dengan TypeScript.
- **Tailwind CSS**: Tampilan yang responsif dan mobile-first.
- **PostgreSQL**: Database menggunakan PostgreSQL dengan query native melalui Drizzle ORM.
- **Autentikasi & Otorisasi**: Sistem login menggunakan JWT dan proteksi route berbasis role (Lead & Team).
- **CRUD Task**: Fitur pembuatan, update, delete, dan update status task.
- **Docker Compose**: Konfigurasi Docker untuk menjalankan aplikasi dan PostgreSQL secara bersamaan.
- **Database Migration & Seeding**: Menggunakan `drizzle-kit` untuk migrasi dan seeding database.

## Prasyarat

- [Node.js](https://nodejs.org/) v21+
- [PostgreSQL](https://www.postgresql.org/) (jika menjalankan secara manual)
- [Docker & Docker Compose](https://docs.docker.com/compose/) (opsional, untuk deployment dengan container)

## ERD

![ERD](./public/erd.png)

## Scripts

Di dalam file `package.json`, terdapat beberapa script penting:

- **`npm run dev`**: Menjalankan aplikasi dalam mode development.
- **`npm run build`**: Membangun aplikasi untuk produksi.
- **`npm run start`**: Menjalankan aplikasi dalam mode produksi.
- **`npm run lint`**: Mengecek code style menggunakan ESLint.
- **`npm run db:push`**: Menjalankan migrasi database menggunakan `drizzle-kit push`.
- **`npm run db:studio`**: Membuka studio database untuk visualisasi menggunakan `drizzle-kit studio`.
- **`npm run db:seed`**: Menjalankan seeding data dengan menjalankan file `./db/seed.ts`.
- **`npm run db:create`**: Membuat database baru `./db/createDB.ts`.

## Instalasi Development Manual

1. **Clone Repository:**

   ```bash
   git clone https://github.com/blackjac7/FE_ISI_TEST_FEBRIANSYAH.git
   cd FE_ISI_TEST_FEBRIANSYAH
   ```

2. **Install Dependensi:**

   ```bash
   npm install
   ```

3. **Setup Environment:**

   Buat file .env di root project dengan konfigurasi seperti berikut (sesuaikan nilainya):

   ```dotenv
   NODE_ENV=development
   DATABASE_URL_CREATE=postgres://username:yourpassword@localhost:5432
   DATABASE_URL=postgres://username:yourpassword@localhost:5432/yourdbname
   JWT_SECRET=your_jwt_secret
   ```

4. **Jalankan migrasi dan seeding:**

   ```bash
   npm run db:create
   npm run db:push
   npm run db:seed
   ```

5. **Jalankan Aplikasi:**

   ```bash
   npm run dev
   ```

   Akses aplikasi di [http://localhost:3000](http://localhost:3000)

## Instalasi Menggunakan Docker Compose

1. **Clone Repository:**

   ```bash
   git clone https://github.com/blackjac7/FE_ISI_TEST_FEBRIANSYAH.git
   cd FE_ISI_TEST_FEBRIANSYAH
   ```

2. **Setup Environment untuk Docker:**

   Buat file .env.docker di root project dengan isi seperti berikut (sesuaikan nilainya):

   ```dotenv
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=yourpassword
   POSTGRES_DB=yourdbname
   DATABASE_URL=postgres://postgres:yourpassword@db:5432/yourdbname
   JWT_SECRET=your_jwt_secret
   ```

3. **Build dan Jalankan dengan Docker Compose:**

   ```bash
   docker-compose up --build -d
   ```

   Perintah ini akan:

   - Membangun image untuk aplikasi, service migrasi, dan PostgreSQL.
   - Menjalankan container untuk PostgreSQL (db), migrasi (migrate), dan aplikasi (app).
   - Aplikasi akan berjalan di port 3000 di host.

4. **Akses Aplikasi:**

   Buka browser dan akses [http://localhost:3000](http://localhost:3000)

5. **Melihat Log:**

   Untuk melihat log container, gunakan:

   ```bash
   docker-compose logs -f app
   docker-compose logs -f db
   ```

## Troubleshooting

### Error pada Server Components:

Pastikan semua variabel lingkungan sudah terkonfigurasi dengan benar dan database sudah terhubung.

### Log Error:

Gunakan `docker-compose logs -f app` untuk melihat error detail di container.

### Migrasi Database:

Jika terjadi masalah dengan migrasi, pastikan perintah `npm run db:push` dan `npm run db:seed` sudah berjalan dengan benar.
