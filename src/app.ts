import fastify from 'fastify'

export const app = fastify()

app.get('/orgs', async (_, reply) => {
  return reply.code(200).send('Hello Word')
})
