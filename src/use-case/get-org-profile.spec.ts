import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetOrgProfileUseCase } from './get-org-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from './error/resource-not-found'

let repo: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(repo)
  })

  it('should to be able org profile', async () => {
    const password_hash = await hash('123456', 6)

    const createNewOrg = await repo.create({
      name: 'jhon doe',
      email: 'jhon@email.com',
      password_hash,
      address: 'rua exemplo',
      cep: '123456',
      whatsap_number: '949917856',
    })

    const { org } = await sut.execute({ orgId: createNewOrg.id })

    expect(org.name).toEqual('jhon doe')
  })

  it('should to be able not org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({ orgId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
