import fastify from 'fastify';
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
import { authenticateWithGithub } from './routes/auth/authenticate-with-github';
import fastifyJwt from '@fastify/jwt';

import { env } from '../env';
import { getUserProfileRoute } from './routes/user/get-profile';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifyJwt, {
  secret:env.JWT_SECRET,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getWeekPendingGoalsRoute);
app.register(getWeekSummaryRoute);
app.register(undoGoalCompletionRoute);
app.register(removeGoalRoute);
app.register(authenticateWithGithub);
app.register(getUserProfileRoute)

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP server running on 3333'));
