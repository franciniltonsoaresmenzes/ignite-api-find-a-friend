import { makeGetPetUseCase } from '@/use-case/factory/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const petParamsSchema = z.object({
    pet_id: z.string(),
  })

  const { pet_id } = petParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({ idPet: pet_id })

  return reply.status(200).send({ pet })
}
