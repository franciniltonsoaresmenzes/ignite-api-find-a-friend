import { makeCreateAdoptionsRequerimentsUseCase } from '@/use-case/factory/make-create-adoptions-requeriments-use-case'
import { makeCreatePetUseCase } from '@/use-case/factory/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAdoptionsBodySchema = z.object({
    description: z.string(),
  })
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.coerce.number(),
    levelDependency: z.string(),
    habitatProperty: z.string(),
    description_adoptions: z.array(createAdoptionsBodySchema),
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
    description_adoptions,
  } = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
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

  const createAdoptionsRequerimentsUseCase =
    makeCreateAdoptionsRequerimentsUseCase()

  for await (const adoption of description_adoptions) {
    await createAdoptionsRequerimentsUseCase.execute({
      pet_id: pet.id,
      description: adoption.description,
    })
  }

  return reply.status(201).send()
}
