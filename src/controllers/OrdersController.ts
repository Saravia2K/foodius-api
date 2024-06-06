import Order from "../models/Order";
import NoOrderPlates from "../errors/NoOrderPlates";
import type { Request, Response } from "express";
import type { TCreateOrderBody } from "./types";

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
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

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
}
