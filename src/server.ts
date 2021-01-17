import EventEmitter from 'events';
import Fastify, { FastifyRequest } from 'fastify';
import emitter from './emitter';
import sse from './sse';
import { v4 as uuidv4 } from 'uuid';

// Instantiate the framework
const server = Fastify({ logger: true });

// Health Check
server.get('/', async (request, reply) => {
  return 'Server is running';
});

// Webhook route
server.get('/webhook/:user', async (request: any) => {
  const id = uuidv4();
  if (!request.params.user) throw new Error('No params');
  emitter.emit('newmessage', id, request.params.user);
  return `Webhook ${id} event emitted`;
});

// SSE Route
server.get('/sse/:user', (request: any, reply) => {
  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  reply.raw.write(
    sse('connected', 'Connection established', request.params.user)
  );

  emitter.on('newmessage', (id: string, user: string) => {
    if (user === request.params.user)
      reply.raw.write(sse('message', 'Webook event from ' + user, id));
  });
});

// Run the server!
const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
