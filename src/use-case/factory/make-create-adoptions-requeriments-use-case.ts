import { PrismaAdoptionsRequerimentsRepository } from '@/repositories/prisma/prisma-adoptions-requeriments-repository'
import { CreateAdoptionsRequerimentsUseCase } from '../create-adoptions-requeriments'

export function makeCreateAdoptionsRequerimentsUseCase() {
  const adoptionsRepo = new PrismaAdoptionsRequerimentsRepository()
  const createAdoptionsRequerimentsUseCase =
    new CreateAdoptionsRequerimentsUseCase(adoptionsRepo)

  return createAdoptionsRequerimentsUseCase
}
