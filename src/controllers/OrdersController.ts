import Order from "../models/Order";
import NoOrderPlates from "../errors/NoOrderPlates";
import type { Request, Response } from "express";
import type {
  TCancelOrderBody,
  TCreateOrderBody,
  TUpdateStateBody,
} from "./types";
import { TIDParam } from "../utils/types";
import { ORDER_STATES } from "@prisma/client";
import NoCancelActionAllowed from "../errors/NoCancelActionAllowed";
import FoodNoAvailable from "../errors/FoodNoAvailable";

export default class OrdersController {
  /**
   * POST: /
   */
  static async Order(req: Request<{}, {}, TCreateOrderBody>, res: Response) {
    try {
      const { id_user, plates } = req.body;

      if (!plates || !plates.length) throw new NoOrderPlates();

      const order = await Order.createOrder(id_user, plates);

      res.status(201).json({
        message: "Order created successfully",
        token: order.token,
      });
    } catch (error: any) {
      const statusCode = error instanceof FoodNoAvailable ? 409 : 500;
      res.status(statusCode).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * GET: /:token
   */
  static async OrderState(req: Request, res: Response) {
    try {
      const { token } = req.params;

      if (token == null)
        return res.status(404).json({
          message: "Not Found",
        });

      const orden = await Order.trackingOrder(token);

      res.json(orden);
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * /:id/state
   */
  static async UpdateOrderState(
    req: Request<TIDParam, {}, TUpdateStateBody>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const { state } = req.body;

      if (state == ORDER_STATES.CANCELED) throw new NoCancelActionAllowed();

      await Order.updateOrder(+id, state);

      res.json({
        message: "Order updated successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * POST: /:id/cancel
   */
  static async CancelOrder(
    req: Request<TIDParam, {}, TCancelOrderBody>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const { message } = req.body;

      if (!message) throw new Error("Message is required to cancel an order");

      await Order.cancelOrder(+id, message);

      res.json({
        message: "Order canceled successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }
}
