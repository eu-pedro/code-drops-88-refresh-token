import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { AuthenticateUserUseCase } from "../../use-cases/authenticate-user/AuthenticateUserUseCase";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const createRequestSchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { password, username } = createRequestSchema.parse(request.body)

  try {
    const authenticateUserUseCase = new AuthenticateUserUseCase()
    const token = await authenticateUserUseCase.execute({
      password,
      username
    })
    
    return reply.status(200).send({token})

  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message})
    }
  }

  return reply.status(201).send()
}