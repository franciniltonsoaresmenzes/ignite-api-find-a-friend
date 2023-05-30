import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsErrors } from './error/invalid-credentials-error'

let repo: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(repo)
  })

  it('should to be able authenticate', async () => {
    await repo.create({
      name: 'jhon doe',
      email: 'jhon@email.com',
      password_hash: await hash('123456', 6),
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    })

    const { org } = await sut.execute({
      email: 'jhon@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhon@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await repo.create({
      name: 'jhon doe',
      email: 'jhon@email.com',
      password_hash: await hash('123456', 6),
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    })

    await expect(() =>
      sut.execute({
        email: 'jhon@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErrors)
  })
})
