import { Router } from "express"
import DynamicOptionsController from "../controller/DynamicOptionsController"
const router = Router()

router.get("/", (req, res) => new DynamicOptionsController().getAll(req, res))
router.post("/", (req, res) => new DynamicOptionsController().add(req, res))
router.delete("/:id/", (req, res) =>
    new DynamicOptionsController().delete(req, res)
)
router.put("/:id/", (req, res) =>
    new DynamicOptionsController().update(req, res)
)

export default router
