# Database Setup Guide

This guide will help you set up the NeonDB database for the Maharashtrian Thali Food Delivery website.

## Prerequisites

1. **NeonDB Account**: Sign up at [neon.tech](https://neon.tech)
2. **Node.js**: Version 18 or higher
3. **npm**: Package manager

## Step 1: Create NeonDB Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string (it looks like: `postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require`)

## Step 2: Environment Variables

1. Create a `.env.local` file in the project root
2. Add your database connection string:

```env
# Database
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# JWT Secret for custom auth
JWT_SECRET="your-jwt-secret-here"
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Setup Database

Run the database setup script to create tables and seed data:

```bash
npm run setup-db
```

This will:
- Create all necessary tables (users, restaurants, menu_items, orders, etc.)
- Insert sample data (restaurants, menu items, categories)
- Set up indexes for better performance

## Step 5: Start Development Server

```bash
npm run dev
```

## Database Schema

### Tables Created:

1. **users** - User accounts and profiles
2. **restaurants** - Restaurant information
3. **menu_items** - Individual menu items for each restaurant
4. **restaurant_extras** - Additional items (extra chapati, etc.)
5. **orders** - User orders
6. **user_favorites** - User's favorite restaurants
7. **categories** - Food categories (Veg Thali, Non-Veg Thali, etc.)

### Sample Data Included:

- 3 restaurants (Pune Thali House, Mumbai Spice Kitchen, Kolhapur Royal Kitchen)
- Multiple menu items for each restaurant
- Restaurant extras
- Food categories

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants?category=Veg Thali` - Filter by category
- `GET /api/restaurants?search=query` - Search restaurants
- `GET /api/restaurants/[id]` - Get specific restaurant
- `GET /api/restaurants/[id]/menu` - Get restaurant menu

### Menu
- `GET /api/menu` - Get all menu items

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

### Categories
- `GET /api/categories` - Get all categories

## Troubleshooting

### Connection Issues
- Verify your `DATABASE_URL` is correct
- Check if your NeonDB project is active
- Ensure SSL is enabled in the connection string

### Permission Issues
- Make sure your database user has CREATE, INSERT, UPDATE, DELETE permissions
- Check if the database exists and is accessible

### Data Issues
- Run `npm run setup-db` again to reset the database
- Check the console for specific error messages

## Production Deployment

For production deployment:

1. Update `DATABASE_URL` with your production database
2. Set secure `JWT_SECRET` and `NEXTAUTH_SECRET`
3. Update `NEXTAUTH_URL` to your production domain
4. Run `npm run build` to build the application
5. Deploy to your hosting platform

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure your NeonDB database is accessible
4. Check the database connection in Neon Console


