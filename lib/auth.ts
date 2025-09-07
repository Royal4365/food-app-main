import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}

export async function createUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone?: string,
  address?: string
): Promise<AuthResult> {
  try {
    const hashedPassword = await hashPassword(password);
    
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, address)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, first_name, last_name, phone, address, avatar_url`,
      [email, hashedPassword, firstName, lastName, phone, address]
    );

    const user = result.rows[0];
    const token = generateToken(user.id);

    return {
      success: true,
      user,
      token
    };
  } catch (error: any) {
    if (error.code === '23505') { // Unique constraint violation
      return {
        success: false,
        message: 'Email already exists'
      };
    }
    return {
      success: false,
      message: 'Failed to create user'
    };
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
  try {
    const result = await pool.query(
      'SELECT id, email, password_hash, first_name, last_name, phone, address, avatar_url FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    const user = result.rows[0];
    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    const token = generateToken(user.id);

    // Remove password_hash from user object
    const { password_hash, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    return {
      success: false,
      message: 'Authentication failed'
    };
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, phone, address, avatar_url FROM users WHERE id = $1',
      [userId]
    );

    return result.rows[0] || null;
  } catch (error) {
    return null;
  }
}

export async function updateUser(
  userId: string,
  updates: Partial<Pick<User, 'first_name' | 'last_name' | 'phone' | 'address' | 'avatar_url'>>
): Promise<User | null> {
  try {
    const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = Object.values(updates);
    
    const result = await pool.query(
      `UPDATE users SET ${fields} WHERE id = $1 RETURNING id, email, first_name, last_name, phone, address, avatar_url`,
      [userId, ...values]
    );

    return result.rows[0] || null;
  } catch (error) {
    return null;
  }
}


