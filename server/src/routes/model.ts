import { Router } from "express"
import AuthController from "../controller/AuthController"
import { checkJwt } from "../middlewares/checkJwt"
import ModelController from "../controller/ModelController"

const router = Router()

router.get("/:id/", (req, res) => new ModelController().getAll(req, res))
router.post("/", (req, res) => new ModelController().add(req, res))
router.delete("/:id/", (req, res) => new ModelController().delete(req, res))
router.put("/:id/", (req, res) => new ModelController().update(req, res))

export default router
