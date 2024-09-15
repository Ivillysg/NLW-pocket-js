import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoalCompletion } from '../../use-cases/create-goal-completion';

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalId } = request.body;

      const { goalCompletion } = await createGoalCompletion({
        goalId,
      });

      reply.status(201).send(goalCompletion);
    }
  );
};
