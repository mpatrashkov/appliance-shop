import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { Brand } from "../entity/Brand"

class BrandController {
    brandRepository = getRepository(Brand)

    getAll = async (req: Request, res: Response) => {
        const brands = await this.brandRepository.find({
            relations: ["models"]
        })

        res.send(brands)
    }

    getOne = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.sendStatus(400)
            return
        }

        const category = await this.brandRepository.findOne({
            relations: ["models"],
            where: {
                id
            }
        })

        res.send({
            ...category,
            children: category.models
        })
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

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.sendStatus(400)
            return
        }

        const result = await this.brandRepository.delete({
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

        const brand = await this.brandRepository.update(
            {
                id: parseInt(id)
            },
            {
                name
            }
        )

        res.send(brand)
    }
}

export default BrandController
