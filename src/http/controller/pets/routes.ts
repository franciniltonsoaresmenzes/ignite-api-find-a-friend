import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { getPet } from './get-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', create)
  app.get('/pet/:pet_id', getPet)
  app.get('/pets/search', search)
}
