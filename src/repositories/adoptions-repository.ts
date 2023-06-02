import { Prisma, AdoptionRequirements } from '@prisma/client'

export interface AdoptionsRepository {
  create: (
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ) => Promise<AdoptionRequirements>
}
