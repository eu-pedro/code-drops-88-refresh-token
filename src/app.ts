import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

export const app = fastify()

// app.addHook('preHandler', async () => {
//   ensureAuthenticated
// })

app.register(appRoutes)