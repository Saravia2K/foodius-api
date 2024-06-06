import { TCreateOrderPlate } from "../controllers/types";
import prisma from "../utils/prisma";

export default class Orders {
  /**
   *
   * @param id_user
   * @param plates
   * @returns
   */
  static async createOrder(id_user: number, plates: TCreateOrderPlate[]) {
    return await prisma.orders.create({
      data: {
        id_user,
        state: "ACTIVE",
        delivery_method: "HOME_DELIVERY",
        OrdersDetails: {
          createMany: {
            data: plates,
          },
        },
      },
    });
  }

  static async trackingOrder(token: string) {
    return await prisma.orders.findFirst({
      where: {
        token,
      },
      select: { state: true },
    });
  }
}
