import { Router } from "express"
import AuthController from "../controller/AuthController"
import { checkJwt } from "../middlewares/checkJwt"

const router = Router()
//Login route
router.post("/login", AuthController.login)
router.post("/logout", () => {})
router.get("/user", [checkJwt], (req, res) => {
    console.log(res.locals.jwtPayload)
    res.send({
        user: {
            name: "Admin",
            age: 17
        }
    })
})

export default router
