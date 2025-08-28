# Redis Visitor Monitor API (Vercel)

API sederhana untuk mencatat visitor website menggunakan Redis Cloud.

## Endpoint
- `/api/visit?page=home` → menambah visitor + log IP
- `/api/stats` → menampilkan statistik (total, unique, log terakhir)

## Cara Deploy
1. Fork repo ini ke GitHub.
2. Import project ke [Vercel](https://vercel.com/).
3. Tambahkan Environment Variables:
   - `REDIS_HOST` = host dari Redis Cloud
   - `REDIS_PORT` = port Redis Cloud
   - `REDIS_PASSWORD` = password Redis Cloud
4. Deploy.

