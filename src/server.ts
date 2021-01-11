import Fastify from 'fastify';
import { Http2ServerResponse } from 'http2';

// Instantiate the framework
const server = Fastify({ logger: true });

// Declare a route
server.get('/', async (request, reply) => {
  return { hey: 'yo' };
});

// SSE Route
server.get('/sse', async (request, reply) => {
  try {
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    reply.raw.write(`data: Connection established!\n\n`);

    setTimeout(() => {
      reply.raw.write(`data: After sending!\n\n`);
    }, 1000);

    setTimeout(() => {
      reply.raw.write(`data: All finished!!\n\n`);
      reply.raw.end();
    }, 2000);
  } catch (err) {
    console.log(err);
  }
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
