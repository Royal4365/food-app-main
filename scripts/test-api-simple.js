// Simple API test using built-in fetch
async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');
  
  try {
    // Test restaurants endpoint
    console.log('1. Testing /api/restaurants...');
    const restaurantsResponse = await fetch('http://localhost:3000/api/restaurants');
    const restaurants = await restaurantsResponse.json();
    console.log(`✅ Found ${restaurants.length} restaurants`);
    if (restaurants.length > 0) {
      console.log(`   - ${restaurants[0].name} (${restaurants[0].category})`);
    }
    
    // Test categories endpoint
    console.log('\n2. Testing /api/categories...');
    const categoriesResponse = await fetch('http://localhost:3000/api/categories');
    const categories = await categoriesResponse.json();
    console.log(`✅ Found ${categories.length} categories`);
    if (categories.length > 0) {
      console.log(`   - ${categories.map(c => c.name).join(', ')}`);
    }
    
    // Test menu endpoint
    console.log('\n3. Testing /api/menu...');
    const menuResponse = await fetch('http://localhost:3000/api/menu');
    const menu = await menuResponse.json();
    console.log(`✅ Found ${menu.length} menu items`);
    if (menu.length > 0) {
      console.log(`   - ${menu[0].name} (₹${menu[0].price})`);
    }
    
    console.log('\n🎉 All API endpoints are working correctly!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('\n💡 Make sure the dev server is running: npm run dev');
  }
}

// Wait a bit for the server to start, then test
setTimeout(testAPI, 5000);



