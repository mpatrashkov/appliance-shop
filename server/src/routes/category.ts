import { Router } from "express"
import CategoryController from "../controller/CategoryController"

const router = Router()

router.get("/all", (req, res) => new CategoryController().getAll(req, res))
router.post("/add", (req, res) => new CategoryController().add(req, res))

export default router
