import { OrgAlreadyExists } from '@/use-case/error/org-already-exist'
import { makeRegisterUseCase } from '@/use-case/factory/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const orgSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    address: z.string(),
    cep: z.string(),
    whatsap_number: z.string(),
  })

  const { name, email, password, address, cep, whatsap_number } =
    orgSchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      cep,
      whatsap_number,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExists)
      return reply.status(409).send({ message: err.message })

    throw err
  }

  return reply.status(201).send()
}
