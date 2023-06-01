import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  filter: (data: Partial<Prisma.PetCreateManyOrgsInput>) => Promise<Pet[]>
  findByCity: (city: string) => Promise<Pet[]>
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
}
