# 🔧 Fix Docker BuildKit Issues

## Problem

Docker BuildKit has I/O errors and corrupted cache. This prevents building images.

**Error**: `I/O error` when building, `error committing: write /var/lib/docker/buildkit/metadata_v2.db: input/output error`

---

## Solution: Restart Docker Desktop

### Step 1: Restart Docker Desktop

**macOS:**
1. Click Docker icon in menu bar
2. Select "Quit Docker Desktop"
3. Wait 10 seconds
4. Reopen Docker Desktop from Applications

**Or via Terminal:**
```bash
# Quit Docker
killall Docker

# Wait 5 seconds

# Restart Docker Desktop
open -a Docker
```

### Step 2: Clean Docker System

```bash
# Wait for Docker to fully start (look for whale icon in menu bar)

# Clean build cache
docker builder prune -f

# Clean system (optional - removes unused images)
docker system prune -af
```

### Step 3: Try Build Again

```bash
cd /Users/abhinavagarwal/Documents/Developer/talkitout.com

# Build with simple Dockerfile
docker-compose build backend

# If successful, start everything
docker-compose up -d
```

---

## Alternative: Simplified Build

I've created a simplified single-stage Dockerfile that avoids the multi-stage build issues.

The `docker-compose.yml` now uses `Dockerfile.simple` which is more reliable.

---

## If Still Having Issues

### Option 1: Reset Docker Desktop

**macOS:**
1. Open Docker Desktop
2. Go to Settings > Troubleshoot
3. Click "Clean / Purge data"
4. Click "Reset to factory defaults"
5. Restart Docker Desktop

### Option 2: Reinstall Docker Desktop

1. Quit Docker Desktop
2. Delete `/Applications/Docker.app`
3. Delete `~/Library/Group Containers/group.com.docker`
4. Download fresh Docker Desktop from https://www.docker.com/products/docker-desktop
5. Install and restart

### Option 3: Use Development Mode (No Docker Build)

Run services manually without Docker:

```bash
# Terminal 1: Start PostgreSQL only
docker run --name postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=talkitout \
  -p 5432:5432 \
  -d postgres:16-alpine

# Terminal 2: Run backend locally
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run start:dev

# Terminal 3: Run frontend locally
cd ..
npm run dev
```

This bypasses Docker build issues entirely.

---

## Quick Fix Steps

```bash
# 1. Restart Docker
killall Docker && sleep 5 && open -a Docker

# 2. Wait for Docker to start (check menu bar icon)

# 3. Clean cache
docker builder prune -f

# 4. Rebuild
cd /Users/abhinavagarwal/Documents/Developer/talkitout.com
docker-compose build backend

# 5. Start services
docker-compose up -d
```

---

## Verify Fix

After Docker restart and rebuild:

```bash
# Should build successfully
docker-compose build

# Should show all services running
docker-compose ps

# Should see healthy status
docker-compose up -d
docker-compose ps
```

---

## Need Immediate Solution?

**Skip Docker entirely** and run manually:

```bash
# Run PostgreSQL in Docker (works without build)
docker run --name talkitout-pg \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=talkitout \
  -p 5432:5432 \
  -d postgres:16-alpine

# Run backend locally
cd backend
npm install
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
npm run start:dev

# Run frontend locally  
cd ..
npm run dev
```

Access: http://localhost:5173/admin/login

---

**This avoids all Docker build issues and gets you running immediately!**
