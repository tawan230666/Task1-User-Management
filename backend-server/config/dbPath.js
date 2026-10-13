const path = require('path');

// Same convention as config/database.js: SQLITE_DB_PATH may be absolute or
// relative to the repository root; it defaults to database/sqlite/wallboard.db.
const repoRoot = path.resolve(__dirname, '..', '..');
const configured = (process.env.SQLITE_DB_PATH || '').trim() || './database/sqlite/wallboard.db';
const dbPath = path.isAbsolute(configured) ? configured : path.resolve(repoRoot, configured);

module.exports = { dbPath };
