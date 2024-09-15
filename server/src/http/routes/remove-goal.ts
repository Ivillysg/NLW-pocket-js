import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { removeGoal } from '../../use-cases/remove-goal';

export const removeGoalRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/remove-goal',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalId } = request.body;

      const { result } = await removeGoal({
        goalId,
      });

      reply.status(200).send(result);
    }
  );
};
