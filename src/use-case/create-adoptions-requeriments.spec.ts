import { InMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAdoptionsRequerimentsUseCase } from './create-adoptions-requeriments'

let repo: InMemoryAdoptionsRepository
let sut: CreateAdoptionsRequerimentsUseCase

describe('Create Adoptions Requeriments Use Case', () => {
  beforeEach(() => {
    repo = new InMemoryAdoptionsRepository()
    sut = new CreateAdoptionsRequerimentsUseCase(repo)
  })

  it('should to be able create adoptions requeriments', async () => {
    const { adoptions } = await sut.execute({
      description:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
      pet_id: 'pet_id',
    })

    expect(adoptions.id).toEqual(expect.any(String))
  })
})
