// Simple integration test to verify the database setup
const { Pool } = require('pg');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testIntegration() {
  console.log('🧪 Testing Database Integration...\n');
  
  try {
    const client = await pool.connect();
    
    // Test 1: Check if restaurants exist
    console.log('1. Testing restaurants data...');
    const restaurantsResult = await client.query('SELECT COUNT(*) as count FROM restaurants');
    const restaurantCount = parseInt(restaurantsResult.rows[0].count);
    console.log(`✅ Found ${restaurantCount} restaurants`);
    
    if (restaurantCount > 0) {
      const sampleRestaurant = await client.query('SELECT name, category FROM restaurants LIMIT 1');
      console.log(`   - Sample: ${sampleRestaurant.rows[0].name} (${sampleRestaurant.rows[0].category})`);
    }
    
    // Test 2: Check if categories exist
    console.log('\n2. Testing categories data...');
    const categoriesResult = await client.query('SELECT COUNT(*) as count FROM categories');
    const categoryCount = parseInt(categoriesResult.rows[0].count);
    console.log(`✅ Found ${categoryCount} categories`);
    
    if (categoryCount > 0) {
      const categories = await client.query('SELECT name FROM categories');
      console.log(`   - Categories: ${categories.rows.map(r => r.name).join(', ')}`);
    }
    
    // Test 3: Check if menu items exist
    console.log('\n3. Testing menu items data...');
    const menuResult = await client.query('SELECT COUNT(*) as count FROM menu_items');
    const menuCount = parseInt(menuResult.rows[0].count);
    console.log(`✅ Found ${menuCount} menu items`);
    
    if (menuCount > 0) {
      const sampleMenu = await client.query('SELECT name, price FROM menu_items LIMIT 1');
      console.log(`   - Sample: ${sampleMenu.rows[0].name} (₹${sampleMenu.rows[0].price})`);
    }
    
    // Test 4: Check if restaurant extras exist
    console.log('\n4. Testing restaurant extras data...');
    const extrasResult = await client.query('SELECT COUNT(*) as count FROM restaurant_extras');
    const extrasCount = parseInt(extrasResult.rows[0].count);
    console.log(`✅ Found ${extrasCount} restaurant extras`);
    
    client.release();
    
    console.log('\n🎉 Database integration test completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Restaurants: ${restaurantCount}`);
    console.log(`   - Categories: ${categoryCount}`);
    console.log(`   - Menu Items: ${menuCount}`);
    console.log(`   - Restaurant Extras: ${extrasCount}`);
    
    if (restaurantCount > 0 && categoryCount > 0 && menuCount > 0) {
      console.log('\n✅ All data is properly seeded and ready for the frontend!');
      console.log('\n🚀 You can now:');
      console.log('   1. Start the dev server: npm run dev');
      console.log('   2. Visit http://localhost:3000 to see the homepage');
      console.log('   3. Browse restaurants and menus from the database');
    } else {
      console.log('\n⚠️  Some data is missing. Run "npm run setup-db" to seed the database.');
    }
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. The database is set up: npm run setup-db');
    console.log('   2. The .env.local file exists with DATABASE_URL');
  } finally {
    await pool.end();
  }
}

testIntegration();



