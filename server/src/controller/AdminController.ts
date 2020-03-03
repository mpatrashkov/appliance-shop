import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Admin } from "../entity/Admin"

class AdminController {
    static getAll = async (req: Request, res: Response) => {
        const adminRepository = getRepository(Admin)
        const admins = adminRepository.find({
            select: ["id", "email", "role"]
        })

        res.send(admins)
    }
}

export default AdminController
