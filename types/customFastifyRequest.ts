import { FastifyRequest } from 'fastify';
import { User } from './user';

interface CustomFastifyRequest extends FastifyRequest {
  user?: User;
}

export { CustomFastifyRequest };
