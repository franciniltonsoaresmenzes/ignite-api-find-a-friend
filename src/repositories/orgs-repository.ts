import { Prisma, Orgs } from '@prisma/client'

export interface OrgsRepository {
  findByEmail: (email: string) => Promise<Orgs | null>
  create: (data: Prisma.OrgsCreateInput) => Promise<Orgs>
}
