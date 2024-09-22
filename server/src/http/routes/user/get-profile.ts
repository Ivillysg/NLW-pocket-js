import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getUserProfile } from '../../../use-cases/get-user-profile';
import { auth } from '@/middleware/auth';

export const getUserProfileRoute: FastifyPluginAsyncZod = async app => {
  app.register(auth).get('/me', async request => {
    const userId = await request.getCurrentUserId();

    const { profile } = await getUserProfile({ userId });

    return { profile };
  });
};
