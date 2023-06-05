import { makeFetchPetsUseCase } from '@/use-case/factory/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filter(request: FastifyRequest, reply: FastifyReply) {
  const filterParamsSchema = z.object({
    age: z.string().optional(),
    size: z.string().optional(),
    energy: z.coerce.number().optional(),
    levelDependency: z.string().optional(),
  })

  const query = filterParamsSchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute(query)

  return reply.status(200).send({ pets })
}
