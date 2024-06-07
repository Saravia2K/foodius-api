import prisma from "../utils/prisma";

export default class Food {
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
}
