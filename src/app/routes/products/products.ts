import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IParams, Product } from '../../interfaces/products.interface';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/',
    async function (request: FastifyRequest, reply: FastifyReply) {
      return { message: 'Hello World!' };
    }
  );
}
