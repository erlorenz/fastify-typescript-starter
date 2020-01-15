import fastify from 'fastify';

const server = fastify({ logger: true });

server.listen(3000, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Server is up and running on port 3000....');
  }
});
