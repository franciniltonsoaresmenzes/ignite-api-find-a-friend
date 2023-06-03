import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileUseCase } from '../get-org-profile'

export function makeGetOrgProfile() {
  const orgRepo = new PrismaOrgsRepository()
  const getOrgProfile = new GetOrgProfileUseCase(orgRepo)

  return getOrgProfile
}
