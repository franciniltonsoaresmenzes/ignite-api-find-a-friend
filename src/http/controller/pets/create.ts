import { makeCreatePetUseCase } from '@/use-case/factory/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.coerce.number(),
    levelDependency: z.string(),
    habitatProperty: z.string(),
  })

  const {
    name,
    description,
    city,
    age,
    size,
    energy,
    levelDependency,
    habitatProperty,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    city,
    age,
    size,
    energy,
    levelDependency,
    habitatProperty,
    orgs_id: request.user.sub,
  })

  return reply.status(201).send()
}
