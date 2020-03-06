import { Category } from "../entity/Category"
import { getRepository } from "typeorm"
import { Request, Response } from "express"
import { DynamicOption } from "../entity/DynamicOption"

class CategoryController {
    categoryRepository = getRepository(Category)
    dynamicOptionRepository = getRepository(DynamicOption)

    getAll = async (req: Request, res: Response) => {
        const categories = await this.categoryRepository.find({
            relations: [
                "children",
                "dynamicOptions",
                "children.dynamicOptions"
            ],
            where: {
                parent: {
                    id: null
                }
            }
        })

        res.send(
            categories.map(({ id, name, children, dynamicOptions }) => ({
                id,
                name,
                children: children.map(child => ({
                    ...child,
                    dynamicOptions: child.dynamicOptions.map(
                        dynamicOption => dynamicOption.id
                    )
                })),
                dynamicOptions: dynamicOptions.map(
                    dynamicOption => dynamicOption.id
                )
            }))
        )
    }

    getOne = async (req: Request, res: Response) => {
        const { id } = req.params
        const { dynamicOptionInfo } = req.query

        if (!id) {
            res.sendStatus(400)
            return
        }

        const category = await this.categoryRepository.findOne({
            relations: [
                "dynamicOptions",
                "children",
                "children.dynamicOptions"
            ],
            where: {
                id
            }
        })

        if (!dynamicOptionInfo) {
            res.send({
                ...category,
                dynamicOptions: category.dynamicOptions.map(
                    dynamicOption => dynamicOption.id
                ),
                children: category.children.map(child => ({
                    ...child,
                    dynamicOptions: child.dynamicOptions.map(
                        dynamicOption => dynamicOption.id
                    )
                }))
            })
        } else {
            res.send(category)
        }
    }

    add = async (req: Request, res: Response) => {
        const { name, parentId } = req.body
        if (!name) {
            res.sendStatus(400)
            return
        }

        const parent = await this.categoryRepository.findOne({
            where: {
                id: parentId
            }
        })

        const category = new Category()
        category.name = name

        if (parent && parentId) {
            category.parent = parent
        }

        await this.categoryRepository.save(category)

        res.send(category)
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.sendStatus(400)
            return
        }

        const result = await this.categoryRepository.delete({
            id: parseInt(id)
        })

        res.send(result)
    }

    update = async (req: Request, res: Response) => {
        const { id } = req.params
        const { name, dynamicOptions } = req.body

        if (!(id && name)) {
            res.sendStatus(400)
            return
        }

        const dynamicOptionsArray = []
        for (const dynamicOptionId of dynamicOptions) {
            console.log(dynamicOptionId)
            const dynamicOption = await this.dynamicOptionRepository.findOne({
                where: {
                    id: dynamicOptionId
                }
            })

            dynamicOptionsArray.push(dynamicOption)
        }

        let category = await this.categoryRepository.findOne({
            where: {
                id
            }
        })
        category.name = name
        category.dynamicOptions = dynamicOptionsArray

        await this.categoryRepository.save(category)

        res.send(category)
    }
}

export default CategoryController
