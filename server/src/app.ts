import express from "express"
import cors from "cors"
import * as http from "http"
import router from "./routes/indexRouter"
import { Express } from "express-serve-static-core"
import console from "console"

const app = express()

function setupExpress(app: Express) {
  app.use(express.json())
  app.use(cors({ origin: "*" }))
  router.forEach(route => app.use("/api", route))
}

function start(
  app:
    | http.RequestListener<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
      >
    | undefined,
  port: string | number
) {
  const server = http.createServer(app)

  server.listen(port, () => {
    console.log(`🚀 Server started successfully on PORT ${port}`)
  })
  return server
}

async function init() {
  const port = process.env.PORT || 3000

  setupExpress(app)
  const server = start(app, port)

  return server
}

init()

export default app
