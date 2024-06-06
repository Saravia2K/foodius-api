import { Request, Response } from "express";
import Business from "../models/Business";
import { TIDParam } from "../utils/types";

export default class BusinessesController {
  static async GetBusiness(req: Request, res: Response) {
    try {
      const businesses = await Business.getAll();
      res.json(businesses);
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  static async GetInfo(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      if (slug == null) return res.status(404);

      const businesses = await Business.infoBusiness(slug);

      res.json(businesses);
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * GET: /:id/dashboard
   */
  static async GetInfoForDashboard(req: Request<TIDParam>, res: Response) {
    try {
      const { id } = req.params;

      const info = await Business.infoForDashboard(+id);

      res.json(info);
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * GET: /:id/orders
   */
  static async GetBusinessOrders(req: Request<TIDParam>, res: Response) {
    try {
      const { id } = req.params;

      const info = await Business.getOrders(+id);

      res.json(info);
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }
}
