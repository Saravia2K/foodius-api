import {Router} from "express";
import FoodCategoriesController from "../controllers/FoodCategoriesController";

const router = Router();

router.post("/", FoodCategoriesController.createFoodCategory);
router.put("/:id", FoodCategoriesController.updateFoodCategory);
router.delete("/:id", FoodCategoriesController.deleteFoodCategory);

export default router;
