import { Router } from "express"
import BrandController from "../controller/BrandController"

const router = Router()

router.get("/", (req, res) => new BrandController().getAll(req, res))
router.get("/:id/", (req, res) => new BrandController().getOne(req, res))
router.post("/", (req, res) => new BrandController().add(req, res))
router.delete("/:id/", (req, res) => new BrandController().delete(req, res))
router.put("/:id/", (req, res) => new BrandController().update(req, res))

export default router
