// lib/db.js
import mongoose from "mongoose";

if (mongoose.models) {
  mongoose.models = {};
}

global.mongoose = {
  conn: null,
  promise: null,
};

export async function connectToDatabase() {
  try {
    // Check if a connection is already established
    if (global.mongoose && global.mongoose.conn) {
      console.log("Connected from previous");
      return global.mongoose.conn;
    }

    // If not connected, create a new connection
    const conString = process.env.MONGO_URL; // MongoDB URI from .env.local

    // Check for the connection string
    if (!conString) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    // Use the connection promise to handle connection async behavior
    const promise = mongoose.connect(conString, {
      autoIndex: true, // Recommended to enable autoIndex in dev
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("Newly connected to the database");
    return global.mongoose.conn;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

// Disconnect the database manually if needed (useful in local dev or cleanup in test environments)
export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};

export default connectToDatabase;
