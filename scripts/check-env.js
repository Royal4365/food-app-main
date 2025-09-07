const fs = require('fs');
const path = require('path');

console.log('Current working directory:', process.cwd());
console.log('Script directory:', __dirname);

const envPath = path.join(process.cwd(), '.env.local');
console.log('Looking for .env.local at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
  console.log('File content:');
  const content = fs.readFileSync(envPath, 'utf8');
  console.log(content);
} else {
  console.log('Creating .env.local file...');
  
  const envContent = `# Database
DATABASE_URL='postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-fancy-violet-a1df44to-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# JWT Secret for custom auth
JWT_SECRET="your-jwt-secret-here-change-this-in-production"
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local file created successfully!');
    console.log('Content written:');
    console.log(envContent);
  } catch (error) {
    console.error('❌ Failed to create .env.local file:', error.message);
  }
}


