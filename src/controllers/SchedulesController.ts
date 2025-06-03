import Schedules from "../models/Schedule";
import type { Request, Response } from "express";


export default class SchedulesController{

    static async CreateSchedule(req: Request, res: Response){
        try{
            const {id_business, day, from, to} = req.body;
            const findSchedule = await Schedules.findScheduleByDay(Number(id_business), day);

            if(findSchedule){
                return res.status(400).json({error: 'Schedule for this day already exists'});
            }
            
            const _to = new Date(new Date(to))
            const schedule = await Schedules.createSchedule(
                Number(id_business),
                day,
                new Date(from),
                _to
            );

            res.status(201).json(schedule);
        } catch{
            res.status(500).json({error: 'Error creating schedule'})
        }
    }

    static async GetSchedulesByBusinessId(req: Request, res: Response) {
      try {
        const { id_business } = req.params;
        const schedules = await Schedules.findSchedulesByBusinessId(Number(id_business));
        res.status(200).json(schedules);

      } catch (error) {
        res.status(500).json({ error: 'Error retrieving schedules' });
        
      }
    }

    
    static async updateSchedule(req: Request, res: Response){
        const { id } = req.params;
        const { from, to } = req.body;
        try {
            const updatedSchedule = await Schedules.updateSchedule(
            Number(id),
            new Date(from),
            new Date(to)
        );
        res.status(200).json(updatedSchedule);
        } catch (error) {
            res.status(500).json({ error: 'Error updating schedule' });
        }
    }

    static async deleteSchedule(req: Request, res: Response) {
        const { id } = req.params;
        try {

          const success = await Schedules.deleteSchedule(Number(id));

          if (success) {
            res.status(200).json({ message: 'Schedule deleted successfully' });

          } else {
            res.status(404).json({ error: 'Schedule not found' });

          }
        } catch (error) {

          res.status(500).json({ error: 'Error deleting schedule' });

        }
      }

    static async getAllSchedules(req: Request, res: Response) {

        try {
          const schedules = await Schedules.getAllSchedules();
          res.status(200).json(schedules);

        } catch (error) {
          res.status(500).json({ error: 'Error' });

        }
      }

}