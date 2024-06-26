import path from "path";
import { TCreateFoodBody } from "../controllers/types";
import prisma from "../utils/prisma";
import fs from "fs";

export default class Food {
  /**
   *
   * @param foodId
   * @param isAvailable
   */
  static async updateFoodAviability(foodId: number, isAvailable: boolean) {
    await prisma.foods.update({
      where: {
        id: foodId,
      },
      data: {
        is_available: isAvailable,
      },
    });
  }

  /**
   *
   * @param food
   * @param img_url
   * @returns
   */
  static async createFood(food: TCreateFoodParam, img_url: string) {
    return await prisma.foods.create({
      data: {
        ...food,
        img_url,
      },
    });
  }

  /**
   *
   * @param id
   * @returns
   */
  static async deleteFood(id: number) {
    try {
      const food = await prisma.foods.delete({
        where: {
          id,
        },
      });

      const filePath = path.join(__dirname, `../uploads/foods/${food.img_url}`);
      fs.unlinkSync(filePath);

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  static async getFoodById(id: number) {
    return prisma.foods.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  static async updateFood(id: number, info: Partial<TCreateFoodBody>) {
    const { id_food_category, is_available, ...food } = info;
    await prisma.foods.update({
      where: {
        id,
      },
      data: {
        ...food,
        id_food_category:
          id_food_category == undefined ? undefined : +id_food_category,
        is_available:
          is_available == undefined ? undefined : is_available == "true",
      },
    });
  }
}

type TCreateFoodParam = Omit<
  TCreateFoodBody,
  "id_food_category" | "is_available"
> & {
  id_food_category: number;
  is_available: boolean;
};
