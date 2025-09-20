import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const db = new Database('blog.db');
const sql = String.raw;

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const schemaPath = path.join(process.cwd(), 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');
console.log(schemaPath);
db.exec(schema);

export default db;
