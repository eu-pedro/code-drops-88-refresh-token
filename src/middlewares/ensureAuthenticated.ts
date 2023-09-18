import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(request:FastifyRequest, reply: FastifyReply, next) {
  const authToken = request.headers.authorization
  if(!authToken) {
    return reply.status(401).send({
      message: 'token is missing',
    })
  }

  // Bearer asdjasidajsidasijd : Formato
  const [, token] = authToken.split(' ')
  
  try {
    verify(token, "ashduasudhasudhu")
    next()
  } catch (error) {
    return reply.status(401).send({
      message: 'token is invalid',
    })
  }
}