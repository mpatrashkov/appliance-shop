import { Router, Request, Response } from "express"
import auth from "./auth"
import brand from "./brand"
import model from "./model"
import category from "./category"
import product from "./product"
import dynamicOption from "./dynamicOption"

const routes = Router()

routes.use("/auth", auth)
routes.use("/brands", brand)
routes.use("/models", model)
routes.use("/categories", category)
routes.use("/products", product)
routes.use("/dynamicOptions", dynamicOption)

export default routes
