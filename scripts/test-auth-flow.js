// Test the complete authentication flow
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testAuthFlow() {
  console.log('🧪 Testing Complete Authentication Flow...\n');
  
  try {
    // Test 1: Check if test user exists
    console.log('1. Checking test user...');
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', ['test@example.com']);
    
    if (userResult.rows.length === 0) {
      console.log('❌ Test user not found. Please run: npm run test-auth');
      return;
    }
    
    const user = userResult.rows[0];
    console.log('✅ Test user found:', user.email);
    console.log('   - Name:', user.first_name, user.last_name);
    console.log('   - Phone:', user.phone);
    console.log('   - Address:', user.address);
    
    // Test 2: Test login API
    console.log('\n2. Testing login API...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'TestPassword123',
      }),
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login API working');
      console.log('   - Success:', loginData.success);
      console.log('   - User ID:', loginData.user.id);
      console.log('   - User Name:', loginData.user.first_name, loginData.user.last_name);
    } else {
      console.log('❌ Login API failed:', loginResponse.status);
    }
    
    // Test 3: Test profile page accessibility
    console.log('\n3. Testing profile page...');
    const profileResponse = await fetch('http://localhost:3000/profile');
    
    if (profileResponse.ok) {
      console.log('✅ Profile page accessible');
    } else {
      console.log('❌ Profile page failed:', profileResponse.status);
    }
    
    // Test 4: Test orders page accessibility
    console.log('\n4. Testing orders page...');
    const ordersResponse = await fetch('http://localhost:3000/orders');
    
    if (ordersResponse.ok) {
      console.log('✅ Orders page accessible');
    } else {
      console.log('❌ Orders page failed:', ordersResponse.status);
    }
    
    console.log('\n🎉 Authentication flow test completed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Visit http://localhost:3000/login');
    console.log('   2. Login with: test@example.com / TestPassword123');
    console.log('   3. Check the "My Account" dropdown in the navbar');
    console.log('   4. Click "My Profile" to access the profile page');
    console.log('   5. Click "My Orders" to access the orders page');
    
  } catch (error) {
    console.error('❌ Authentication flow test failed:', error.message);
  } finally {
    await pool.end();
  }
}

testAuthFlow();


