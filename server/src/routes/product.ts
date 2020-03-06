import { Router } from "express"
import ProductController from "../controller/ProductController"
import { checkJwt } from "../middlewares/checkJwt"

const router = Router()

router.get("/", (req, res) => new ProductController().getAll(req, res))
router.post("/", (req, res) => new ProductController().add(req, res))
router.delete("/:id/", (req, res) => new ProductController().delete(req, res))
router.put("/:id/", (req, res) => new ProductController().update(req, res))

export default router
