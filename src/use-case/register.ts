import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

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
    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash: await hash(password, 6),
      address,
      cep,
      whatsap_number,
    })

    return { org }
  }
}
