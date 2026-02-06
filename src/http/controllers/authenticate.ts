import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-case/factiories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials-error'

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

    await authenticateUserCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      // User already exists
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
  return reply.status(200).send()
}
