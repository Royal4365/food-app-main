import { pool } from './db';

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  image_url: string;
  logo_url: string;
  rating: number;
  discount?: string;
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

export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  restaurant_id: string;
  menu_item_id: string;
  quantity: number;
  weeks: number;
  special_instructions?: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Restaurant functions
export async function getAllRestaurants(): Promise<Restaurant[]> {
  const result = await pool.query(
    'SELECT * FROM restaurants WHERE is_active = true ORDER BY rating DESC'
  );
  return result.rows;
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  const result = await pool.query(
    'SELECT * FROM restaurants WHERE id = $1 AND is_active = true',
    [id]
  );
  return result.rows[0] || null;
}

export async function getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
  const result = await pool.query(
    'SELECT * FROM restaurants WHERE category = $1 AND is_active = true ORDER BY rating DESC',
    [category]
  );
  return result.rows;
}

export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  const result = await pool.query(
    `SELECT * FROM restaurants 
     WHERE is_active = true 
     AND (name ILIKE $1 OR address ILIKE $1)
     ORDER BY rating DESC`,
    [`%${query}%`]
  );
  return result.rows;
}

// Menu functions
export async function getMenuByRestaurantId(restaurantId: string): Promise<MenuItem[]> {
  const result = await pool.query(
    'SELECT * FROM menu_items WHERE restaurant_id = $1 AND is_available = true ORDER BY name',
    [restaurantId]
  );
  return result.rows;
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const result = await pool.query(
    'SELECT * FROM menu_items WHERE id = $1 AND is_available = true',
    [id]
  );
  return result.rows[0] || null;
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  const result = await pool.query(
    'SELECT * FROM menu_items WHERE is_available = true ORDER BY rating DESC'
  );
  return result.rows;
}

// Restaurant extras functions
export async function getRestaurantExtras(restaurantId: string): Promise<RestaurantExtra[]> {
  const result = await pool.query(
    'SELECT * FROM restaurant_extras WHERE restaurant_id = $1 AND is_available = true ORDER BY name',
    [restaurantId]
  );
  return result.rows;
}

// Category functions
export async function getAllCategories(): Promise<Category[]> {
  const result = await pool.query(
    'SELECT * FROM categories WHERE is_active = true ORDER BY name'
  );
  return result.rows;
}

// Order functions
export async function createOrder(
  userId: string,
  restaurantId: string,
  menuItemId: string,
  quantity: number,
  weeks: number,
  specialInstructions: string,
  totalAmount: number
): Promise<Order | null> {
  try {
    const result = await pool.query(
      `INSERT INTO orders (user_id, restaurant_id, menu_item_id, quantity, weeks, special_instructions, total_amount)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, restaurantId, menuItemId, quantity, weeks, specialInstructions, totalAmount]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const result = await pool.query(
    `SELECT o.*, r.name as restaurant_name, m.name as menu_item_name, m.price
     FROM orders o
     JOIN restaurants r ON o.restaurant_id = r.id
     JOIN menu_items m ON o.menu_item_id = m.id
     WHERE o.user_id = $1
     ORDER BY o.created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const result = await pool.query(
    `SELECT o.*, r.name as restaurant_name, m.name as menu_item_name, m.price
     FROM orders o
     JOIN restaurants r ON o.restaurant_id = r.id
     JOIN menu_items m ON o.menu_item_id = m.id
     WHERE o.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

// User favorites functions
export async function addToFavorites(userId: string, restaurantId: string): Promise<boolean> {
  try {
    await pool.query(
      'INSERT INTO user_favorites (user_id, restaurant_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, restaurantId]
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function removeFromFavorites(userId: string, restaurantId: string): Promise<boolean> {
  try {
    await pool.query(
      'DELETE FROM user_favorites WHERE user_id = $1 AND restaurant_id = $2',
      [userId, restaurantId]
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function getUserFavorites(userId: string): Promise<Restaurant[]> {
  const result = await pool.query(
    `SELECT r.* FROM restaurants r
     JOIN user_favorites uf ON r.id = uf.restaurant_id
     WHERE uf.user_id = $1 AND r.is_active = true
     ORDER BY uf.created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function isFavorite(userId: string, restaurantId: string): Promise<boolean> {
  const result = await pool.query(
    'SELECT 1 FROM user_favorites WHERE user_id = $1 AND restaurant_id = $2',
    [userId, restaurantId]
  );
  return result.rows.length > 0;
}


