import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/util/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able to get pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bilu',
        description:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        city: 'Seu Cãopanheiro',
        age: 'filhote',
        size: 'pequenino',
        energy: 4,
        levelDependency: 'Baixo (precisa de companhia sempre)',
        habitatProperty: 'Ambiente amplo',
        description_adoptions: [
          {
            description:
              'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur.',
          },
          {
            description:
              'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur.',
          },
        ],
      })

    const pet = await prisma.pet.findFirst()

    const response = await request(app.server)
      .get(`/pet/${pet!.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(expect.objectContaining({ name: 'Bilu' }))
  })
})
