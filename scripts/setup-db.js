const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Check if DATABASE_URL is already set in environment (e.g., Vercel environment variables)
if (process.env.DATABASE_URL) {
  console.log('✅ Using DATABASE_URL from environment variables');
} else {
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
    console.log('❌ .env.local file not found, but continuing to check for environment variables');
  }
  
  // Final check if DATABASE_URL is available
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables or .env.local');
    process.exit(1);
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    console.log('Database URL:', process.env.DATABASE_URL ? 'Found' : 'Not found');
    
    // Test connection first
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    client.release();
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Creating tables...');
    
    // Execute schema as a single statement with error handling
    try {
      await pool.query(schema);
    } catch (error) {
      // If it's a "already exists" error, that's okay
      if (error.code === '42710' || error.code === '42P07') {
        console.log('⚠️  Some database objects already exist, continuing...');
      } else {
        throw error;
      }
    }
    console.log('✅ Tables created successfully');
    
    // Read and execute seed data
    const seedPath = path.join(__dirname, '../database/seed.sql');
    const seed = fs.readFileSync(seedPath, 'utf8');
    
    console.log('Seeding database...');
    
    // Execute seed data with error handling
    try {
      await pool.query(seed);
    } catch (error) {
      // If it's a duplicate data error, that's okay
      if (error.code === '23505') {
        console.log('⚠️  Some data already exists, continuing...');
      } else {
        throw error;
      }
    }
    console.log('✅ Database seeded successfully');
    
    console.log('🎉 Database setup completed!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
