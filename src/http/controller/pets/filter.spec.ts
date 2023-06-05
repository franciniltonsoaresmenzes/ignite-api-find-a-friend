import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/util/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Filter e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should to be able to filter', async () => {
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Perola',
        description:
          'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
        city: 'Seu Cãopanheiro',
        age: 'filhote',
        size: 'alto',
        energy: 5,
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

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({ size: 'alto' })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: 'Perola' }),
    ])
  })
})
