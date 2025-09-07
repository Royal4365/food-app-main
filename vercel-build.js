// This script runs during Vercel build to set up the database
const { execSync } = require('child_process');

try {
  console.log('🔄 Running database setup script...');
  
  // Only run database setup in production environment
  if (process.env.VERCEL_ENV === 'production') {
    console.log('🔄 Setting up production database...');
    execSync('node scripts/setup-db.js', { stdio: 'inherit' });
    console.log('✅ Database setup completed successfully');
  } else {
    console.log('⏭️ Skipping database setup in development environment');
  }
} catch (error) {
  console.error('❌ Database setup failed:', error);
  // Don't fail the build if database setup fails
  // This allows deployment to continue even if DB setup fails
  // process.exit(1);
}