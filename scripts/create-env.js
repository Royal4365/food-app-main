const fs = require('fs');
const path = require('path');

const envContent = `# Database
DATABASE_URL='postgresql://neondb_owner:npg_jpX5e2wPcrYs@ep-fancy-violet-a1df44to-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# JWT Secret for custom auth
JWT_SECRET="your-jwt-secret-here-change-this-in-production"
`;

const envPath = path.join(__dirname, '../.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('Location:', envPath);
  console.log('Content:');
  console.log(envContent);
} catch (error) {
  console.error('❌ Failed to create .env.local file:', error.message);
}


