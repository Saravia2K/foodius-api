import { Router } from "express";
import FoodController from "../controllers/FoodController";
import uploadFoodImgMiddleware from "../middlewares/upload-food-img.middleware";

const router = Router();

//#region POST
router.post("/", uploadFoodImgMiddleware, FoodController.CreateFood);
//#endregion

//#region PATCH
router.patch("/:id");

router.patch("/:id/aviability", FoodController.UpdateFoodAviability);
//#endregion

//#region DELETE
router.delete("/:id", FoodController.DeleteFood);
//#endregion

export default router;
