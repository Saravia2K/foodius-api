import prisma from "../utils/prisma";
import { TOrder } from "../utils/types";

export default class Orders {
  static async createOrder(orderdetail: TOrder) {
    const data = orderdetail;

    return await prisma.orders.create({
      data: {
        ...data,
        state: "ACTIVE",
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
