import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, expect, it } from 'vitest'
import { RegisterUsaCase } from './register'

describe('Register Use Case', () => {
  it('should to be able register', async () => {
    const repo = new InMemoryOrgsRepository()
    const sut = new RegisterUsaCase(repo)

    const { org } = await sut.execute({
      name: 'jhon doe',
      email: 'jhon@email.com',
      password: '123456',
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
