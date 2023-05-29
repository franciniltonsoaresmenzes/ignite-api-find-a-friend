import { Prisma, Orgs } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Orgs[] = []

  async create(data: Prisma.OrgsCreateInput) {
    const org: Orgs = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      cep: data.cep,
      whatsap_number: data.whatsap_number,
      create_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
