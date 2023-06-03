import { InvalidCredentialsErrors } from '@/use-case/error/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-case/factory/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { org } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign({}, { sign: { sub: org.id } })

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: org.id, expiresIn: '7d' } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsErrors) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
