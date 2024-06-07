import { Request, Response } from "express";
import { TIDParam } from "../utils/types";
import { TUpdateAviabilityBody } from "./types";
import Food from "../models/Food";

export default class FoodController {
  /**
   * PATCH: /food/:id/aviability
   */
  static async UpdateFoodAviability(
    req: Request<TIDParam, {}, TUpdateAviabilityBody>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const { available } = req.body;

      if (available == undefined)
        throw new Error("Availability needs to be specified to be changed");

      await Food.updateFoodAviability(+id, available);

      res.json({
        message: "Aviability changed successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  }
}
