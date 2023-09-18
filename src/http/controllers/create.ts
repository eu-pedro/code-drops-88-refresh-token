import { z } from "zod";
import { CreateUserUseCase } from "../../use-cases/create-user/CreateUserUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExists } from "../../use-cases/errors/user-already-exists-error";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error";

export async function create (request: FastifyRequest, reply: FastifyReply) {
  const createRequestSchema = z.object({
    username: z.string(),
    name: z.string(),
    password: z.string(),
  })

  const { name, password, username } = createRequestSchema.parse(request.body)
  try {
    const createUserUseCase = new CreateUserUseCase()
    await createUserUseCase.execute({
      name, 
      password,
      username
  })
  } catch (error) {
    if(error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message})
    }
  }

  return reply.status(201).send()
}