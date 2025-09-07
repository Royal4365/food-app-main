// Script to test database connection
const { Pool } = require('pg');

// Create a connection pool with the same settings as the application
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  console.log('🔍 Testing database connection...');
  console.log(`🔌 Using DATABASE_URL: ${process.env.DATABASE_URL?.substring(0, 25)}...`);
  
  try {
    // Try to connect to the database
    const client = await pool.connect();
    console.log('✅ Successfully connected to the database!');
    
    // Test basic queries to verify data access
    console.log('\n📊 Testing database queries:');
    
    // Test restaurants table
    const restaurantsResult = await client.query('SELECT COUNT(*) as count FROM restaurants');
    const restaurantCount = parseInt(restaurantsResult.rows[0].count);
    console.log(`✅ Found ${restaurantCount} restaurants`);
    
    if (restaurantCount > 0) {
      const sampleRestaurant = await client.query('SELECT name, category FROM restaurants LIMIT 1');
      console.log(`   - Sample: ${sampleRestaurant.rows[0].name} (${sampleRestaurant.rows[0].category})`);
    }
    
    // Test menu_items table
    const menuResult = await client.query('SELECT COUNT(*) as count FROM menu_items');
    const menuCount = parseInt(menuResult.rows[0].count);
    console.log(`✅ Found ${menuCount} menu items`);
    
    if (menuCount > 0) {
      const sampleMenu = await client.query('SELECT name, price FROM menu_items LIMIT 1');
      console.log(`   - Sample: ${sampleMenu.rows[0].name} (₹${sampleMenu.rows[0].price})`);
    }
    
    // Release the client back to the pool
    client.release();
    
    console.log('\n🎉 Database connection test completed successfully!');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // Provide more detailed error information
    if (error.code === 'ENOTFOUND') {
      console.error('   The database host could not be found. Check your DATABASE_URL.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   The connection was refused. Make sure your database is running and accessible.');
    } else if (error.code === '28P01') {
      console.error('   Invalid username/password. Check your DATABASE_URL credentials.');
    } else if (error.code === '3D000') {
      console.error('   Database does not exist. Check your DATABASE_URL database name.');
    }
    
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Verify your DATABASE_URL environment variable is correct');
    console.log('   2. Ensure your database allows connections from your current IP address');
    console.log('   3. Check if your database provider is experiencing any outages');
    console.log('   4. For Vercel deployments, make sure you\'ve added DATABASE_URL to your environment variables');
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the test
testConnection();