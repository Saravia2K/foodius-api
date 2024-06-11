import { Router } from "express";
import SchedulesController from "../controllers/SchedulesController";

const router = Router();

router.get("/", SchedulesController.getAllSchedules);

router.get("/business/:id_business", SchedulesController.GetSchedulesByBusinessId);

router.post("/", SchedulesController.CreateSchedule);

router.put('/:id', SchedulesController.updateSchedule);

router.delete('/:id', SchedulesController.deleteSchedule);

export default router;