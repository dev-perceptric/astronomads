import mysql, { type Pool, type PoolConnection } from 'mysql2/promise';

/**
 * MySQL on Hostinger (any MySQL 8 or MariaDB 10 works). Configured by environment variables:
 * DATABASE_URL (mysql://user:pass@127.0.0.1:3306/name) or DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME.
 * Use 127.0.0.1, not localhost: Node resolves localhost to IPv6, which Hostinger's MySQL users are not granted.
 */
export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME));
}

const globalForDb = globalThis as unknown as { astroPool?: Pool; astroSchema?: Promise<void> };

function pool(): Pool {
  if (globalForDb.astroPool) return globalForDb.astroPool;
  const common = { connectionLimit: 5, waitForConnections: true, charset: 'utf8mb4', dateStrings: true, timezone: 'Z' } as const;
  globalForDb.astroPool = process.env.DATABASE_URL
    ? mysql.createPool({ uri: process.env.DATABASE_URL, ...common })
    : mysql.createPool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ...common,
      });
  return globalForDb.astroPool;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(254) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL,
    google_sub VARCHAR(64) NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token_hash CHAR(64) PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS password_resets (
    token_hash CHAR(64) PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) NOT NULL DEFAULT 0,
    INDEX (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS profiles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    name VARCHAR(80) NOT NULL,
    birth_date CHAR(10) NOT NULL,
    birth_time CHAR(5) NULL,
    city_id INT UNSIGNED NOT NULL,
    city_name VARCHAR(160) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (user_id, name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

/** Changes to tables made before these columns existed. Each one is safe to run again. */
const MIGRATIONS: { sql: string; ignore?: string }[] = [
  // Sign in with Google: accounts may have no password.
  { sql: 'ALTER TABLE users MODIFY password_hash VARCHAR(255) NULL' },
  { sql: 'ALTER TABLE users ADD COLUMN google_sub VARCHAR(64) NULL UNIQUE', ignore: 'ER_DUP_FIELDNAME' },
];

/** Creates the tables on first use, once per server process. */
async function ensureSchema(): Promise<void> {
  globalForDb.astroSchema ??= (async () => {
    for (const sql of SCHEMA) await pool().query(sql);
    for (const m of MIGRATIONS) {
      try {
        await pool().query(m.sql);
      } catch (e) {
        if ((e as { code?: string }).code !== m.ignore) throw e;
      }
    }
  })().catch((e) => {
    globalForDb.astroSchema = undefined;
    throw e;
  });
  return globalForDb.astroSchema;
}

export async function query<T = unknown>(sql: string, params: unknown[] = []): Promise<T> {
  await ensureSchema();
  const [rows] = await pool().query(sql, params);
  return rows as T;
}

/** Runs work in one transaction on one connection. */
export async function transaction<T>(work: (conn: PoolConnection) => Promise<T>): Promise<T> {
  await ensureSchema();
  const conn = await pool().getConnection();
  try {
    await conn.beginTransaction();
    const out = await work(conn);
    await conn.commit();
    return out;
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

/** For tests: drop the pool so the next call reconnects. */
export async function closeDb(): Promise<void> {
  await globalForDb.astroPool?.end();
  globalForDb.astroPool = undefined;
  globalForDb.astroSchema = undefined;
}
