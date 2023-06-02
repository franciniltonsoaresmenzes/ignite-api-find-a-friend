import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AdoptionsRepository } from '../adoptions-repository'

export class PrismaAdoptionsRequerimentsRepository
  implements AdoptionsRepository
{
  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptions = await prisma.adoptionRequirements.create({
      data: {
        description: data.description,
        pet_id: data.pet_id,
      },
    })

    return adoptions
  }
}
