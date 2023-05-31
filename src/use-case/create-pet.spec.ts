import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let repo: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(repo)
  })

  it('should to be able create pet', async () => {
    const { pet } = await sut.execute({
      orgs_id: 'id_orgs',
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

    expect(pet.id).toEqual(expect.any(String))
  })
})
