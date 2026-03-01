import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-case/factiories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserCase = makeAuthenticateUseCase()

    const { user } = await authenticateUserCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({
      token,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      // User already exists
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
