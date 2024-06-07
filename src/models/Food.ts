import { TCreateFoodBody } from "../controllers/types";
import prisma from "../utils/prisma";

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
}

type TCreateFoodParam = Omit<
  TCreateFoodBody,
  "id_food_category" | "is_available"
> & {
  id_food_category: number;
  is_available: boolean;
};
