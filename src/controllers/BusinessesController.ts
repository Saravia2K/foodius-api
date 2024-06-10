import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Business from "../models/Business";
import { TIDParam } from "../utils/types";
import { TRegisterBody, TRegisterFiles } from "./types";

export default class BusinessesController {
  /**
   * POST: /
   */
  static async RegisterBusiness(
    req: Request<{}, {}, TRegisterBody>,
    res: Response
  ) {
    const businessInfo = req.body;
    const getFilename = (path: string) => path.split("/")[1];
    const files = req.files as TRegisterFiles | undefined;

    try {
      if (
        files == undefined ||
        files.logo == undefined ||
        files.banner == undefined
      )
        throw new Error(
          "Logo and banner are required to create a new business"
        );

      const logoFile = files.logo[0];
      const bannerFile = files.banner[0];

      const newBusiness = await Business.createBusiness({
        ...businessInfo,
        logo: getFilename(logoFile.filename),
        banner: getFilename(bannerFile.filename),
      });

      res.status(201).json(newBusiness);
    } catch (error: any) {
      if (files != undefined) {
        const filesArr = Object.values(files);
        for (const fa of filesArr) {
          const filename = fa[0].filename;
          const imagePath = path.join(__dirname, `../uploads/${filename}`);
          if (fs.existsSync(imagePath)) fs.rmSync(imagePath);
        }
      }

      res.status(500).json({
        message: `Error trying to register a business: ${error.message}`,
      });
    }
  }

  /**
   * GET: /:id/food
   */
  static async GetBusinessFood(req: Request<TIDParam>, res: Response) {
    try {
      const { id } = req.params;

      const food = await Business.getFood(+id);

      res.json(food);
    } catch (error: any) {
      res.status(500).json({
        message: `Error trying to get food for this business: ${error.message}`,
      });
    }
  }

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
