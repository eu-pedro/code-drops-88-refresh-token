import { FastifyInstance } from "fastify";
import { create } from "./controllers/create";
import { authenticate } from "./controllers/authenticate";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { refreshToken } from "./controllers/refresh-token";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/login', authenticate)
  app.post('/refresh-token', refreshToken)

  app.get('/courses', { preHandler: [ensureAuthenticated] } ,(request, reply) => {
    return reply.send([
      { id: 1, name: 'Node'},
      { id: 2, name: 'React'},
      { id: 3, name: 'PHP'},
      { id: 4, name: 'Java'},
      { id: 5, name: 'C#'},
    ])
  })
}