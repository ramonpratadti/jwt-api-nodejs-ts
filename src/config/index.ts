
import { IConfig } from '../types';

const config = {
  MONGO_URL_CONNECTION: 'mongodb://127.0.0.1:27017/epocket', // db string connection
  PORT: Number(process.env.PORT) || 5000, // server port
  JWT_PRIVATE_KEY: 'MY_PRIVATE_KEY', // secreet key to encrypt password
  SALT_ROUNDS: 10, //
};

export { config };