// This script checks if the DATABASE_URL is valid before running migrations
// It's used in the build process to prevent build failures due to missing or invalid database URLs

const { execSync } = require('child_process');

try {
  // Check if DATABASE_URL is set and valid
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL is not set. Skipping migrations.');
    process.exit(0);
  }

  // Check if the URL is valid
  const url = new URL(process.env.DATABASE_URL);
  if (!['postgresql', 'postgres', 'mysql', 'mongodb', 'mongodb+srv', 'sqlserver'].includes(url.protocol.replace(':', ''))) {
    console.log(`Invalid database protocol: ${url.protocol}. Skipping migrations.`);
    process.exit(0);
  }

  // Run the migrations
  console.log('Running database migrations...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Migrations completed successfully.');
} catch (error) {
  console.error('Error checking database URL or running migrations:', error.message);
  console.log('Skipping migrations to allow build to continue.');
  process.exit(0); // Exit with success to allow the build to continue
}
