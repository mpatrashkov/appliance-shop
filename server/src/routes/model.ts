import { Router } from "express"
import AuthController from "../controller/AuthController"
import { checkJwt } from "../middlewares/checkJwt"
import ModelController from "../controller/ModelController"

const router = Router()

router.get("/all", (req, res) => new ModelController().getAll(req, res))
router.post("/add", (req, res) => new ModelController().add(req, res))

export default router
