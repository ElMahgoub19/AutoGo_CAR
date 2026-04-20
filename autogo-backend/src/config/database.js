// AutoGo Backend - Prisma Client Singleton (Prisma 7 + pg adapter)
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/autogo?schema=public';

const adapter = new PrismaPg(connectionString);

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

module.exports = prisma;
