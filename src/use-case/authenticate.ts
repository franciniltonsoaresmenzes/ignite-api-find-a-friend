import { OrgsRepository } from '@/repositories/orgs-repository'
import { Orgs } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsErrors } from './error/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Orgs
}

export class AuthenticateUseCase {
  constructor(private repo: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.repo.findByEmail(email)

    if (!org) throw new InvalidCredentialsErrors()

    const doesPasswordMatch = await compare(password, org.password_hash)

    if (!doesPasswordMatch) throw new InvalidCredentialsErrors()

    return { org }
  }
}
