import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Model } from "../entity/Model"
import { Brand } from "../entity/Brand"

class ModelController {
    modelRepository = getRepository(Model)
    brandRepository = getRepository(Brand)

    getAll = async (req: Request, res: Response) => {
        const { id } = req.params
        if (!id) {
            res.sendStatus(400)
            return
        }

        const models = await this.modelRepository.find({
            relations: ["brand"],
            where: {
                brand: {
                    id
                }
            }
        })

        res.send({
            children: models
        })
    }

    add = async (req: Request, res: Response) => {
        const { name, parentId } = req.body
        if (!(name && parentId)) {
            res.sendStatus(400)
            return
        }

        const brand = await this.brandRepository.findOne({
            where: {
                id: parentId
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

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.sendStatus(400)
            return
        }

        const result = await this.modelRepository.delete({
            id: parseInt(id)
        })

        res.send(result)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { name } = req.body

        if (!(id && name)) {
            res.sendStatus(400)
            return
        }

        const model = await this.modelRepository.update(
            {
                id: parseInt(id)
            },
            {
                name
            }
        )

        res.send(model)
    }
}

export default ModelController
