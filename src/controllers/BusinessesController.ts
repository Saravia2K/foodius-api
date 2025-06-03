import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Business from "../models/Business";
import { TIDParam } from "../utils/types";
import bcrypt from "bcryptjs";
import type { TRegisterBody, TRegisterFiles } from "./types";
import User from "../models/User";
import UserAlreadyExists from "../errors/UserAlreadyExists";

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

      let user = await Promise.all([
        User.getByEmail(businessInfo.email),
        User.getByPhoneNumber(businessInfo.phone_number),
      ]);
      if (user.some((u) => u != null)) throw new UserAlreadyExists();

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

      const statusCode = error.code == "P2002" ? 400 : 500;
      const traductions = {
        phone_number: "número telefónico",
      };
      const message =
        statusCode == 500
          ? `Error trying to sign-up a new business: ${error.message}`
          : `Este ${
              traductions[error.meta.target as keyof typeof traductions] ||
              error.meta.target
            } ya existe`;
      res.status(statusCode).json({
        message,
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

  /**
   * GET: /:day/:time
   */
  static async GetBusiness(req: Request<TGetBusinessReqParams>, res: Response) {
    try {
      const businesses = await Business.getTodays(
        req.params.day,
        +req.params.time
      );
      res.json(businesses);
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
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

  /**
   * POST: /login
   */
  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as TLogin;

      const business = await Business.getByEmail(email);

      if (business == null)
        return res.status(404).json({
          message: "Credenciales incorrectas",
        });

      const isPasswordCorrect = bcrypt.compareSync(password, business.password);
      if (!isPasswordCorrect)
        return res.status(404).json({
          message: "Credenciales incorrectas",
        });

      const { password: _, ..._business } = business;

      res.json(_business);
    } catch (error: any) {
      res.status(500).json({
        message: `Error trying to login: ${error.message}`,
      });
    }
  }
}

type TLogin = { email: string; password: string };

type TGetBusinessReqParams = {
  day: string;
  time: string;
};
