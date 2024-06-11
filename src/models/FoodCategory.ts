import prisma from "../utils/prisma";

export default class FoodCategory{
    /**
   *
   * @param id_business
   * @param name
   * @param description
   * @returns
   */
    static async createCategory(id_business: number, name: string, description: string){
        return await prisma.foodCategories.create({
            data: {id_business, name, description},
        });
    }
     /**
   *
   * @param id_business
   * @param name
   * @param description
   * @returns
   */
    static async updateCategory(id: number, name: string, description: string){
        return await prisma.foodCategories.update({
            where: {id},
            data: {name, description},
        });
    }
    /**
   *
   * @param id
   * @returns
   */
    static async deleteCategory(id: number){
        return await prisma.foodCategories.delete({
            where: {id},
        });
    }
}