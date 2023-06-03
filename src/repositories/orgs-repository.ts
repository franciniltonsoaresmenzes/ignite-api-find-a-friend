import { Prisma, Orgs } from '@prisma/client'

export interface OrgsRepository {
  findById: (orgId: string) => Promise<Orgs | null>
  findByEmail: (email: string) => Promise<Orgs | null>
  create: (data: Prisma.OrgsCreateInput) => Promise<Orgs>
}
