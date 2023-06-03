import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should to be able to refresh token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Francinilton Soares',
      email: 'fran@gmail.com',
      password: '123456',
      address: 'Ourilãndia do Norte',
      cep: '0000.0000',
      whatsap_number: '94 99145-9865',
    })

    const authReponse = await request(app.server).post('/sessions').send({
      email: 'fran@gmail.com',
      password: '123456',
    })

    const cookie = authReponse.get('Set-Cookie')

    const response = await request(app.server)
      .get('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
