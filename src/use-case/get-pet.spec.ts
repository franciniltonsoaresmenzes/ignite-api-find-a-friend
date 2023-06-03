import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet'

let repo: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryPetsRepository()
    sut = new GetPetUseCase(repo)
  })

  it('should to be able search pet', async () => {
    await repo.create({
      orgs_id: 'id_orgs',
      name: 'Bilu',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      city: 'Ourilândia do Norte',
      age: 'filhote',
      size: 'pequenino',
      energy: 4,
      levelDependency: 'Baixo (precisa de companhia sempre)',
      habitatProperty: 'Ambiente amplo',
    })

    await repo.create({
      orgs_id: 'id_orgs',
      name: 'Bilu',
      description:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      city: 'Ourilândia do Norte',
      age: 'filhote',
      size: 'pequenino',
      energy: 4,
      levelDependency: 'Baixo (precisa de companhia sempre)',
      habitatProperty: 'Ambiente amplo',
    })

    await repo.create({
      id: 'id_example',
      orgs_id: 'id_orgs',
      name: 'Perola',
      description:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
      city: 'Ourilândia do Norte',
      age: 'filhote',
      size: 'pequenino',
      energy: 5,
      levelDependency: 'Baixo (precisa de companhia sempre)',
      habitatProperty: 'Ambiente amplo',
    })

    const { pet } = await sut.execute({ idPet: 'id_example' })

    expect(pet.id).toEqual('id_example')
  })
})
