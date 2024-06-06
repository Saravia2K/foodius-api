import { ORDER_STATES } from "@prisma/client";
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

  /**
   *
   * @param token
   * @returns
   */
  static async trackingOrder(token: string) {
    const order = await prisma.orders.findFirstOrThrow({
      where: {
        token,
      },
      select: {
        state: true,
        Cancellation: {
          select: {
            message: true,
          },
        },
      },
    });

    const { state, Cancellation } = order;

    return {
      state,
      cancellationMessage:
        Cancellation.length == 0 ? "" : Cancellation[0].message,
    };
  }

  /**
   *
   * @param newState
   */
  static async updateOrder(
    id: number,
    newState: Omit<ORDER_STATES, "CANCELED">
  ) {
    await prisma.orders.update({
      where: {
        id,
      },
      data: {
        state: newState as ORDER_STATES,
      },
    });
  }

  /**
   *
   * @param orderId
   * @param message
   */
  static async cancelOrder(orderId: number, message: string) {
    await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        state: "CANCELED",
        Cancellation: {
          create: {
            message,
          },
        },
      },
    });
  }
}
