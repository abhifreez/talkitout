#!/bin/sh
set -e

echo "🚀 Starting TalkItOut Backend..."

# Run migrations
echo "📦 Running database migrations..."
if npx prisma migrate deploy; then
  echo "✅ Migrations applied successfully"
else
  echo "⚠️  No migrations found or migration failed"
  echo "📦 Pushing schema to database..."
  npx prisma db push --accept-data-loss || echo "⚠️  Schema push failed"
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Seed database (will only seed if tables are empty)
echo "🌱 Seeding database..."
if [ -f "dist/prisma/seed.js" ]; then
  npm run seed || echo "⚠️  Seeding failed or already completed"
else
  echo "⚠️  Seed script not found, skipping seeding"
fi

# Start the application
echo "✨ Starting NestJS application..."
exec npm run start:prod
