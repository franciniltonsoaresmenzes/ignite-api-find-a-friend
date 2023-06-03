import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'
import { refresh } from './refresh'

export async function orgRouter(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.get('/token/refresh', refresh)

  app.patch('/me', { onRequest: [verifyJwt] }, profile)
}
