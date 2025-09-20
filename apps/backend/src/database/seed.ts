import db from './db';

const categoriesStmt = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
const postStmt = db.prepare('INSERT INTO posts (title, content, category_id) VALUES (?, ?, ?)');

categoriesStmt.run('Tech', 'tech');
categoriesStmt.run('Life', 'life');

postStmt.run('Hello World', 'This is my first post!', 1);

console.log('✅ Database seeded!');
