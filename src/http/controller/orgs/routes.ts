import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function orgRouter(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}
