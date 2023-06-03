import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Francinilton Soares',
      email: 'fran@gmail.com',
      password: '123456',
      address: 'Ourilãndia do Norte',
      cep: '0000.0000',
      whatsap_number: '94 99145-9865',
    })

    const reponse = await request(app.server).post('/sessions').send({
      email: 'fran@gmail.com',
      password: '123456',
    })

    expect(reponse.statusCode).toEqual(200)
    expect(reponse.body).toEqual({ token: expect.any(String) })
  })
})
