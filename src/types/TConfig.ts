interface IConfig {
  JWT_PRIVATE_KEY: string,
  MONGO_URL_CONNECTION: string
  SALT_ROUNDS: number;
  PORT: number;
};
export { IConfig };