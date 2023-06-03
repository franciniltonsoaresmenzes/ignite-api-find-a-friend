import { makeGetOrgProfile } from '@/use-case/factory/make-get-org-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfile()

  const { org } = await getOrgProfile.execute({ orgId: request.user.sub })

  const { password_hash, ...orgWithoutPassword } = org

  reply.status(200).send({ org: { ...orgWithoutPassword } })
}
