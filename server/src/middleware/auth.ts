import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-errors';
import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async request => {
    request.getCurrentUserId = async () => {
      try {
        const { userId } = await request.jwtVerify<{ userId: string }>();
        return userId;
      } catch {
        throw new UnauthorizedError('Invalid auth token');
      }
    };
  });
});
