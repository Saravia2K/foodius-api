import { Router } from "express";
import FoodController from "../controllers/FoodController";

const router = Router();

//#region PATCH
router.patch("/:id/aviability", FoodController.UpdateFoodAviability);
//#endregion

export default router;
