// This script creates a .env.local file from Vercel environment variables during build
const fs = require('fs');
const path = require('path');

console.log('🔄 Setting up .env.local file for Vercel deployment...');

// Create .env.local content from environment variables
const envContent = `# Database
DATABASE_URL='${process.env.DATABASE_URL || ""}'

# NextAuth.js
NEXTAUTH_URL="${process.env.NEXTAUTH_URL || "http://localhost:3000"}"
NEXTAUTH_SECRET="${process.env.NEXTAUTH_SECRET || ""}"

# JWT Secret for custom auth
JWT_SECRET="${process.env.JWT_SECRET || ""}"
`;

const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully for Vercel deployment!');
  console.log('Location:', envPath);
  
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ WARNING: DATABASE_URL environment variable is not set in Vercel');
    console.warn('Please set this in your Vercel project settings');
  }
} catch (error) {
  console.error('❌ Failed to create .env.local file:', error.message);
}