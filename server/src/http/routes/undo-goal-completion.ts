import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { undoGoalCompletion } from '../../use-cases/undo-goal-completion';

export const undoGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/undo-goal-completion',
    {
      schema: {
        body: z.object({
          goalCompletionId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { goalCompletionId } = request.body;

      const result = await undoGoalCompletion({
        goalCompletionId,
      });

      reply.status(200).send(result);
    }
  );
};
