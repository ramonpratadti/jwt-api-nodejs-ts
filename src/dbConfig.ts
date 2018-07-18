import * as mongoose from 'mongoose';
import { config } from './config';
/**
 * Mongo connection config
 * see: http://mongoosejs.com/docs/connections.html
 */
const MONGO_URI = config.MONGO_URL_CONNECTION;

const optionsConnection = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections(default: 5)
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

class DB {
  constructor() { }
  connect() {
    try {
      mongoose.connect(MONGO_URI || process.env.MONGO_URI, optionsConnection, );
    } catch (error) {
      throw error;
    }
  }
}

export const DBInstance = new DB();