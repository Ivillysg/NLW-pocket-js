import fastify from 'fastify';
import { createGoal } from '../use-cases/create-goal';
import z from 'zod';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createGoalRoute } from './routes/create-goal';
import { createCompletionRoute } from './routes/create-completion';
import { getWeekPendingGoalsRoute } from './routes/get-pending-goals';
import { getWeekSummaryRoute } from './routes/get-week-summary';
import fastifyCors from '@fastify/cors';
import { undoGoalCompletionRoute } from './routes/undo-goal-completion';
import { removeGoalRoute } from './routes/remove-goal';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getWeekPendingGoalsRoute);
app.register(getWeekSummaryRoute);
app.register(undoGoalCompletionRoute);
app.register(removeGoalRoute);

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP server running on 3333'));
