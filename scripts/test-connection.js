const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Try multiple paths for .env.local
const envPaths = [
  path.join(__dirname, '../.env.local'),
  path.join(process.cwd(), '.env.local'),
  '.env.local'
];

let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log('Loading .env.local from:', envPath);
    require('dotenv').config({ path: envPath });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log('Tried these paths:');
  envPaths.forEach(p => console.log('  -', p));
}

async function testConnection() {
  console.log('Testing NeonDB connection...');
  console.log('Database URL:', process.env.DATABASE_URL ? 'Found' : 'Not found');
  
  // Debug: Show what we found
  if (process.env.DATABASE_URL) {
    console.log('URL starts with:', process.env.DATABASE_URL.substring(0, 20) + '...');
  }
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    console.log('Make sure .env.local file exists with your NeonDB connection string');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connection successful!');
    
    // Test a simple query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Query successful:', result.rows[0].current_time);
    
    client.release();
    await pool.end();
    
    console.log('🎉 Database connection test passed!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();
