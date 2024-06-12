import { Request, Response } from "express";
import RegisterToken from "../models/RegisterToken";

export default class RegisterTokenController {
  /**
   * POST: /
   */
  static async IndexPOST(req: Request, res: Response) {
    try {
      res.status(201).json({
        token: await RegisterToken.generateToken(),
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * GET: /:token/is-valid
   */
  static async IsValid(req: Request<{ token: string }>, res: Response) {
    try {
      res.status(201).json({
        valid: await RegisterToken.isValidToken(req.params.token),
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }

  /**
   * PATCH: /:token/invalidate-token
   */
  static async Invalidate(req: Request<{ token: string }>, res: Response) {
    try {
      const { token } = req.params;

      await RegisterToken.invalidateToken(token);

      res.status(201).json({
        message: "Token invalidated successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }
}
