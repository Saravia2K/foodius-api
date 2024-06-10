import { Request, Response } from "express";
import { TIDParam } from "../utils/types";
import { TCreateFoodBody, TUpdateAviabilityBody } from "./types";
import Food from "../models/Food";
import path from "path";
import fs from "fs";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import CouldNotDeleteFood from "../errors/CouldNotDeleteFood";

export default class FoodController {
  /**
   * POST: /
   */
  static async CreateFood(
    req: Request<{}, {}, TCreateFoodBody>,
    res: Response
  ) {
    const file = req.file;

    try {
      if (!file) throw new Error("Image is needed to create a new food");

      const { id_food_category, is_available, ...body } = req.body;
      const newFood = await Food.createFood(
        {
          id_food_category: +id_food_category,
          ...body,
          is_available: is_available == "true",
        },
        file.filename
      );

      res.json(newFood);
    } catch (error: any) {
      if (file != undefined) {
        const filename = file.filename;
        const imagePath = path.join(__dirname, `../uploads/foods/${filename}`);
        if (fs.existsSync(imagePath)) fs.rmSync(imagePath);
      }

      let statusCode = 500;
      let message = error.message;
      if (error instanceof PrismaClientValidationError) {
        statusCode = 400;
        message = "Incomplete request body. Fields are missing";
        console.log(error.message);
      }

      res.status(statusCode).json({
        message: `Error: ${message}`,
      });
    }
  }

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

  /**
   * DELETE: /:id
   */
  static async DeleteFood(req: Request<TIDParam>, res: Response) {
    try {
      const { id } = req.params;

      const deleted = Food.deleteFood(+id);
      if (!deleted) throw new CouldNotDeleteFood();

      res.json({
        message: "Food deleted successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error trying to delete food: ${error.message}`,
      });
    }
  }
}
