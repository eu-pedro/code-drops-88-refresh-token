import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RefreshTokenUseCase } from "../../use-cases/refresh-token-user/RefreshTokenUseCase";

export async function refreshToken(request: FastifyRequest, reply: FastifyReply){
  const createBodyRequest = z.object({
    refresh_token: z.string(),
  })

  const { refresh_token } = createBodyRequest.parse(request.body)

  const refreshTokenUseCase = new RefreshTokenUseCase()

  const token = await refreshTokenUseCase.execute(refresh_token)

  return reply.send(token)
}