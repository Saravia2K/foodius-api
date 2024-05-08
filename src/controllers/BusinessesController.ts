import { Request, Response } from "express";
import Business from "../models/Business";

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
}
