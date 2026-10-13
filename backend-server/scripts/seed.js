// Creates the SQLite schema and sample data so the app runs on a fresh clone.
// Usage: npm run seed   (honours SQLITE_DB_PATH from .env)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');
const { dbPath } = require('../config/dbPath');

const SQL_DIR = path.join(__dirname, '../../database/scripts');
const FILES = ['00-create-core-tables.sql', '01-create-users-table.sql', '02-insert-sample-users.sql'];

fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new sqlite3.Database(dbPath);

function exec(sql) {
  return new Promise((resolve, reject) => db.exec(sql, (err) => (err ? reject(err) : resolve())));
}

(async () => {
  console.log(`[seed] Database: ${dbPath}`);
  for (const file of FILES) {
    await exec(fs.readFileSync(path.join(SQL_DIR, file), 'utf8'));
    console.log(`[seed] ✓ ${file}`);
  }
  db.get('SELECT COUNT(*) AS n FROM users', (err, row) => {
    console.log(err ? `[seed] ✗ ${err.message}` : `[seed] Done — ${row.n} users`);
    db.close();
  });
})().catch((err) => {
  console.error('[seed] Failed:', err.message);
  process.exit(1);
});
