import fastifyPostgres from '@fastify/postgres';
import 'dotenv/config';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import * as Config from '../../config';

/**
 * This plugins adds some utilities to handle @fastify/postgres
 *
 */
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyPostgres, {
    connectionString: `postgres://${Config.PostgresConfig.User}:${Config.PostgresConfig.Password}@localhost:5432/${Config.PostgresConfig.DB}`,
  });
});
