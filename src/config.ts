import * as dotenv from 'dotenv';

dotenv.config();
const env = process.env;

export const PostgresConfig = {
  User: env.POSTGRES_USER || 'postgres',
  Password: env.POSTGRES_PASSWORD || '1213',
  DB: env.POSTGRES_DB || 'web_server',
};

export const RedisConfig = {
  HOST: 'localhost',
  PORT: 6379,
};

export const SkinPortConfig = {
  Endpoint: env.SKINPORT_ENDPOINT || 'https://api.skinport.com/v1/items',
  AppId: env.SKINPORT_APPID || 730,
  Currency: env.SKINPORT_CURRENCY || 'EUR',
  Tradable: env.SKINPORT_TRADABLE ? 1 : 0,
  HashData: 'hash_data',
};
