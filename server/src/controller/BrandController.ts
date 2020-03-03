import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Brand } from "../entity/Brand"

class BrandController {
    brandRepository = getRepository(Brand)

    getAll = async (req: Request, res: Response) => {
        const models = await this.brandRepository.find({
            relations: ["models"]
        })

        res.send(models)
    }

    add = async (req: Request, res: Response) => {
        const { name } = req.body
        if (!name) {
            res.sendStatus(400)
            return
        }

        const brand = new Brand()
        brand.name = name

        await this.brandRepository.save(brand)

        res.send(brand)
    }
}

export default BrandController
