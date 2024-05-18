import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import SkinPortService from '../../external/gateways/skinport';
import { generateHash } from '../../plugins/hash';
import * as Config from '../../../config';
import { IParams } from 'src/app/interfaces/items.interface';

export default async function (fastify: FastifyInstance) {
  /**
   * GET all items
   */
  fastify.get(
    '/',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const key = generateHash(Config.SkinPortConfig.HashData);
        const cachedData = await request.server.redis.get(key);

        if (cachedData) {
          console.log('Returning cached data');
          return reply.send(JSON.parse(cachedData));
        }

        const items = await SkinPortService.getItems();
        await request.server.redis.setex(key, 60, JSON.stringify(items));

        return reply.send(items);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );

  fastify.post(
    '/',
    async function (
      request: FastifyRequest<{ Body: IParams }>,
      reply: FastifyReply
    ) {
      const client = await fastify.pg.connect();
      try {
        const { rows } = await client.query(
          `select * from users where id = $1`,
          [request.body.userId]
        );

        if (rows.length < 1) {
          reply.status(404).send({ message: 'User not found' });
        }

        const user = rows[0];

        if (user.balance < request.body.amount) {
          reply.status(400).send({ message: 'Balance is less than amount' });
        }

        const updatedUser = await client.query(
          `update users set balance = balance - $1 where id = $2 RETURNING *`,
          [request.body.amount, request.body.userId]
        );

        if (updatedUser.rows.length < 1) {
          reply.status(400).send({ message: 'Error in updating user balance' });
        }

        return reply.send({ success: true });
      } finally {
        client.release();
      }
    }
  );
}
