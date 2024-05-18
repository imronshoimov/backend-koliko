import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Redis } from 'ioredis';
import * as Config from '../../config';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}

async function redisConnector(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const redis = new Redis({
    host: Config.RedisConfig.HOST,
    port: Config.RedisConfig.PORT,
  });

  fastify.decorate('redis', redis);
  fastify.addHook('onClose', async (instance, done) => {
    redis.disconnect();
    done();
  });
}

export default fastifyPlugin(redisConnector);
