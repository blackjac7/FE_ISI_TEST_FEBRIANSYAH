# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Salin file package dan lockfile, lalu install dependensi
COPY package.json package-lock.json ./
RUN npm ci

# Salin seluruh source code dan build aplikasi Next.js
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner
WORKDIR /app

# Set environment ke production
ENV NODE_ENV=production

# Salin file penting dari stage builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]

