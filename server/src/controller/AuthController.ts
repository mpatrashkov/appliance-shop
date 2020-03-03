import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Admin } from "../entity/Admin"
import { jwtSecret } from "../config"
import * as jwt from "jsonwebtoken"

class AuthController {
    static login = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body
        if (!(email && password)) {
            res.status(400).send()
        }

        //Get user from database
        const adminRepository = getRepository(Admin)
        let admin: Admin
        try {
            admin = await adminRepository.findOneOrFail({ where: { email } })
        } catch (error) {
            res.status(401).send()
        }

        //Check if encrypted password match
        if (!admin.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send()
            return
        }

        //Sign JWT, valid for 1 hour
        const token = jwt.sign(
            { adminId: admin.id, email: admin.email },
            jwtSecret,
            { expiresIn: "1h" }
        )

        //Send the jwt in the response
        res.send(token)
    }
}

export default AuthController
