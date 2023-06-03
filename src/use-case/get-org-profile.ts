import { OrgsRepository } from '@/repositories/orgs-repository'
import { Orgs } from '@prisma/client'
import { ResourceNotFound } from './error/resource-not-found'

interface GetOrgProfileUseCaseRequest {
  orgId: string
}

interface GetOrgProfileUseCaseResponse {
  org: Orgs
}

export class GetOrgProfileUseCase {
  constructor(private orgRepo: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgRepo.findById(orgId)

    if (!org) throw new ResourceNotFound()

    return { org }
  }
}
