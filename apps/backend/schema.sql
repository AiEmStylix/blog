-- schema.sql
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
);

CREATE VIEW IF NOT EXISTS posts_with_categories AS
SELECT 
  posts.id,
  posts.title,
  posts.content,
  posts.created_at,
  categories.id AS category_id,
  categories.name AS category_name,
  categories.slug AS category_slug
FROM posts
JOIN categories ON posts.category_id = categories.id;