import { pool } from './db';

// Types
export interface Restaurant {
  id: string;
  name: string;
  category: string;
  image_url: string;
  logo_url: string;
  rating: number;
  discount: string;
  address: string;
  phone: string;
  hours: string;
  delivery_radius: string;
  delivery_time: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  price: number;
  rating: number;
  content: string;
  has_dessert: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface RestaurantExtra {
  id: string;
  restaurant_id: string;
  name: string;
  price: number;
  is_available: boolean;
  created_at: string;
}

// API Functions
export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM restaurants WHERE is_active = true ORDER BY rating DESC, name ASC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Failed to fetch restaurants');
  }
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  try {
    const result = await pool.query(
      'SELECT * FROM restaurants WHERE id = $1 AND is_active = true',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw new Error('Failed to fetch restaurant');
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE is_active = true ORDER BY name ASC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM menu_items WHERE restaurant_id = $1 AND is_available = true ORDER BY name ASC',
      [restaurantId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw new Error('Failed to fetch menu items');
  }
}

export async function getRestaurantExtras(restaurantId: string): Promise<RestaurantExtra[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM restaurant_extras WHERE restaurant_id = $1 AND is_available = true ORDER BY name ASC',
      [restaurantId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching restaurant extras:', error);
    throw new Error('Failed to fetch restaurant extras');
  }
}

export async function getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM restaurants WHERE category = $1 AND is_active = true ORDER BY rating DESC, name ASC',
      [category]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching restaurants by category:', error);
    throw new Error('Failed to fetch restaurants by category');
  }
}

// Transform function for frontend compatibility
export function transformRestaurantForFrontend(restaurant: Restaurant) {
  return {
    id: restaurant.id,
    name: restaurant.name,
    category: restaurant.category,
    image: restaurant.image_url,
    logo: restaurant.logo_url,
    rating: restaurant.rating,
    discount: restaurant.discount,
    address: restaurant.address,
    phone: restaurant.phone,
    hours: restaurant.hours,
    delivery_radius: restaurant.delivery_radius,
    delivery_time: restaurant.delivery_time,
    features: restaurant.features,
    is_active: restaurant.is_active,
    created_at: restaurant.created_at,
    updated_at: restaurant.updated_at
  };
}

// Search functions
export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  try {
    const result = await pool.query(
      `SELECT * FROM restaurants 
       WHERE is_active = true 
       AND (name ILIKE $1 OR category ILIKE $1 OR address ILIKE $1)
       ORDER BY rating DESC, name ASC`,
      [`%${query}%`]
    );
    return result.rows;
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw new Error('Failed to search restaurants');
  }
}

// Additional functions for other pages
export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const result = await pool.query(
      'SELECT * FROM menu_items WHERE is_available = true ORDER BY restaurant_id, name ASC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching all menu items:', error);
    throw new Error('Failed to fetch menu items');
  }
}

// Alias for getRestaurantById to match the import
export const getRestaurant = getRestaurantById;

// Alias for getMenuItems to match the import
export const getRestaurantMenu = getMenuItems;

// Transform function for menu items
export function transformMenuItemForFrontend(menuItem: MenuItem) {
  return {
    id: menuItem.id,
    restaurant_id: menuItem.restaurant_id,
    name: menuItem.name,
    price: menuItem.price,
    rating: menuItem.rating,
    content: menuItem.content,
    has_dessert: menuItem.has_dessert,
    is_available: menuItem.is_available,
    created_at: menuItem.created_at,
    updated_at: menuItem.updated_at
  };
}

// Statistics functions
export async function getRestaurantStats() {
  try {
    const [restaurantCount, categoryCount, avgRating] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM restaurants WHERE is_active = true'),
      pool.query('SELECT COUNT(*) as count FROM categories WHERE is_active = true'),
      pool.query('SELECT AVG(rating) as avg_rating FROM restaurants WHERE is_active = true')
    ]);

    return {
      totalRestaurants: parseInt(restaurantCount.rows[0].count),
      totalCategories: parseInt(categoryCount.rows[0].count),
      averageRating: parseFloat(avgRating.rows[0].avg_rating) || 0
    };
  } catch (error) {
    console.error('Error fetching restaurant stats:', error);
    throw new Error('Failed to fetch restaurant statistics');
  }
}
