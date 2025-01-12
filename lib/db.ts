import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DB_URL
});

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    return result.rows[0];
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      throw new Error('Email already exists');
    }
    throw error;
  }
}

export async function verifyUser(email: string, password: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  
  const user = result.rows[0];
  if (!user) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  return { id: user.id, email: user.email };
}

// Initialize the database with the users table if it doesn't exist
export async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
} 