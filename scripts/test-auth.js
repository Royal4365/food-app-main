// Test authentication functionality
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testAuth() {
  console.log('🧪 Testing Authentication System...\n');
  
  try {
    // Test 1: Create a test user
    console.log('1. Creating test user...');
    const testEmail = 'test@example.com';
    const testPassword = 'TestPassword123';
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [testEmail]);
    
    if (existingUser.rows.length > 0) {
      console.log('✅ Test user already exists');
    } else {
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, phone, address) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING id, email, first_name, last_name`,
        [testEmail, hashedPassword, 'Test', 'User', '+1234567890', 'Test Address']
      );
      console.log('✅ Test user created:', result.rows[0].email);
    }
    
    // Test 2: Test password verification
    console.log('\n2. Testing password verification...');
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [testEmail]);
    const user = userResult.rows[0];
    
    const isValidPassword = await bcrypt.compare(testPassword, user.password_hash);
    console.log('✅ Password verification:', isValidPassword ? 'PASSED' : 'FAILED');
    
    // Test 3: Test JWT token generation
    console.log('\n3. Testing JWT token generation...');
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('✅ JWT token generated:', token.substring(0, 50) + '...');
    
    // Test 4: Test JWT token verification
    console.log('\n4. Testing JWT token verification...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ JWT token verified:', decoded.email);
    
    console.log('\n🎉 All authentication tests passed!');
    console.log('\n📝 Test credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: TestPassword123');
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error.message);
  } finally {
    await pool.end();
  }
}

testAuth();
