import mongoose from "mongoose";

/**
 * Cached Mongoose connection for Next.js.
 *
 * In development the module is reloaded on every change, which would otherwise
 * open a new connection on each request. We cache the connection on the global
 * object to survive HMR and avoid exhausting the connection pool.
 *
 * If `MONGODB_URI` is not configured, `connectDB()` resolves to `null` so the
 * app keeps working in a zero-config "demo" mode (forms validate and respond
 * but data is not persisted).
 */

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
  global._mongoose ?? (global._mongoose = { conn: null, promise: null });

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB ?? "fundacion_nara",
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/** True when a real database is configured. */
export const isDbConfigured = Boolean(MONGODB_URI);
