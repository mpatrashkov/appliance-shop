import { Router, Request, Response } from "express"
import auth from "./auth"
import brand from "./brand"
import model from "./model"
import category from "./category"

const routes = Router()

routes.use("/auth", auth)
routes.use("/brands", brand)
routes.use("/models", model)
routes.use("/categories", category)

export default routes
