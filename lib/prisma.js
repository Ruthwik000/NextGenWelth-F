import { PrismaClient } from "@prisma/client";

// PrismaClient configuration with connection retry logic
const prismaClientSingleton = () => {
  // Check if DATABASE_URL is valid before creating the client
  let databaseUrl = process.env.DATABASE_URL;

  try {
    // Validate the URL format
    if (databaseUrl) {
      new URL(databaseUrl);
    }
  } catch (error) {
    console.error('Invalid DATABASE_URL format:', error.message);
    // Use a fallback for development or provide a dummy URL that won't connect
    // This allows the app to start even with an invalid URL
    databaseUrl = process.env.NODE_ENV === 'development'
      ? 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public'
      : undefined;
  }

  const clientOptions = {
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  };

  // Only add datasource configuration if we have a valid URL
  if (databaseUrl) {
    clientOptions.datasources = {
      db: {
        url: databaseUrl,
      },
    };
  }

  return new PrismaClient(clientOptions);
};

// Use globalThis to store the client instance across hot reloads in development
const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

// Gracefully handle connection issues
process.on('beforeExit', async () => {
  await db.$disconnect();
});

process.on('SIGINT', async () => {
  await db.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await db.$disconnect();
  process.exit(0);
});

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
