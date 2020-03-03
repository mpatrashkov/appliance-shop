import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Model } from "../entity/Model"
import { Brand } from "../entity/Brand"

class ModelController {
    modelRepository = getRepository(Model)
    brandRepository = getRepository(Brand)

    getAll = async (req: Request, res: Response) => {
        const { brandId } = req.body
        if (!brandId) {
            res.sendStatus(400)
            return
        }

        const models = await this.modelRepository.find({
            relations: ["brand"],
            where: {
                brand: {
                    id: brandId
                }
            }
        })

        res.send(models)
    }

    add = async (req: Request, res: Response) => {
        const { name, brandId } = req.body
        if (!(name && brandId)) {
            res.sendStatus(400)
            return
        }

        const brand = await this.brandRepository.findOne({
            where: {
                id: brandId
            }
        })

        if (!brand) {
            res.sendStatus(401)
            return
        }

        const model = new Model()
        model.name = name
        model.brand = brand

        await this.modelRepository.save(model)

        res.send(model)
    }
}

export default ModelController
