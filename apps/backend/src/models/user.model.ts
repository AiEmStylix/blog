import bcrypt from 'bcrypt';
import db from '../database/db';

interface User {
  id: number;
  username: string;
  email?: string | null;
  password_hash: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function createUser(
  username: string,
  email: string | null,
  password: string,
): Promise<User> {
  const password_hash = await bcrypt.hash(password, 10);

  const stmt = db.prepare(
    'INSERT INTO users (username, email, password_hash, is_active) VALUES (?, ?, ?, 1)',
  );

  const result = stmt.run(username, email, password_hash);
  return getUserById(result.lastInsertRowid as number)!;
}

export function getUserById(id: number): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User;
}

export function getUserByUsername(username: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username) as User;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password_hash);
}
