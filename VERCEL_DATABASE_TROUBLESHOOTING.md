# Troubleshooting Database Connection Issues on Vercel

## Issue Description

After deploying to Vercel, the restaurant and menu pages are showing errors. This is likely due to database connection issues between the Vercel deployment and your PostgreSQL database.

## Common Causes

1. **Environment Variables**: The `DATABASE_URL` environment variable might not be properly set in the Vercel dashboard.
2. **Database Access**: Your PostgreSQL database might not allow connections from Vercel's IP addresses.
3. **SSL Requirements**: Vercel requires SSL connections to databases, which might not be properly configured.
4. **Connection Limits**: You might have reached the connection limit for your database plan.

## Solutions

### 1. Verify Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Check that `DATABASE_URL` is correctly set with the proper connection string
4. Make sure the connection string includes `?sslmode=require` at the end
5. Redeploy your application after making changes

### 2. Configure Database Access

If you're using NeonDB:

1. Go to your NeonDB dashboard
2. Navigate to your project settings
3. Under "Connection Settings", ensure "Allow connections from all IP addresses" is enabled
4. If you prefer to restrict access, add Vercel's IP ranges to the allowed list

For other PostgreSQL providers, check their documentation for allowing external connections.

### 3. Verify SSL Configuration

Your database connection is already configured to accept insecure SSL connections with:

```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
```

This should work for most cloud database providers. If you're still having issues:

1. Check if your database provider requires specific SSL settings
2. Try using a different SSL configuration if needed

### 4. Check Database Logs

1. Access your database provider's dashboard
2. Check connection logs for any errors
3. Look for failed connection attempts from Vercel's IP addresses

### 5. Test Database Connection Locally

Create a simple script to test your database connection:

```javascript
// test-db-connection.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connection successful!');
    const result = await client.query('SELECT COUNT(*) FROM restaurants');
    console.log(`Found ${result.rows[0].count} restaurants`);
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
```

Run this script locally with your Vercel environment variables to test the connection.

### 6. Check Vercel Logs

1. Go to your Vercel project dashboard
2. Navigate to "Deployments" > [latest deployment] > "Functions"
3. Look for API routes related to restaurants and menu
4. Check the logs for any database connection errors

## Next Steps

If you've verified all the above and are still experiencing issues:

1. Try creating a new database instance and updating the connection string
2. Check if your database provider has any maintenance or outages
3. Contact Vercel support with specific error logs

## Verifying the Fix

After making changes:

1. Redeploy your application on Vercel
2. Test the restaurant and menu pages
3. Check browser console for any errors
4. Verify that data is loading correctly