import { Request, Response } from "express";
import Order from "../models/Order";
import { TOrder } from "../utils/types";

export default class OrdersController {
  static async Order(req: Request, res: Response) {
    try {
      const order = await Order.createOrder(req.body as TOrder);

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
