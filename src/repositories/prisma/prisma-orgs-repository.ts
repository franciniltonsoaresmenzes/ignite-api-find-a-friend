import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.orgs.findFirst({ where: { email } })

    return org
  }

  async create(data: Prisma.OrgsCreateInput) {
    const org = await prisma.orgs.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        address: data.address,
        cep: data.cep,
        whatsap_number: data.whatsap_number,
      },
    })

    return org
  }
}
