import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/util/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able to create pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
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
      })

    expect(response.statusCode).toEqual(201)
  })
})
