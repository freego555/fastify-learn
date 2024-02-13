import { fastify as Fastify, FastifyReply } from 'fastify';
import cors from '@fastify/cors';

import { checkAuth } from './lib/auth';
import { errorHandler } from './lib/errorHandler';

import { CustomFastifyRequest } from './types/customFastifyRequest';

const app = Fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

app.register(cors);

// Add property 'user' to request. Later initialize it using onRequest hook
app.decorateRequest('user');

app.addHook(
  'onRequest',
  async (request: CustomFastifyRequest, reply: FastifyReply) => {
    // Add property 'user' to request to identify authorized user on every route
    request.user = await checkAuth(request);
  },
);

app.post(
  '/api/v1/signin',
  async (request: CustomFastifyRequest, reply: FastifyReply) => {
    reply.status(200);

    return {
      status: 'success',
      data: { user: request.user },
    };
  },
);

app.get(
  '/api/v1/hello',
  async (request: CustomFastifyRequest, reply: FastifyReply) => {
    reply.status(200);

    return {
      status: 'success',
      data: { hello: 'world' },
    };
  },
);

export default app;
