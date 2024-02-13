import { FastifyReply, FastifyRequest } from 'fastify';

const errorHandler = (
  err: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  reply.status(400).send({
    status: 'error',
    error: err,
    message: err.message,
  });
};

export { errorHandler };
