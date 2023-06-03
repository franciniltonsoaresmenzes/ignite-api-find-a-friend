import { makeFetchPetByCityUseCase } from '@/use-case/factory/make-fetch-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetBodySchema = z.object({
    q: z.string(),
  })

  const { q } = searchPetBodySchema.parse(request.query)

  const makeFetchByPetsCity = makeFetchPetByCityUseCase()

  const { pets } = await makeFetchByPetsCity.execute({ city: q })

  return reply.status(200).send({ pets })
}
