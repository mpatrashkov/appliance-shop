import { DynamicOption } from "../entity/DynamicOption"
import { getRepository } from "typeorm"
import { Request, Response } from "express"

class DynamicOptionsController {
    dynamicOptionRepository = getRepository(DynamicOption)

    getAll = async (req: Request, res: Response) => {
        const dynamicOptions = await this.dynamicOptionRepository.find()
        res.send(dynamicOptions)
    }

    add = async (req: Request, res: Response) => {
        const { name, suffix, type, label } = req.body

        if (!(name && type)) {
            res.sendStatus(400)
            return
        }

        const dynamicOption = new DynamicOption()
        dynamicOption.name = name
        dynamicOption.suffix = suffix
        dynamicOption.type = type
        dynamicOption.label = label

        await this.dynamicOptionRepository.save(dynamicOption)
        res.send(dynamicOption)
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.sendStatus(400)
            return
        }

        const result = await this.dynamicOptionRepository.delete({
            id: parseInt(id)
        })

        res.send(result)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { name, type } = req.body

        if (!(id && name)) {
            res.sendStatus(400)
            return
        }

        const dynamicOption = await this.dynamicOptionRepository.update(
            {
                id: parseInt(id)
            },
            {
                name,
                type
            }
        )

        res.send(dynamicOption)
    }
}

export default DynamicOptionsController
