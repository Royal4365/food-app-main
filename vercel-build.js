// This script runs during Vercel build to set up the database
const { execSync } = require('child_process');

try {
  console.log('🔄 Running Vercel environment setup...');
  
  // Create .env.local file from Vercel environment variables
  execSync('node scripts/vercel-env-setup.js', { stdio: 'inherit' });
  console.log('✅ Environment setup completed');
  
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
  console.error('❌ Setup failed:', error);
  // Don't fail the build if setup fails
  // This allows deployment to continue even if setup fails
  // process.exit(1);
}