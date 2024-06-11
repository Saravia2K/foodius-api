import { Request, Response } from "express";
import User from "../models/User";
import Business from "../models/Business";

export default class IndexController {
  /**
   * GET: /
   */
  static index(_: Request, res: Response) {
    res.json({
      message: "SERVER IS RUNNING CORRECTLY",
    });
  }
  /**
   * POST: /check-login
   */
  static async checkLogin(
    req: Request<{}, {}, { email: string }>,
    res: Response
  ) {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email obligatorio",
      });

    const user = await User.getByEmail(email);
    if (user != null)
      return res.json({
        login: "user",
      });

    const business = await Business.getByEmail(email);
    if (business != null)
      return res.json({
        login: "business",
      });

    res.status(404).json({
      message: "Credenciales incorrectas",
    });
  }
}
