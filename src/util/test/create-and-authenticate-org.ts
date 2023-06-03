import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const password_hash = await hash('123456', 6)
  await prisma.orgs.create({
    data: {
      name: 'jhon doe',
      email: 'jhon@email.com',
      password_hash,
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    },
  })

  const authReponse = await request(app.server).post('/sessions').send({
    email: 'jhon@email.com',
    password: '123456',
  })

  const { token } = authReponse.body

  return { token }
}
