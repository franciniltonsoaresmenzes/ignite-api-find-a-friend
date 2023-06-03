import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function orgRouter(app: FastifyInstance) {
  app.post('/orgs', register)
}
