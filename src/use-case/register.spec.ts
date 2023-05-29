import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUsaCase } from './register'
import { compare } from 'bcryptjs'
import { OrgAlreadyExists } from './error/org-already-exist'

let repo: InMemoryOrgsRepository
let sut: RegisterUsaCase

describe('Register Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryOrgsRepository()
    sut = new RegisterUsaCase(repo)
  })

  it('should to be able register', async () => {
    const { org } = await sut.execute({
      name: 'jhon doe',
      email: 'jhon@email.com',
      password: '123456',
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(org.id).toEqual(expect.any(String))
    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Francinilton',
      email: 'jhon@email.com',
      password: '123456',
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    })

    await expect(() =>
      sut.execute({
        name: 'jhon doe',
        email: 'jhon@email.com',
        password: '123456',
        address: 'rua exemplo',
        cep: '123456',
        whatsap_number: '949917856',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExists)
  })
})
