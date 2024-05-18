import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IParams, Item } from '../../interfaces/items.interface';

export default async function (fastify: FastifyInstance) {
  /**
   * GET all items
   */
  fastify.get(
    '/',
    async function (request: FastifyRequest, reply: FastifyReply) {
      const client = await fastify.pg.connect();

      try {
        const { rows } = await client.query(`SELECT * from items`);
        // ! Note: avoid doing expensive computation here, this will block releasing the client
        return rows;
      } catch (error) {
        console.error(error);
      } finally {
        // ! Release the client immediately after query resolves, or upon error
        client.release();
      }
    }
  );
}
