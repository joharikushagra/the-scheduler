import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cachedConn connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedConn = global.mongoose

if (!cachedConn) {
  cachedConn = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cachedConn.conn) {
    return cachedConn.conn
  }

  if (!cachedConn.promise) {
    const opts = {
      bufferCommands: false,
    }

    cachedConn.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cachedConn.conn = await cachedConn.promise
  return cachedConn.conn
}

export default dbConnect
