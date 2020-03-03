import { Router } from "express"
import BrandController from "../controller/BrandController"

const router = Router()

router.get("/all", (req, res) => new BrandController().getAll(req, res))
router.post("/add", (req, res) => new BrandController().add(req, res))
router.post("/test", (req, res) => res.send(101))

export default router
