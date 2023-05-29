import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExists } from './error/org-already-exist'

interface RegisterUsaCaseRequest {
  name: string
  email: string
  password: string
  address: string
  cep: string
  whatsap_number: string
}

export class RegisterUsaCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    cep,
    whatsap_number,
  }: RegisterUsaCaseRequest) {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) throw new OrgAlreadyExists()

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      cep,
      whatsap_number,
    })

    return { org }
  }
}
