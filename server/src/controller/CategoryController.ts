import { Category } from "../entity/Category"
import { getRepository } from "typeorm"
import { Request, Response } from "express"

class CategoryController {
    categoryRepository = getRepository(Category)

    getAll = async (req: Request, res: Response) => {
        const categories = await this.categoryRepository.find({
            relations: ["children"],
            where: {
                parent: {
                    id: null
                }
            }
        })

        res.send(categories)
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
}

export default CategoryController
