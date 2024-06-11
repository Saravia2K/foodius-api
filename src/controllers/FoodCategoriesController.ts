import { Request, Response } from "express";
import FoodCategory from "../models/FoodCategory";

export default class FoodCategoriesController{
    /**
   * POST: /food-categories
   */
    static async createFoodCategory(req: Request, res: Response){
        try {
            const {id_business, name, description} = req.body;
            const foodCategory = await FoodCategory.createCategory(id_business, name, description);
            res.status(201).json(foodCategory);
        }catch (error: any) {
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    /**
   * PATCH: /food-categories/:id
   */
    static async updateFoodCategory(req: Request, res: Response){
        try{
            const {id} = req.params;
            const {name, description} = req.body;
            const foodCategory= await FoodCategory.updateCategory(+id, name, description);
            res.status(200).json(foodCategory);
        }catch(error:any){
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    /**
   * DELETE: /food-categories/:id
   */
    static async deleteFoodCategory(req: Request, res: Response){
        try{
            const {id} = req.params;
            await FoodCategory.deleteCategory(+id);
            res.json({message: "Category deleted successfully", });
        }catch(error:any){
            res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}