import { Router } from "express"
import AuthController from "../controller/AuthController"
import { checkJwt } from "../middlewares/checkJwt"

const router = Router()
//Login route
router.post("/login", AuthController.login)
router.post("/logout", () => {})
router.get("/user", [checkJwt], (req, res) => {
    res.send({
        user: {
            email: res.locals.jwtPayload.email
        }
    })
})

export default router
