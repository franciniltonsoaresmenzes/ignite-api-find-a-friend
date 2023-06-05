import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'

let repo: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(repo)
  })

  it('should to be able search pets', async () => {
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
      orgs_id: 'id_orgs',
      name: 'Perola',
      description:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
      city: 'Ourilândia do Norte',
      age: 'filhote',
      size: 'alto',
      energy: 5,
      levelDependency: 'Baixo (precisa de companhia sempre)',
      habitatProperty: 'Ambiente amplo',
    })

    const { pets } = await sut.execute({ energy: 4, size: 'pequenino' })

    expect(pets).toHaveLength(2)
  })
})
