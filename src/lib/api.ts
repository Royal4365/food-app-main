import { pool } from './db';

// Order types
export interface Order {
  id: string;
  user_id: string;
  restaurant_id: string;
  menu_item_id: string;
  quantity: number;
  weeks: number;
  special_instructions: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderWithDetails extends Order {
  restaurant_name: string;
  menu_item_name: string;
  menu_item_price: number;
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
      `INSERT INTO orders (user_id, restaurant_id, menu_item_id, quantity, weeks, special_instructions, total_amount, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
       RETURNING *`,
      [userId, restaurantId, menuItemId, quantity, weeks, specialInstructions, totalAmount]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

export async function getUserOrders(userId: string): Promise<OrderWithDetails[]> {
  try {
    const result = await pool.query(
      `SELECT 
         o.*,
         r.name as restaurant_name,
         m.name as menu_item_name,
         m.price as menu_item_price
       FROM orders o
       JOIN restaurants r ON o.restaurant_id = r.id
       JOIN menu_items m ON o.menu_item_id = m.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch user orders');
  }
}

export async function getOrderById(orderId: string): Promise<OrderWithDetails | null> {
  try {
    const result = await pool.query(
      `SELECT 
         o.*,
         r.name as restaurant_name,
         m.name as menu_item_name,
         m.price as menu_item_price
       FROM orders o
       JOIN restaurants r ON o.restaurant_id = r.id
       JOIN menu_items m ON o.menu_item_id = m.id
       WHERE o.id = $1`,
      [orderId]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
}

export async function updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, orderId]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
}

export async function getRestaurantOrders(restaurantId: string): Promise<OrderWithDetails[]> {
  try {
    const result = await pool.query(
      `SELECT 
         o.*,
         r.name as restaurant_name,
         m.name as menu_item_name,
         m.price as menu_item_price
       FROM orders o
       JOIN restaurants r ON o.restaurant_id = r.id
       JOIN menu_items m ON o.menu_item_id = m.id
       WHERE o.restaurant_id = $1
       ORDER BY o.created_at DESC`,
      [restaurantId]
    );

    return result.rows;
  } catch (error) {
    console.error('Error fetching restaurant orders:', error);
    throw new Error('Failed to fetch restaurant orders');
  }
}

// User favorites functions
export async function addToFavorites(userId: string, restaurantId: string): Promise<boolean> {
  try {
    await pool.query(
      'INSERT INTO user_favorites (user_id, restaurant_id) VALUES ($1, $2) ON CONFLICT (user_id, restaurant_id) DO NOTHING',
      [userId, restaurantId]
    );
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
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
    console.error('Error removing from favorites:', error);
    return false;
  }
}

export async function getUserFavorites(userId: string): Promise<string[]> {
  try {
    const result = await pool.query(
      'SELECT restaurant_id FROM user_favorites WHERE user_id = $1',
      [userId]
    );
    return result.rows.map(row => row.restaurant_id);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw new Error('Failed to fetch user favorites');
  }
}

export async function isRestaurantFavorite(userId: string, restaurantId: string): Promise<boolean> {
  try {
    const result = await pool.query(
      'SELECT 1 FROM user_favorites WHERE user_id = $1 AND restaurant_id = $2',
      [userId, restaurantId]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}

