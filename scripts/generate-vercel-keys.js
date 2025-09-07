// Script to generate secure keys for Vercel deployment
const crypto = require('crypto');

// Generate random bytes and convert to hex string
function generateSecureKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Generate keys
const jwtSecret = generateSecureKey();
const nextAuthSecret = generateSecureKey();

// Format for .env file
const envFormat = `
# Generated secure keys for Vercel deployment

# JWT Secret for custom auth
JWT_SECRET="${jwtSecret}"

# NextAuth.js
NEXTAUTH_SECRET="${nextAuthSecret}"
NEXTAUTH_URL="https://your-app-name.vercel.app"  # Replace with your actual Vercel URL
`;

// Output the keys
console.log('\n🔐 Generated Secure Keys for Vercel Deployment:\n');
console.log('JWT_SECRET:');
console.log(jwtSecret);
console.log('\nNEXTAUTH_SECRET:');
console.log(nextAuthSecret);

console.log('\n📋 Copy these values to your Vercel environment variables');
console.log('\n⚠️  IMPORTANT: Replace "your-app-name" in NEXTAUTH_URL with your actual Vercel app name');
console.log('\n📝 Full .env format:');
console.log(envFormat);