import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(orgId: string) {
    const org = await prisma.orgs.findUnique({ where: { id: orgId } })
    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.orgs.findUnique({ where: { email } })

    return org
  }

  async create(data: Prisma.OrgsCreateInput) {
    const org = await prisma.orgs.create({ data })

    return org
  }
}
