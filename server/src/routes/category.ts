import { Router } from "express"
import CategoryController from "../controller/CategoryController"

const router = Router()

router.get("/", (req, res) => new CategoryController().getAll(req, res))
router.get("/:id/", (req, res) => new CategoryController().getOne(req, res))
router.post("/", (req, res) => new CategoryController().add(req, res))
router.delete("/:id/", (req, res) => new CategoryController().delete(req, res))
router.put("/:id/", (req, res) => new CategoryController().update(req, res))

export default router
